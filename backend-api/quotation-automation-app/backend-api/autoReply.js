// backend-api/autoReply.js
const Imap = require('imap');
const { simpleParser } = require('mailparser');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function startAutoReply(io, db, getEmailSettings) {
  const companyId = 1;
  const settingsRow = getEmailSettings(companyId);
  if (!settingsRow) {
    console.log('No email settings for company. AutoReply not started.');
    return;
  }
  const password = decrypt(settingsRow.encryptedPassword); // use decrypt function same as earlier

  const imapConfig = {
    user: settingsRow.user,
    password,
    host: settingsRow.host,
    port: settingsRow.port,
    tls: !!settingsRow.tls,
    tlsOptions: { rejectUnauthorized: false },
  };

  const imap = new Imap(imapConfig);
  function openInbox(cb) { imap.openBox('INBOX', false, cb); }

  imap.once('ready', function() {
    openInbox(function(err, box) {
      if (err) return console.error(err);
      console.log('IMAP ready, watching inbox...');
      imap.on('mail', (num) => {
        // search unseen
        imap.search(['UNSEEN'], function(err, results) {
          if (!results || results.length === 0) return;
          const f = imap.fetch(results, { bodies: '' });
          f.on('message', (msg) => {
            msg.on('body', async (stream) => {
              const parsed = await simpleParser(stream);
              try {
                // parse requested items from email body (improve parsing for production)
                const lines = (parsed.text || '').split(/\r?\n/).map(l => l.trim()).filter(Boolean);
                // assume comma-separated or newline list in body
                const requested = lines.join(',').split(/,|;/).map(x => x.trim()).filter(Boolean);

                // check inventory
                const inventory = db.prepare('SELECT * FROM inventory WHERE companyId = ?').all(companyId);
                const available = [];
                const unavailable = [];
                for(const r of requested) {
                  const found = inventory.find(i => i.name.toLowerCase() === r.toLowerCase());
                  if (found && found.stock > 0) available.push(found); else unavailable.push(r);
                }

                // generate PDF
                const pdfPath = path.join(__dirname, 'quotations', `quote_${Date.now()}.pdf`);
                fs.mkdirSync(path.join(__dirname, 'quotations'), { recursive: true });
                const doc = new PDFDocument();
                doc.pipe(fs.createWriteStream(pdfPath));
                doc.fontSize(16).text('Quotation', { align: 'center' });
                doc.moveDown();
                if (available.length) {
                  doc.text('Available Items:');
                  available.forEach(i => doc.text(`${i.name} — ${i.stock} — $${i.price}`));
                }
                if (unavailable.length) {
                  doc.moveDown();
                  doc.fillColor('red').text('Unavailable Items:');
                  unavailable.forEach(x => doc.text(x));
                  doc.fillColor('black');
                }
                doc.end();

                // send email
                const transporter = nodemailer.createTransport({
                  host: settingsRow.host, // or use provider
                  port: Number(settingsRow.port),
                  secure: false,
                  auth: { user: settingsRow.user, pass: password },
                });

                await transporter.sendMail({
                  from: settingsRow.user,
                  to: parsed.from.value[0].address,
                  subject: `Quotation — ${new Date().toLocaleDateString()}`,
                  text: 'Please find the attached quotation.',
                  attachments: [{ filename: path.basename(pdfPath), path: pdfPath }],
                });

                // save to DB
                const ins = db.prepare(`INSERT INTO quotations (companyId,toEmail,subject,itemsRequested,availableItems,unavailableItems,pdfPath,status) VALUES (?,?,?,?,?,?,?,?)`);
                ins.run(companyId, parsed.from.value[0].address, parsed.subject || '', JSON.stringify(requested), JSON.stringify(available), JSON.stringify(unavailable), pdfPath, 'sent');

                const saved = db.prepare('SELECT * FROM quotations ORDER BY createdAt DESC LIMIT 1').get();

                // emit real-time update to front-end
                io.emit('quotation.sent', saved);

              } catch (err) {
                console.error('processing email error', err);
                io.emit('autoReply.error', { message: err.message });
              }
            });
          });
        });
      });
    });
  });

  imap.once('error', (err) => {
    console.error('IMAP error', err);
    io.emit('autoReply.error', { message: err.message });
  });

  imap.connect();
}

module.exports = { startAutoReply };

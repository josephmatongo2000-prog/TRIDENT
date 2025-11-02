const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "your_super_secret_key"; // Later move to env variable

const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const cryptoJS = require('crypto-js');
const db = require('./db'); // the file above

app.use(fileUpload({ createParentPath: true }));

// simple encryption for stored passwords (for demo). Use proper KMS for prod.
const ENC_KEY = "replace_with_a_long_secret_key"; // store in env in prod
function encrypt(text) { return cryptoJS.AES.encrypt(text, ENC_KEY).toString(); }
function decrypt(cipher) { return cryptoJS.AES.decrypt(cipher, ENC_KEY).toString(cryptoJS.enc.Utf8); }

// --- Company settings (upload logo, update company) ---
app.post('/api/company', (req, res) => {
  const { name } = req.body;
  // for simplicity assume companyId 1 for now
  const companyId = 1;
  // insert or update: simple approach
  const row = db.prepare('SELECT * FROM companies WHERE id = ?').get(companyId);
  if(row) {
    db.prepare('UPDATE companies SET name = ? WHERE id = ?').run(name, companyId);
  } else {
    db.prepare('INSERT INTO companies (id, name) VALUES (?, ?)').run(companyId, name);
  }
  res.json({ ok: true });
});

// upload logo
app.post('/api/company/logo', (req, res) => {
  if (!req.files || !req.files.logo) return res.status(400).json({ error: 'No file' });
  const logo = req.files.logo;
  const dest = path.join(__dirname, 'uploads', `logo_${Date.now()}_${logo.name}`);
  fs.mkdirSync(path.join(__dirname, 'uploads'), { recursive: true });
  logo.mv(dest, (err) => {
    if(err) return res.status(500).json({ error: err.message });
    // update company row (id=1 for now)
    db.prepare('UPDATE companies SET logoPath = ? WHERE id = 1').run(dest);
    res.json({ ok: true, path: dest });
  });
});

// --- Email settings (save) ---
app.post('/api/email-settings', (req, res) => {
  const { provider, host, port, user, password, tls } = req.body;
  const encrypted = encrypt(password);
  const companyId = 1; // demo
  // upsert
  const row = db.prepare('SELECT * FROM email_settings WHERE companyId = ?').get(companyId);
  if (row) {
    db.prepare('UPDATE email_settings SET provider=?,host=?,port=?,user=?,encryptedPassword=?,tls=? WHERE companyId=?')
      .run(provider, host, port, user, encrypted, tls ? 1 : 0, companyId);
  } else {
    db.prepare('INSERT INTO email_settings (companyId,provider,host,port,user,encryptedPassword,tls) VALUES (?,?,?,?,?,?,?)')
      .run(companyId, provider, host, port, user, encrypted, tls ? 1 : 0);
  }
  res.json({ ok: true });
});

// --- Inventory upload (CSV) ---
const { parse } = require("csv-parse/sync");
app.post('/api/inventory/upload', (req, res) => {
  if (!req.files || !req.files.csv) return res.status(400).json({ error: 'No file' });
  const csvfile = req.files.csv;
  const text = csvfile.data.toString();
  const rows = csv(text, { columns: true, skip_empty_lines: true });
  const companyId = 1;
  const insert = db.prepare('INSERT INTO inventory (companyId, sku, name, stock, price, meta) VALUES (?,?,?,?,?,?)');
  const del = db.prepare('DELETE FROM inventory WHERE companyId = ?').run(companyId);
  const t = db.transaction((rows) => {
    for(const r of rows) {
      insert.run(companyId, r.sku || null, r.name, Number(r.stock || 0), Number(r.price || 0), JSON.stringify(r));
    }
  });
  t(rows);
  res.json({ ok: true, count: rows.length });
});

// --- Fetch inventory ---
app.get('/api/inventory', (req, res) => {
  const companyId = 1;
  const rows = db.prepare('SELECT * FROM inventory WHERE companyId = ?').all(companyId);
  res.json(rows);
});

// --- Quotations logs (list) ---
app.get('/api/quotations', (req, res) => {
  const companyId = 1;
  const rows = db.prepare('SELECT * FROM quotations WHERE companyId = ? ORDER BY createdAt DESC').all(companyId);
  res.json(rows);
});

// --- manual: mark quotation as reopened/resend etc (optional) ---
// more routes as you need...

// Test users
const users = [
  {
    id: 1,
    email: "user@example.com",
    passwordHash: bcrypt.hashSync("password123", 10),
    subscriptionActive: true
  }
];

// Mock inventory
const inventory = [
  { id: 1, name: "Item A", stock: 10, price: 100 },
  { id: 2, name: "Item B", stock: 5, price: 200 },
  { id: 3, name: "Item C", stock: 0, price: 150 }
];

// -------------------
// Routes
// -------------------

// Root route (test)
app.get("/", (req, res) => {
  res.send("✅ Backend API running successfully!");
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: "Invalid email or password" });

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) return res.status(401).json({ error: "Invalid email or password" });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token, subscriptionActive: user.subscriptionActive, userId: user.id });
});

// Inventory route (requires token)
app.get("/inventory", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, SECRET_KEY);
    res.json(inventory);
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
});

// -------------------
const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
// Verify subscription
app.get("/verify-subscription/:userId", (req, res) => {
  const user = users.find(u => u.id == req.params.userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json({ subscriptionActive: user.subscriptionActive });
});

const SETTINGS_FILE = path.join(__dirname, "settings.json");

app.get("/settings", (req, res) => {
  if (fs.existsSync(SETTINGS_FILE)) {
    const data = JSON.parse(fs.readFileSync(SETTINGS_FILE));
    res.json(data);
  } else {
    res.json({});
  }
});

app.post("/settings", (req, res) => {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

// backend-api/db.js
const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'data.sqlite'), { verbose: console.log });

// Create tables if not exist
db.prepare(`
CREATE TABLE IF NOT EXISTS companies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  logoPath TEXT
)`).run();

db.prepare(`
CREATE TABLE IF NOT EXISTS email_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  companyId INTEGER,
  provider TEXT,
  host TEXT,
  port INTEGER,
  user TEXT,
  encryptedPassword TEXT,
  tls INTEGER DEFAULT 1
)`).run();

db.prepare(`
CREATE TABLE IF NOT EXISTS inventory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  companyId INTEGER,
  sku TEXT,
  name TEXT,
  stock INTEGER,
  price REAL,
  meta TEXT
)`).run();

db.prepare(`
CREATE TABLE IF NOT EXISTS quotations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  companyId INTEGER,
  toEmail TEXT,
  subject TEXT,
  itemsRequested TEXT,
  availableItems TEXT,
  unavailableItems TEXT,
  pdfPath TEXT,
  status TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)`).run();

module.exports = db;

⚡ TRIDENT Quotation Automation System

**TRIDENT** is a full-stack quotation automation platform combining:
- 🧠 Node.js backend (API + SQLite)
- 🪶 Next.js + Tailwind CSS + DaisyUI web app
- 💻 Electron desktop app
- 💳 Direct bank payment integration (no Stripe)

---

## 🌈 Features

- 🌟 Animated vibrant gradient UI
- 🧾 Automated quotation generation
- 🧰 Inventory management
- 📧 Company email integration
- 🧠 Smart settings panel
- 💳 Subscription + bank-based payment system
- 🖥️ Electron desktop app packaging

---

## 🏗️ Project Structure

quotation-automation-app/
├── backend-api/ # Node.js + Express backend
├── electron-app/ # Electron shell
├── web-app/ # Next.js + Tailwind + DaisyUI frontend
├── package.json
├── .gitignore
├── README.md
└── CONTRIBUTING.md

yaml
Copy code

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/josephmatongo2000-prog/TRIDENT.git

cd TRIDENT

# Install dependencies
npm install

# Go into each folder to install sub-dependencies
cd backend-api && npm install
cd ../web-app && npm install
cd ../electron-app && npm install
🚀 Running the App
Run the backend
bash
Copy code
cd backend-api
npm start
Run the web app
bash
Copy code
cd web-app
npm run dev
Run the Electron desktop app
bash
Copy code
cd electron-app
npm start
🧰 Tech Stack
Layer	Technology
Frontend	Next.js 15 + Tailwind CSS + DaisyUI
Backend	Node.js + Express + SQLite
Desktop	Electron
UI Style	Glassmorphism + Animated Gradients
Auth	Company email login
Payment	Direct bank integration

💡 Development Guidelines
Keep UI vibrant and animated

Use DaisyUI for consistent components

Ensure Electron app connects to backend API (http://localhost:4000)

Follow branch naming conventions from CONTRIBUTING.md

🧑‍💻 Contributors
Name	Role
Joseph Matongo	Lead Developer
Your Team	Core Developers

🏁 License
This project is private and intended for internal use by the TRIDENT team.

✨ “Automate. Simplify. Empower.” — TRIDENT Team

yaml
Copy code

---

## 🧭 Final Commands

Once you add these two files, commit and push:

```bash
git add README.md CONTRIBUTING.md
git commit -m "Add README and team workflow guide"
git push

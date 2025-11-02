const { app, BrowserWindow } = require("electron");
const path = require("path");
const { exec } = require("child_process");

let mainWindow;
let backendProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const startURL = app.isPackaged
    ? `file://${path.join(__dirname, "../web-app/out/index.html")}`
    : "http://localhost:3000/dashboard";

  mainWindow.loadURL(startURL);

  mainWindow.on("closed", () => {
    if (backendProcess) backendProcess.kill();
    mainWindow = null;
  });
}

function startBackend() {
  const backendPath = path.join(__dirname, "../backend-api/quotation-automation-app/backend-api/index.js");
  backendProcess = exec(`node "${backendPath}"`);

  backendProcess.stdout.on("data", (data) => {
    console.log(`[Backend] ${data}`);
  });

  backendProcess.stderr.on("data", (data) => {
    console.error(`[Backend ERR] ${data}`);
  });

  backendProcess.on("exit", (code) => {
    console.log(`[Backend] exited with code ${code}`);
  });
}

app.whenReady().then(() => {
  startBackend();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    if (backendProcess) backendProcess.kill();
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});

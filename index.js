const { app, BrowserWindow } = require("electron");

app.whenReady().then(createWindow);

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800
  });
  win.loadFile("./snake2.html");
  win.webContents.openDevTools();
}
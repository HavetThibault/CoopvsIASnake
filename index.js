const { app, BrowserWindow } = require("electron");

app.whenReady().then(createWindow);

function createWindow() {
  const win = new BrowserWindow({
    
  });
  win.maximize();
  win.loadFile("./snake2.html");
  win.webContents.openDevTools();
}
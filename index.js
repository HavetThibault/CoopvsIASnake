const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win;

app.whenReady().then(() => {
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
      nodeIntegration: false // disable node integration in renderer process
    }
  });

  win.maximize();
  win.loadFile('./snake.html');
  //win.webContents.openDevTools();
});

ipcMain.on('loadFile', (event, fileName) => {
  win.loadFile(fileName);
});
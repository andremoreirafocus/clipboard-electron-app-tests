const { app, BrowserWindow, globalShortcut } = require('electron');

let mainWindow;
let secondWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 500,
    width: 300,
    show: true,
    x: 2100,
    y: 500,
    title: 'main',
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  console.log(`file://${__dirname}/index.html`);

  secondWindow = new BrowserWindow({
    height: 800,
    width: 400,
    x: 2200,
    y: 400,
    show: true,
    title: 'second',
  });

  secondWindow.loadURL(`file://${__dirname}/index2.html`);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const createClipping = globalShortcut.register('CommandOrControl+!', () => {
    mainWindow.webContents.send('create-new-clipping');
  });

  const writeClipping = globalShortcut.register('CmdOrCtrl+Alt+@', () => {
    mainWindow.webContents.send('write-to-clipboard');
  });

  if (!createClipping) {
    console.error('Registration failed', 'createClipping');
  }
  if (!writeClipping) {
    console.error('Registration failed', 'writeClipping');
  }
});

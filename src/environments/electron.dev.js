const { app, BrowserWindow } = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let appWindow;

const createWindow = () => {
    // Create the browser window.
    appWindow = new BrowserWindow({
      width: 560,
      height: 680,
      icon: './src/favicon.ico',
      webPreferences: {
        nodeIntegration: true
      },
    });

    // and load the app.
    appWindow.loadFile('./dist/hours-app/browser/index.html');

    // appWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    appWindow.on('closed', () => {
      appWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (appWindow === null) {
    createWindow();
  }
});

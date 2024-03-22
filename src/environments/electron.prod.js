const { app, BrowserWindow } = require('electron');

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

  // and load the index.html of the app.
  appWindow.loadFile('index.html');

  // Emitted when the window is closed.
  appWindow.on('closed', () => {
    appWindow = null;
  });
}

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

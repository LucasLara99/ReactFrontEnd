const { app, BrowserWindow } = require('electron');
const serve = require('electron-serve');
const path = require('path');

const staticPath = path.join(__dirname, 'build');

const loadURL = serve({ directory: staticPath });

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    loadURL(mainWindow);

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

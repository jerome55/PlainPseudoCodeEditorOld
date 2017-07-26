const electron = require('electron');
const {app, BrowserWindow} = electron;

app.on('ready', () => {
    let win = new BrowserWindow({width:800,heigh:600});
    win.loadURL('file://'+__dirname+'/index.html');
    win.webContents.openDevTools()
});


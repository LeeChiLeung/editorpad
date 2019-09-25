//主进程通信
var ipcMain = require('electron').ipcMain;
var app = require('electron').app;

ipcMain.on('exit-app',(event,data)=>{
    app.quit();
})
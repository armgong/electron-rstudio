const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const child = require('child_process').execFile;
const executablePath = "/usr/local/lib/rstudio-server/bin/rserver"
const parameters = ["--www-address=127.0.0.1", "--www-port=8686","--auth-none=1","--server-daemonize=1"]; 
const killPath="/usr/bin/killall"
const killparams=["-TERM","rserver"]
let localserver
let mainwindow
function startlocalserver()
{
  if (localserver===1)
   return;
  
  child(executablePath, parameters, function(err, data) {
  if (err) 
    console.log(err);
  else
   localserver=1;
   console.log("server started");
  });
}

function killlocalserver()
{
  if (localserver!==1)
   return;
  child(killPath, killparams, function(err, data) {
  if (err) 
    console.log(err);
  else
   localserver=null;
   console.log("server killed");
  });
}
function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600, webPreferences: {
    nodeIntegration: false
  }})
  mainWindow.loadURL('http://127.0.0.1:8686');
  mainWindow.on('closed', function () {
  mainWindow = null
  })
}
function realstart()
{
 startlocalserver();
 createWindow();
}

app.on('ready', realstart)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('quit',killlocalserver)

app.on('browser-window-created',function(e,window) {
      window.setMenu(null);
  });

app.on('activate', function () {
  if (localserver===null)
  {
    startlocalserver();      
  }
  if (mainWindow === null) {
    createWindow()
  }
})


const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const child = require('child_process').execFile;
//const executablePath = "/usr/local/lib/rstudio-server/bin/rserver"
//const parameters = ["--www-address=127.0.0.1", "--www-port=8686","--auth-none=1","--server-daemonize=1"]; 
const executablePath = "/usr/local/lib/rstudio-server/bin/rsession"
const parameters = ["--program-mode=server", "--standalone=1","--log-stderr=1","--www-port=8686"];
const killPath="/usr/bin/killall"
//const killparams=["-TERM","rserver"]
const killparams=["-TERM","rsession"]
const rmPath="/usr/bin/rm";
const rmparams=["/tmp/rstudio-rsession"];
let localserver
let mainwindow
function deltmpdir()
{
  child(rmPath, rmparams, function(err, data) {
  if (err) 
    console.log(err);
   console.log("tmp dir cleaned");
  });

}
function startlocalserver()
{
  if (localserver===1)
   return;
  child(executablePath, parameters, function(err, data) {
  localserver=1;
  console.log("server started");
  });
}

function killlocalserver()
{
  child(killPath, killparams, function(err, data) {
  if (err) 
    console.log(err);
  localserver=null;
  console.log("server killed");
  });
}
function createWindow () {
  mainWindow = new BrowserWindow({ webPreferences: {
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


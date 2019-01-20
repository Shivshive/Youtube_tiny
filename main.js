const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const express = require('./src/express');
const path = require('path')
const url = require('url')
const globalshortcuts = electron.globalShortcut;
const tray = electron.Tray;
const Menu = electron.Menu;
const ipc = electron.ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {

  trayicon = new tray(path.join(__dirname, 'src/img', 'logo.png'));
  const traymenu = new Menu.buildFromTemplate([
    {
      label: "Add Video",
      accelerator:"CommandOrControl+a+v",
      click: (eve)=>{
        mainWindow.show();
        
        mainWindow.webContents.send('trigger_click_vid_btn');
      }
    },
    {
      label: "Maximize",
      accelerator: "CommandOrControl+m",
      click: (eve)=>{
        mainWindow.show();
      }
    },
    {
      label: "Quit",
      role: 'quit',
      accelerator: 'CommandOrControl+q'
    }

  ])

  trayicon.setContextMenu(traymenu)

  trayicon.on('click', (eve) => {

    trayicon.popUpContextMenu();

  })

  trayicon.on('double-click',(eve)=>{
    mainWindow.show();
  })

  // Create the browser window.
  mainWindow = new BrowserWindow(
    {
      width: 800, height: 600, center: true,
      fullscreenable: true, alwaysOnTop: true,
      autoHideMenuBar: true, darkTheme: true, title: 'Youtube Player',
      icon: path.join(__dirname, 'src/img', 'logo.png')
    })
  express(mainWindow);
  globalshortcuts.register('CommandOrControl+i', () => {
    mainWindow.webContents.openDevTools()
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'src', 'index_.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.setAlwaysOnTop(true);
  //   mainWindow.webContents.openDevTools();
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })


  mainWindow.on('minimize', (event) => {
    event.preventDefault();
    mainWindow.hide();
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

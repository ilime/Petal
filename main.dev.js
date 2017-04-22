'use strict'

import 'babel-polyfill'
import { app, BrowserWindow } from 'electron'
import url from 'url'
import installExtension, {
  REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS
} from 'electron-devtools-installer'

let mainWindow = null

const createWindow = () => {
  mainWindow = new BrowserWindow({
    height: 500,
    resizable: false,
    frame: false
  })

  mainWindow.loadURL(url.format({
    pathname: __dirname + '/../index.html',
    protocol: 'file:',
    slashes: true
  }))

  if (process.env.NODE_ENV === 'development') {
    Promise.all([
      [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].map(tool => installExtension(tool))
    ]).then(() => {
      console.log('install dev tools successfully')
    }).catch(console.log)
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('close', () => { mainWindow = null })
}

app.on('ready', () => {
  if (process.platform === 'darwin') {
    app.dock.setIcon('./petal.png')
  }
  createWindow()
})
app.on('window-all-closed', () => { app.quit() })
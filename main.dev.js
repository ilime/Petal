'use strict'

import 'babel-polyfill'
import { app, BrowserWindow } from 'electron'
import path from 'path'
import url from 'url'
import installExtension, {
  REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS
} from 'electron-devtools-installer'

let mainWindow = null

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true
  }))

  if (process.env.NODE_ENV === 'development') {
    Promise.all([
      [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].map(tool => installExtension(tool))
    ]).then(() => {
      console.log("install dev tools successfully ");
      mainWindow.webContents.openDevTools()
    }).catch(console.log)
  }

  mainWindow.on('close', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
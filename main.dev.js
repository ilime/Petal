'use strict'

import 'babel-polyfill'
import { app, BrowserWindow, Menu } from 'electron'
import url from 'url'
import fs from 'fs'
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
    pathname: __dirname + '/index.html',
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

const template = [
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'delete' },
      { role: 'selectall' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' }
    ]
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' }
    ]
  },
  {
    label: 'Related',
    submenu: [
      {
        label: 'Author',
        click() { require('electron').shell.openExternal('https://github.com/SandStorms') }
      }
    ]
  }
]

const createDB = () => {
  fs.stat(app.getPath('home') + '/.petal.db', (err, stats) => {
    if (err === null) {
      console.log('db file existd.')
    } else if (err === 'ENOENT') {
      fs.writeFile(app.getPath('home') + '/.petal.db', '', err => {
        if (err) {
          console.log(err)
        } else {
          console.log('db file created!')
        }
      })
    } else {
      console.log('error: ' + err.code)
    }
  })
}

app.on('ready', () => {
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'hide', },
        { type: 'separator' },
        { role: 'quit' }
      ]
    })
  }
  createDB()
  createWindow()
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
})

app.on('window-all-closed', () => { app.quit() })
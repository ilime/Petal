'use strict'

import 'babel-polyfill'
import { app, BrowserWindow, Menu, TouchBar, ipcMain } from 'electron'
import url from 'url'
import fs from 'fs'
import installExtension, {
  REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS
} from 'electron-devtools-installer'

let mainWindow = null

const { TouchBarButton } = TouchBar

const touchBarState = {
  pause: false,
  isRate: false
}

const pauseAndStart = new TouchBarButton({
  icon: __dirname + '/resources/pause.png',
  click: () => {
    mainWindow.webContents.send('pause')
  }
})

ipcMain.on('touchBarPauseAndStart', (event, arg) => {
  if (arg === true) {
    pauseAndStart.icon = __dirname + '/resources/pause.png'
    touchBarState.pause = false
  } else {
    pauseAndStart.icon = __dirname + '/resources/play.png'
    touchBarState.pause = true
  }
})

const rateAndUnrate = new TouchBarButton({
  icon: __dirname + '/resources/unrate.png',
  click: () => {
    mainWindow.webContents.send('love')
  }
})

ipcMain.on('touchBarRateColor', (event, arg) => {
  if (arg === 'red') {
    touchBarState.isRate = true
    rateAndUnrate.icon = __dirname + '/resources/rate.png'
  }

  if (arg === 'white') {
    touchBarState.isRate = false
    rateAndUnrate.icon = __dirname + '/resources/unrate.png'
  }
})

const playlistTouchBar = new TouchBar([
  new TouchBarButton({
    icon: __dirname + '/resources/trash.png',
    click: () => { mainWindow.webContents.send('trash') }
  }),
  pauseAndStart,
  new TouchBarButton({
    icon: __dirname + '/resources/skip.png',
    click: () => { mainWindow.webContents.send('skip') }
  }),
  rateAndUnrate
])

const songListTouchBar = new TouchBar([
  new TouchBarButton({
    icon: __dirname + '/resources/backword.png',
    click: () => { mainWindow.webContents.send('backword') }
  }),
  pauseAndStart,
  new TouchBarButton({
    icon: __dirname + '/resources/forward.png',
    click: () => { mainWindow.webContents.send('forward') }
  }),
  rateAndUnrate
])

ipcMain.on('patternSwitch', (event, arg) => {
  switch (arg) {
    case 'select':
      mainWindow.setTouchBar(playlistTouchBar)
      break
    case 'recent':
      mainWindow.setTouchBar(songListTouchBar)
      break
    case 'redheart':
      mainWindow.setTouchBar(songListTouchBar)
      break
    default:
      mainWindow.setTouchBar(playlistTouchBar)
  }
})

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
    label: 'Window',
    submenu: [
      { role: 'minimize' }
    ]
  },
  {
    label: 'Operate',
    submenu: [
      {
        label: 'pause',
        accelerator: 'Space',
        click: (menuItem, browserWindow) => {
          browserWindow.webContents.send('pause')
        }
      },
      {
        label: 'love',
        accelerator: 'CmdOrCtrl+l',
        click: (menuItem, browserWindow) => {
          browserWindow.webContents.send('love')
        }
      },
      {
        label: 'trash',
        accelerator: 'CmdOrCtrl+t',
        click: (menuItem, browserWindow) => {
          browserWindow.webContents.send('trash')
        }
      },
      {
        label: 'skip',
        accelerator: 'CmdOrCtrl+k',
        click: (menuItem, browserWindow) => {
          browserWindow.webContents.send('skip')
        }
      },
      {
        label: 'forward',
        accelerator: 'CmdOrCtrl+Right',
        click: (menuItem, browserWindow) => {
          browserWindow.webContents.send('forward')
        }
      },
      {
        label: 'backword',
        accelerator: 'CmdOrCtrl+Left',
        click: (menuItem, browserWindow) => {
          browserWindow.webContents.send('backword')
        }
      }
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
  createDB()
  createWindow()
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
    setTimeout(() => {
      mainWindow.setTouchBar(playlistTouchBar)
    }, 6000)
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
})

app.on('window-all-closed', () => { app.quit() })
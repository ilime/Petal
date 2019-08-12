import { BrowserWindow } from 'electron'
import db from './db'
import { isDarwin } from './platform'
import url from 'url'

export let mainWindow = null

export const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 330,
    minWidth: 250,
    minHeight: 385,
    height: 330,
    resizable: true,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })

  mainWindow.loadURL(
    process.env.NODE_ENV === 'development'
      ? url.format('http://localhost:3000')
      : url.format({
          pathname: __dirname + '/index.html',
          protocol: 'file:'
        })
  )

  if (process.env.NODE_ENV === 'development') {
    const { default: installer, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer')
    /* eslint-disable */
    Promise.all([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].map(installer))
      .then(() => {
        console.log('install dev tools successfully')
      })
      .catch(console.log)
    /* eslint-enable */
    mainWindow.webContents.openDevTools()
  }

  mainWindow.once('ready-to-show', () => {
    setWindowPostionFromDB()
    mainWindow.show()
  })
}

function getCurrentWindowPostion() {
  return mainWindow.getPosition()
}

export function setWindowPostionFromDB() {
  db.findOne({ setting: 'normal' }, (err, doc) => {
    if (doc !== null) {
      if (doc.restoreLastWinPos) {
        db.findOne({ window: 'position' }, (err, doc) => {
          if (doc != null) {
            mainWindow.setPosition(doc.pos[0], doc.pos[1], isDarwin ? true : undefined)
          }
        })
      }
    }
  })
}

export function saveCurrentWindowPosition() {
  db.findOne({ window: 'position' }, (err, doc) => {
    if (doc !== null) {
      db.update(
        { window: 'position' },
        {
          $set: {
            pos: getCurrentWindowPostion()
          }
        }
      )
    } else {
      db.insert({
        window: 'position',
        pos: getCurrentWindowPostion()
      })
    }
  })
}

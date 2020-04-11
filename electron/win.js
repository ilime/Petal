import { BrowserWindow } from 'electron'
import db from './db'
import { isDarwin, isPlasma} from './platform'
import url from 'url'

export let mainWindow = null

export let mainWindowProps = {
  width: 330,
  height: 330,
  minWidth: 330,
  minHeight: 330,
  maxWidth: 430,
  maxHeight: 800,
  resizable: true,
  frame: false,
  show: false,
  webPreferences: {
    nodeIntegration: true,
    webSecurity: false
  }
}
export let mainWindowPropsLoadingFinish ={
  width: 330,
  height: 500,
  minWidth: 330,
  minHeight: 500
}
const plasmaWindowProps = {
  transparent: true,
  resizable: false,
  width: mainWindowProps.width + 15*2,
  height: mainWindowProps.height + 15*2,
}
const plasmaWindowPropsLoadingFinish = {
  width: mainWindowPropsLoadingFinish.width + 15*2,
  height: mainWindowPropsLoadingFinish.height + 15*2
}
export const createWindow = () => {
  let delay = 0
  if (isPlasma) {
    Object.assign(mainWindowProps, plasmaWindowProps)
    Object.assign(mainWindowPropsLoadingFinish, plasmaWindowPropsLoadingFinish)
    delay = 300
  }
  // For the reason of delay, see https://github.com/electron/electron/issues/16809

  setTimeout(()=>{
    mainWindow = new BrowserWindow(mainWindowProps)
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
  }, delay)
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
  db.update(
    {
      window: 'position'
    },
    {
      window: 'position',
      pos: getCurrentWindowPostion()
    },
    {
      multi: false,
      upsert: true
    }
  )
}

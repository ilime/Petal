import { BrowserWindow } from 'electron'
import url from 'url'
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'

export let mainWindow = null

export const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 330,
    height: 330,
    resizable: false,
    frame: false,
    show: false
  })

  mainWindow.loadURL(url.format({
    pathname: __dirname + '/index.html',
    protocol: 'file:'
  }))

  if (process.env.NODE_ENV === 'development') {
    /* eslint-disable */
    Promise.all([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].map(tool => installExtension(tool)))
      .then(() => {
        console.log('install dev tools successfully')
      })
      .catch(console.log)
    /* eslint-enable */
    mainWindow.webContents.openDevTools()
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
}

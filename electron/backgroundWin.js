import { BrowserWindow } from 'electron'
import url from 'url'

export let backgroundWindow = null

export const createBackgroundWindow = () => {
  backgroundWindow = new BrowserWindow({
    minimizable: false,
    fullscreenable: false,
    maximizable: false,
    resizable: false,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    show: false,
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true,
    },
    hasShadow: false,
  })

  backgroundWindow.loadURL(
    process.env.NODE_ENV === 'development'
      ? url.format('http://localhost:3000/background.html')
      : url.format({
          pathname: __dirname + '/background.html',
          protocol: 'file:',
        })
  )

  if (process.env.NODE_ENV === 'development') {
    backgroundWindow.webContents.openDevTools()
  }
}

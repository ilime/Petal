import { app, ipcMain } from 'electron'
import { mainWindow, backgroundWindow } from './win'
import Tray from './tray'
import t, {
  resourcesFolder,
  pauseAndStart,
  rateAndUnrate,
  trashOrBackward,
  skipOrForward,
  touchBarState
} from './touchbar'

dispatchMsgBgToMain('trayCtrlPause', 'pause')
dispatchMsgBgToMain('trayCtrlLove', 'love')
dispatchMsgBgToMain('trayCtrlTrash', 'trash')
dispatchMsgBgToMain('trayCtrlSkip', 'skip')
dispatchMsgBgToMain('trayCtrlForward', 'forward')
dispatchMsgBgToMain('trayCtrlBackward', 'backward')

ipcMain.on('trayDraw', (_, arg) => {
  Tray.setTrayImage(arg)
})

ipcMain.on('touchBarPauseAndStart', (_, arg) => {
  if (arg === true) {
    pauseAndStart.icon = `${resourcesFolder}pause.png`
  } else {
    pauseAndStart.icon = `${resourcesFolder}play.png`
  }
})

ipcMain.on('appIconPauseAndStart', (_, arg) => {
  if (process.platform !== 'darwin') {
    return
  }
  backgroundWindow.webContents.send('trayPauseAndStart', arg)
})

ipcMain.on('touchBarResetPause', () => {
  pauseAndStart.icon = `${resourcesFolder}pause.png`
  backgroundWindow.webContents.send('trayPauseAndStart', true)
})

ipcMain.on('touchBarRateColor', (_, arg) => {
  if (arg === 'red') {
    rateAndUnrate.icon = `${resourcesFolder}rate.png`
    backgroundWindow.webContents.send('trayRateAndUnrate', true)
  }

  if (arg === 'white') {
    rateAndUnrate.icon = `${resourcesFolder}unrate.png`
    backgroundWindow.webContents.send('trayRateAndUnrate', false)
  }
})

ipcMain.on('patternSwitch', (_, arg) => {
  switch (arg) {
    case 'select':
      toPlaylist()
      backgroundWindow.webContents.send('trayPlaylistPattern')
      break
    case 'recent':
    case 'redheart':
    case 'daily':
      // case 'sheet':
      toSonglist()
      backgroundWindow.webContents.send('traySonglistPattern')
      break
    default:
      return
  }
})

ipcMain.on('resizeWindowAfterLoading', () => {
  mainWindow.setSize(330, 500)
})

ipcMain.on('reInitWindowSize', () => {
  mainWindow.setSize(330, 330)
})

ipcMain.on('mainWindowReady', () => {
  mainWindow.setTouchBar(t)
  backgroundWindow.webContents.send('trayShow')
})

ipcMain.on('appQuit', () => {
  if (process.platform === 'darwin') {
    mainWindow.hide()
    Tray.osxContextMenu.items[0].enabled = true
    Tray.osxContextMenu.items[1].enabled = false
  } else {
    app.quit()
  }
})

function toPlaylist() {
  touchBarState.pattern = 0
  trashOrBackward.icon = `${resourcesFolder}trash.png`
  skipOrForward.icon = `${resourcesFolder}skip.png`
}

function toSonglist() {
  touchBarState.pattern = 1
  trashOrBackward.icon = `${resourcesFolder}backward.png`
  skipOrForward.icon = `${resourcesFolder}forward.png`
}

function dispatchMsgBgToMain(channelBg, channelMain) {
  ipcMain.on(channelBg, () => {
    mainWindow.webContents.send(channelMain)
  })
}

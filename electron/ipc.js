import { app, ipcMain } from 'electron'
import { mainWindow } from './win'
import { backgroundWindow } from './backgroundWin'
import Tray from './tray'
import t, { resourcesFolder, pauseAndStart, rateAndUnrate, trashOrBackward, skipOrForward } from './touchbar'
import { pattern as FMPattern } from './pattern'

ipcMain.on('trayDraw', (_, arg) => {
  Tray.setTrayImage(arg)
})

ipcMain.on('trayLyricNextSong', (_, arg) => {
  backgroundWindow.webContents.send('trayLyricNextSong', arg)
})

ipcMain.on('trayLyricNext', (_, arg) => {
  backgroundWindow.webContents.send('trayLyricNext', arg)
})

dispatchMsgBgToMain('trayCtrlPause', 'pause')
dispatchMsgBgToMain('trayCtrlLove', 'love')
dispatchMsgBgToMain('trayCtrlTrash', 'trash')
dispatchMsgBgToMain('trayCtrlSkip', 'skip')
dispatchMsgBgToMain('trayCtrlForward', 'forward')
dispatchMsgBgToMain('trayCtrlBackward', 'backward')

ipcMain.on('FMPauseAndStart', (_, playing) => {
  if (playing) {
    pauseAndStart.icon = `${resourcesFolder}pause.png`
  } else {
    pauseAndStart.icon = `${resourcesFolder}play.png`
  }

  sendToTrayRenderer('trayPause', playing)
})

ipcMain.on('FMResetPause', () => {
  pauseAndStart.icon = `${resourcesFolder}pause.png`

  sendToTrayRenderer('trayResetPause')
})

ipcMain.on('FMRateColor', (_, love) => {
  if (love === 'red') {
    rateAndUnrate.icon = `${resourcesFolder}rate.png`
  }

  if (love === 'white') {
    rateAndUnrate.icon = `${resourcesFolder}unrate.png`
  }

  sendToTrayRenderer('trayRateColor', love)
})

ipcMain.on('patternSwitch', (_, arg) => {
  switch (arg) {
    case 'select':
      toPlaylist()
      break
    case 'recent':
    case 'redheart':
    case 'daily':
      // case 'sheet':
      toSonglist()
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
  if (process.platform === 'darwin') {
    mainWindow.setTouchBar(t)
    backgroundWindow.webContents.send('trayShow')
  }
})

ipcMain.on('appQuit', () => {
  if (process.platform === 'darwin') {
    mainWindow.hide()
  } else {
    app.quit()
  }
})

function toPlaylist() {
  FMPattern.state = 0
  trashOrBackward.icon = `${resourcesFolder}trash.png`
  skipOrForward.icon = `${resourcesFolder}skip.png`

  sendToTrayRenderer('trayToPlaylist')
}

function toSonglist() {
  FMPattern.state = 1
  trashOrBackward.icon = `${resourcesFolder}backward.png`
  skipOrForward.icon = `${resourcesFolder}forward.png`

  sendToTrayRenderer('trayToSonglist')
}

function sendToTrayRenderer(channel, arg) {
  backgroundWindow.webContents.send(channel, arg)
}

function dispatchMsgBgToMain(channelBg, channelMain) {
  ipcMain.on(channelBg, () => {
    mainWindow.webContents.send(channelMain)
  })
}

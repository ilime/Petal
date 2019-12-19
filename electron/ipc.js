import { app, ipcMain } from 'electron'
import { isDarwin, isLinux } from './platform'
import t, { pauseAndStart, rateAndUnrate, resourcesFolder, skipOrForward, trashOrBackward } from './touchbar'

import { pattern as FMPattern } from './pattern'
import Tray from './tray'
import { backgroundWindow } from './backgroundWin'
import { mainWindow } from './win'
import { mpris } from './mpris' // MPRIS: Linux D-BUS Remote Music Control Interface

ipcMain.on('trayDraw', (_, arg) => {
  if (isDarwin) {
    Tray.setTrayImage(arg)
  }
})

ipcMain.on('trayMenuShow', () => {
  Tray.popUpContextMenu()
})

ipcMain.on('trayLyricNextSong', (_, arg) => {
  if (isDarwin) {
    backgroundWindow.webContents.send('trayLyricNextSong', arg)
  }
})

ipcMain.on('trayLyricNext', (_, arg) => {
  if (isDarwin) {
    backgroundWindow.webContents.send('trayLyricNext', arg)
  }
})

ipcMain.on('trayCompactStatusBar', (_, arg) => {
  if (isDarwin) {
    backgroundWindow.webContents.send('trayCompactStatusBar', arg)
  }
})

ipcMain.on('mprisSetMetadata', (_, arg) => {
  if (isLinux) {
    mpris.setMetadata(arg)
  }
})

dispatchMsgBgToMain('trayCtrlPause', 'pause') // Actually play-pause
dispatchMsgBgToMain('trayCtrlLove', 'love')
dispatchMsgBgToMain('trayCtrlTrash', 'trash')
dispatchMsgBgToMain('trayCtrlSkip', 'skip')
dispatchMsgBgToMain('trayCtrlForward', 'forward')
dispatchMsgBgToMain('trayCtrlBackward', 'backward')

ipcMain.on('FMPauseAndStart', (_, playing) => {
  if (isDarwin) {
    if (playing) {
      pauseAndStart.icon = `${resourcesFolder}pause.png`
    } else {
      pauseAndStart.icon = `${resourcesFolder}play.png`
    }

    sendToTrayRenderer('trayPause', playing)
  } else if (isLinux) {
    // mpris pause and start
    mpris.setPlayingStatus(playing)
  }
})

ipcMain.on('FMResetPause', () => {
  if (isDarwin) {
    pauseAndStart.icon = `${resourcesFolder}pause.png`

    sendToTrayRenderer('trayResetPause')
  } else if (isLinux) {
    mpris.setPlayingStatus(false)
  }
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
  mainWindow.setMinimumSize(330, 500)
})

ipcMain.on('reInitWindowSize', () => {
  mainWindow.setMinimumSize(330, 330)
  mainWindow.setSize(330, 330)
})

ipcMain.on('mainWindowReady', () => {
  if (isDarwin) {
    mainWindow.setTouchBar(t)
    backgroundWindow.webContents.send('trayShow')
  }
})

ipcMain.on('appQuit', () => {
  if (isDarwin) {
    mainWindow.hide()
  } else {
    app.quit()
  }
})

ipcMain.on('appMinimize', () => {
  if (isDarwin) {
    mainWindow.minimize()
  } else {
    mainWindow.hide()
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

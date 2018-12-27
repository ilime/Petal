import { app, ipcMain } from 'electron'
import { mainWindow } from './win'
import { contextMenu } from './tray'
import t, {
  resourcesFolder,
  pauseAndStart,
  rateAndUnrate,
  trashOrBackward,
  skipOrForward,
  touchBarState
} from './touchbar'

ipcMain.on('touchBarPauseAndStart', (event, arg) => {
  if (arg === true) {
    pauseAndStart.icon = `${resourcesFolder}pause.png`
  } else {
    pauseAndStart.icon = `${resourcesFolder}play.png`
  }
})

ipcMain.on('touchBarResetPause', () => {
  pauseAndStart.icon = `${resourcesFolder}pause.png`
})

ipcMain.on('touchBarRateColor', (event, arg) => {
  if (arg === 'red') {
    rateAndUnrate.icon = `${resourcesFolder}rate.png`
  }

  if (arg === 'white') {
    rateAndUnrate.icon = `${resourcesFolder}unrate.png`
  }
})

ipcMain.on('patternSwitch', (event, arg) => {
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

ipcMain.on('setTouchBar', () => {
  mainWindow.setTouchBar(t)
})

ipcMain.on('appQuit', () => {
  if (process.platform === 'darwin') {
    mainWindow.hide()
    contextMenu.items[0].enabled = true
    contextMenu.items[1].enabled = false
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

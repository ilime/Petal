import { app, ipcMain } from 'electron'
import { mainWindow } from './win'
import { appIcon, osxContextMenu, appIconTypeInOSX, setAppIconTypeInOSX } from './tray'
import t, { resourcesFolder, pauseAndStart, rateAndUnrate, trashOrBackward, skipOrForward } from './touchbar'
import { pattern } from './pattern'

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

  let status = ''

  if (arg.pattern === 'select') {
    setAppIconTypeInOSX('normal')
  } else {
    setAppIconTypeInOSX('list')
  }

  if (!arg.playing) {
    status = '-pause'
  }

  appIcon.setImage(`${resourcesFolder}osx/icon-${appIconTypeInOSX}${status}.png`)
})

ipcMain.on('touchBarResetPause', () => {
  pauseAndStart.icon = `${resourcesFolder}pause.png`
})

ipcMain.on('touchBarRateColor', (_, arg) => {
  if (arg === 'red') {
    rateAndUnrate.icon = `${resourcesFolder}rate.png`
  }

  if (arg === 'white') {
    rateAndUnrate.icon = `${resourcesFolder}unrate.png`
  }
})

ipcMain.on('patternSwitch', (_, arg) => {
  switch (arg) {
    case 'select':
      toPlaylist()
      if (process.platform === 'darwin') {
        setAppIconTypeInOSX('normal')
        appIcon.setImage(`${resourcesFolder}osx/icon-${appIconTypeInOSX}.png`)
      }
      break
    case 'recent':
    case 'redheart':
    case 'daily':
      // case 'sheet':
      toSonglist()
      if (process.platform === 'darwin') {
        setAppIconTypeInOSX('list')
        appIcon.setImage(`${resourcesFolder}osx/icon-${appIconTypeInOSX}.png`)
      }
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
    osxContextMenu.items[0].enabled = true
    osxContextMenu.items[1].enabled = false
  } else {
    app.quit()
  }
})

function toPlaylist() {
  pattern.state = 0
  trashOrBackward.icon = `${resourcesFolder}trash.png`
  skipOrForward.icon = `${resourcesFolder}skip.png`
}

function toSonglist() {
  pattern.state = 1
  trashOrBackward.icon = `${resourcesFolder}backward.png`
  skipOrForward.icon = `${resourcesFolder}forward.png`
}

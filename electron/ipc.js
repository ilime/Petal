import { ipcMain } from 'electron'
import { mainWindow } from './win'
import * as tb from './touchbar'

ipcMain.on('touchBarPauseAndStart', (event, arg) => {
  if (arg === true) {
    tb.pauseAndStart.icon = __dirname + '/resources/pause.png'
    tb.touchBarState.pause = false
  } else {
    tb.pauseAndStart.icon = __dirname + '/resources/play.png'
    tb.touchBarState.pause = true
  }
})

ipcMain.on('touchBarResetPause', () => {
  tb.pauseAndStart.icon = __dirname + '/resources/pause.png'
  tb.touchBarState.pause = false
})

ipcMain.on('touchBarRateColor', (event, arg) => {
  if (arg === 'red') {
    tb.touchBarState.isRate = true
    tb.rateAndUnrate.icon = __dirname + '/resources/rate.png'
  }

  if (arg === 'white') {
    tb.touchBarState.isRate = false
    tb.rateAndUnrate.icon = __dirname + '/resources/unrate.png'
  }
})

ipcMain.on('patternSwitch', (event, arg) => {
  switch (arg) {
    case 'select':
      mainWindow.setTouchBar(tb.playlistTouchBar)
      break
    case 'recent':
      mainWindow.setTouchBar(tb.songListTouchBar)
      break
    case 'redheart':
      mainWindow.setTouchBar(tb.songListTouchBar)
      break
    case 'daily':
      mainWindow.setTouchBar(tb.songListTouchBar)
      break
    // case 'sheet':
    //   mainWindow.setTouchBar(tb.songListTouchBar)
    //   break
    default:
      mainWindow.setTouchBar(tb.playlistTouchBar)
  }
})

ipcMain.on('resizeWindowAfterLoading', () => {
  mainWindow.setSize(330, 500)
})

ipcMain.on('reInitWindowSize', () => {
  mainWindow.setSize(330, 330)
})

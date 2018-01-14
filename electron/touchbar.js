import { TouchBar } from 'electron'
import { mainWindow } from './win'

const { TouchBarButton } = TouchBar

export const touchBarState = {
  pause: false,
  isRate: false
}

export const pauseAndStart = new TouchBarButton({
  icon: __dirname + '/resources/pause.png',
  click: () => {
    mainWindow.webContents.send('pause')
  }
})

export const rateAndUnrate = new TouchBarButton({
  icon: __dirname + '/resources/unrate.png',
  click: () => {
    mainWindow.webContents.send('love')
  }
})

export const playlistTouchBar = new TouchBar([
  new TouchBarButton({
    icon: __dirname + '/resources/trash.png',
    click: () => { mainWindow.webContents.send('trash') }
  }),
  pauseAndStart,
  new TouchBarButton({
    icon: __dirname + '/resources/skip.png',
    click: () => { mainWindow.webContents.send('skip') }
  }),
  rateAndUnrate
])

export const songListTouchBar = new TouchBar([
  new TouchBarButton({
    icon: __dirname + '/resources/backward.png',
    click: () => { mainWindow.webContents.send('backward') }
  }),
  pauseAndStart,
  new TouchBarButton({
    icon: __dirname + '/resources/forward.png',
    click: () => { mainWindow.webContents.send('forward') }
  }),
  rateAndUnrate
])

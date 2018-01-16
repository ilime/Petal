import { TouchBar } from 'electron'
import { mainWindow } from './win'

const { TouchBarButton } = TouchBar

const resourcesFolder = __dirname + '/resources/'

export const touchBarState = {
  pause: false,
  isRate: false
}

export const pauseAndStart = new TouchBarButton({
  icon: `${resourcesFolder}pause.png`,
  click: () => {
    mainWindow.webContents.send('pause')
  }
})

export const rateAndUnrate = new TouchBarButton({
  icon: `${resourcesFolder}unrate.png`,
  click: () => {
    mainWindow.webContents.send('love')
  }
})

export const playlistTouchBar = new TouchBar([
  new TouchBarButton({
    icon: `${resourcesFolder}trash.png`,
    click: () => { mainWindow.webContents.send('trash') }
  }),
  pauseAndStart,
  new TouchBarButton({
    icon: `${resourcesFolder}skip.png`,
    click: () => { mainWindow.webContents.send('skip') }
  }),
  rateAndUnrate
])

export const songListTouchBar = new TouchBar([
  new TouchBarButton({
    icon: `${resourcesFolder}backward.png`,
    click: () => { mainWindow.webContents.send('backward') }
  }),
  pauseAndStart,
  new TouchBarButton({
    icon: `${resourcesFolder}forward.png`,
    click: () => { mainWindow.webContents.send('forward') }
  }),
  rateAndUnrate
])

export function createTouchBar() {
  if (process.platform === 'darwin') {
    setTimeout(() => {
      mainWindow.setTouchBar(playlistTouchBar)
    }, 8000)
  }
}

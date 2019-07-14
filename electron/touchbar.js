import { TouchBar } from 'electron'
import { mainWindow } from './win'

const { TouchBarButton } = TouchBar

export const resourcesFolder = __dirname + '/resources/'

export const touchBarState = {
  pattern: 0
}

export const pauseAndStart = new TouchBarButton({
  icon: `${resourcesFolder}pause.png`,
  click() {
    mainWindow.webContents.send('pause')
  }
})

export const rateAndUnrate = new TouchBarButton({
  icon: `${resourcesFolder}unrate.png`,
  click() {
    mainWindow.webContents.send('love')
  }
})

export const trashOrBackward = new TouchBarButton({
  icon: `${resourcesFolder}trash.png`,
  click() {
    if (touchBarState.pattern === 0) {
      mainWindow.webContents.send('trash')
    }
    if (touchBarState.pattern === 1) {
      mainWindow.webContents.send('backward')
    }
  }
})

export const skipOrForward = new TouchBarButton({
  icon: `${resourcesFolder}backward.png`,
  click() {
    if (touchBarState.pattern === 0) {
      mainWindow.webContents.send('skip')
    }
    if (touchBarState.pattern === 1) {
      mainWindow.webContents.send('forward')
    }
  }
})

export default new TouchBar({
  items: [trashOrBackward, pauseAndStart, skipOrForward, rateAndUnrate]
})

import { TouchBar } from 'electron'
import { mainWindow } from './win'
import { pattern } from './pattern'

const { TouchBarButton } = TouchBar

export const resourcesFolder = __dirname + '/resources/'

export const pauseAndStart = new TouchBarButton({
  icon: `${resourcesFolder}pause.png`,
  click() {
    mainWindow.webContents.send('pause')
  },
})

export const rateAndUnrate = new TouchBarButton({
  icon: `${resourcesFolder}unrate.png`,
  click() {
    mainWindow.webContents.send('love')
  },
})

export const trashOrBackward = new TouchBarButton({
  icon: `${resourcesFolder}trash.png`,
  click() {
    if (pattern.state === 0) {
      mainWindow.webContents.send('trash')
    }
    if (pattern.state === 1) {
      mainWindow.webContents.send('backward')
    }
  },
})

export const skipOrForward = new TouchBarButton({
  icon: `${resourcesFolder}backward.png`,
  click() {
    if (pattern.state === 0) {
      mainWindow.webContents.send('skip')
    }
    if (pattern.state === 1) {
      mainWindow.webContents.send('forward')
    }
  },
})

export default new TouchBar({
  items: [trashOrBackward, pauseAndStart, skipOrForward, rateAndUnrate],
})

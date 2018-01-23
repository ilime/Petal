import { Tray, Menu, app } from 'electron'
import { mainWindow } from './win'

let appIcon = null
const resourcesFolder = __dirname + '/resources/'

const contextMenu = Menu.buildFromTemplate([
  {
    label: 'Open',
    click() {
      if (mainWindow.isVisible()) {
        mainWindow.hide()
      } else {
        mainWindow.show()
      }
    }
  },
  {
    type: 'separator'
  },
  {
    label: 'Attach To Menu',
    type: 'checkbox',
    checked: false,
    click() {
      windowTopSwitch()
    }
  },
  {
    type: 'separator'
  },
  {
    label: 'Quit',
    click() {
      app.quit()
    }
  }
])

function windowTopSwitch() {
  let appIconRect = appIcon.getBounds()
  let mainWindowRect = mainWindow.getBounds()
  let currentItem = contextMenu.items[2]

  if (currentItem.checked === true) {
    if (process.platform === 'darwin') {
      mainWindow.setPosition(
        appIconRect.x - mainWindowRect.width / 2 + appIconRect.width / 2,
        appIconRect.y
      )
    }
    if (process.platform === 'win32') {
      mainWindow.setPosition(
        appIconRect.x - mainWindowRect.width / 2 + appIconRect.width / 2,
        appIconRect.y - mainWindowRect.height
      )
    }
  } else {
    mainWindow.center()
  }
}

export default function createTray() {
  if (process.platform === 'darwin') {
    appIcon = new Tray(`${resourcesFolder}osx/icon.png`)
  } else if (process.platform == 'win32') {
    appIcon = new Tray(`${resourcesFolder}win/icon.ico`)
  }
  appIcon.setContextMenu(contextMenu)
}

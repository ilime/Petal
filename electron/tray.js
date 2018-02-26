import { Tray, Menu, app } from 'electron'
import { mainWindow } from './win'

let appIcon = null
const resourcesFolder = __dirname + '/resources/'

const contextMenu = Menu.buildFromTemplate([
  {
    label: '打开',
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
    label: '贴附到状态栏',
    type: 'checkbox',
    checked: false,
    enabled: process.platform === 'win32' ? false : true,
    click() {
      windowTopSwitch()
    }
  },
  {
    type: 'separator'
  },
  {
    label: '退出',
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

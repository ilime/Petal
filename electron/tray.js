import { Tray, Menu, app } from 'electron'
import { mainWindow } from './win'

let appIcon = null
const resourcesFolder = __dirname + '/resources/'

export const contextMenu = Menu.buildFromTemplate([
  {
    label: '打开',
    enabled: false,
    click() {
      mainWindow.show()
      contextMenu.items[0].enabled = false
      contextMenu.items[1].enabled = true
      if (process.platform === 'linux') {
        appIcon.setContextMenu(contextMenu)
      }
    }
  },
  {
    label: '隐藏',
    enabled: true,
    click() {
      mainWindow.hide()
      contextMenu.items[0].enabled = true
      contextMenu.items[1].enabled = false
      if (process.platform === 'linux') {
        appIcon.setContextMenu(contextMenu)
      }
    }
  },
  { type: 'separator' },
  {
    label: '红心',
    click() {
      mainWindow.webContents.send('love')
    }
  },
  {
    label: '跳过',
    click() {
      mainWindow.webContents.send('skip')
    }
  },
  {
    label: '垃圾桶',
    click() {
      mainWindow.webContents.send('trash')
    }
  },
  { type: 'separator' },
  {
    label: '贴附到状态栏',
    type: 'checkbox',
    checked: false,
    enabled:
      process.platform === 'win32' || process.platform === 'linux'
        ? false
        : true,
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
  let currentItem = contextMenu.items[7]

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
  } else if (process.platform === 'win32') {
    appIcon = new Tray(`${resourcesFolder}win/icon.ico`)
  } else if (process.platform === 'linux') {
    appIcon = new Tray(`${resourcesFolder}linux/icon.png`)
  }
  appIcon.setContextMenu(contextMenu)
}

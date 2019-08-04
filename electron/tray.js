import { Tray, Menu, app } from 'electron'
import { mainWindow } from './win'

export let appIcon = null
const resourcesFolder = __dirname + '/resources/'

const contextMenu = Menu.buildFromTemplate([
  {
    label: '切换显示/隐藏',
    enabled: true,
    click() {
      if (mainWindow.isVisible()) {
        mainWindow.hide()
      }
      else {
        mainWindow.show()
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
    label: '退出',
    click() {
      app.quit()
    }
  }
])

function windowTopSwitch() {
  let appIconRect = appIcon.getBounds()
  let mainWindowRect = mainWindow.getBounds()
  let currentItem = osxContextMenu.items[3]

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

export const osxContextMenu = Menu.buildFromTemplate([
  {
    label: '打开',
    enabled: false,
    click() {
      mainWindow.show()
      osxContextMenu.items[0].enabled = false
      osxContextMenu.items[1].enabled = true
    }
  },
  {
    label: '隐藏',
    enabled: true,
    click() {
      mainWindow.hide()
      osxContextMenu.items[0].enabled = true
      osxContextMenu.items[1].enabled = false
    }
  },
  { type: 'separator' },
  {
    label: '贴附到状态栏',
    type: 'checkbox',
    checked: false,
    enabled: true,
    click() {
      windowTopSwitch()
    }
  },
  { type: 'separator' },
  {
    label: '退出',
    click() {
      app.quit()
    }
  }
])

export let appIconTypeInOSX = 'normal'
export function setAppIconTypeInOSX(type) {
  appIconTypeInOSX = type
}

function setAppIconEvent() {
  appIcon.on('right-click', () => {
    appIcon.popUpContextMenu(osxContextMenu)
  })

  appIcon.on('click', (_, bounds, position) => {
    const appIconRect = bounds
    const clickPositionX = position.x

    const unit = Math.round(appIconRect.width * 0.265)

    const one = unit
    const two = unit * 2
    const three = unit * 3

    let event1 = ''
    const event2 = 'pause'
    let event3 = ''

    if (appIconTypeInOSX === 'normal') {
      event1 = 'trash'
      event3 = 'skip'
    }

    if (appIconTypeInOSX === 'list') {
      event1 = 'backward'
      event3 = 'forward'
    }

    if (clickPositionX <= one) {
      mainWindow.webContents.send(event1)
    } else if (clickPositionX > one && clickPositionX <= two) {
      mainWindow.webContents.send(event2)
    } else if (clickPositionX > two && clickPositionX <= three) {
      mainWindow.webContents.send(event3)
    } else {
      appIcon.popUpContextMenu(osxContextMenu)
    }
  })
}

export default function createTray() {
  if (process.platform === 'darwin') {
    appIcon = new Tray(`${resourcesFolder}osx/icon-normal.png`)
    setAppIconEvent(appIcon)

    return
  } else if (process.platform === 'win32') {
    appIcon = new Tray(`${resourcesFolder}win/icon.ico`)
  } else if (process.platform === 'linux') {
    appIcon = new Tray(`${resourcesFolder}linux/icon.png`)
  }

  appIcon.setContextMenu(contextMenu)
}

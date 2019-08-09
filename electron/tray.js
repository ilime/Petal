import { Menu, Tray, app, nativeImage } from 'electron'
import { isDarwin, isLinux, isWin } from './platform'

import { backgroundWindow } from './backgroundWin'
import { mainWindow } from './win'

const resourcesFolder = __dirname + '/resources/'

export default {
  tray: null,
  contextMenu: null,
  osxContextMenu: null,
  init() {
    if (isDarwin) {
      initOSXContextMenu.bind(this)()
    } else {
      initNormalContextMenu.bind(this)()
    }

    if (isDarwin) {
      this.tray = new Tray(nativeImage.createEmpty())
      // https://electronjs.org/docs/api/tray#traysethighlightmodemode-macos
      this.tray.setHighlightMode('never')
      this.tray.on('right-click', () => {
        this.tray.popUpContextMenu(this.osxContextMenu)
      })
      this.tray.on('click', (event, bounds, position) => {
        backgroundWindow.webContents.send('trayClick', { event, bounds, position })
      })
    } else if (isWin) {
      this.tray = new Tray(`${resourcesFolder}win/icon.ico`)
    } else if (isLinux) {
      this.tray = new Tray(process.env.PETAL_FORCE_OSX_ICON?`${resourcesFolder}osx/${process.env.PETAL_FORCE_OSX_ICON}/logo.png`:`${resourcesFolder}linux/icon.png`)
    }

    if (!isDarwin) {
      this.tray.setContextMenu(this.contextMenu)
    }
  },
  setTrayImage(img) {
    const bounds = this.tray.getBounds()
    const Image = nativeImage.createFromDataURL(img).resize({
      height: bounds ? bounds.height : 22
    })
    this.tray.setImage(Image)
  },
  popUpContextMenu() {
    this.tray.popUpContextMenu(this.osxContextMenu)
  }
}

function initNormalContextMenu() {
  this.contextMenu = Menu.buildFromTemplate([
    {
      label: '切换显示/隐藏',
      enabled: true,
      click: mainWindowVisiableSwitch
    },
    { type: 'separator' },
    {
      label: '切换暂停/开始',
      click: () => mainWindow.webContents.send('pause')
    },
    {
      label: '红心',
      click: () => mainWindow.webContents.send('love')
    },
    {
      label: '跳过',
      click: () => mainWindow.webContents.send('skip')
    },
    {
      label: '垃圾桶',
      click: () => mainWindow.webContents.send('trash')
    },
    { type: 'separator' },
    {
      label: '退出',
      click: app.quit
    }
  ])
}

function initOSXContextMenu() {
  this.osxContextMenu = Menu.buildFromTemplate([
    {
      label: '切换显示/隐藏',
      enabled: true,
      click: mainWindowVisiableSwitch
    },
    { type: 'separator' },
    {
      label: '贴附到状态栏',
      type: 'checkbox',
      checked: false,
      enabled: true,
      click: () => {
        // windowTopSwitch
        let appIconRect = this.tray.getBounds()
        let mainWindowRect = mainWindow.getBounds()
        let currentItem = this.osxContextMenu.items[2]

        if (currentItem.checked === true) {
          if (isDarwin) {
            mainWindow.setPosition(appIconRect.x - mainWindowRect.width / 2 + appIconRect.width / 2, appIconRect.y)
          }
        } else {
          mainWindow.center()
        }
      }
    },
    { type: 'separator' },
    {
      label: '退出',
      click: app.quit
    }
  ])
}

function mainWindowVisiableSwitch() {
  if (mainWindow.isVisible()) {
    mainWindow.hide()
  } else {
    mainWindow.show()
  }
}

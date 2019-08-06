import { Menu, app } from 'electron'

import { mainWindow } from './win'
import { isDarwin } from './platform'

const template = [
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isDarwin
        ? [
            { role: 'pasteAndMatchStyle' },
            { role: 'delete' },
            { role: 'selectAll' },
            { type: 'separator' },
            {
              label: 'Speech',
              submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }]
            }
          ]
        : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }])
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isDarwin ? [{ type: 'separator' }, { role: 'front' }] : [{ role: 'close' }])
    ]
  },
  {
    label: 'Operations',
    submenu: [
      {
        label: 'Pause',
        accelerator: 'Space',
        click() {
          mainWindow.webContents.send('pause')
        }
      },
      {
        label: 'Love',
        accelerator: 'CmdOrCtrl+l',
        click() {
          mainWindow.webContents.send('love')
        }
      },
      {
        label: 'Skip',
        accelerator: 'CmdOrCtrl+k',
        click() {
          mainWindow.webContents.send('skip')
        }
      },
      {
        label: 'Trash',
        accelerator: 'CmdOrCtrl+t',
        click() {
          mainWindow.webContents.send('trash')
        }
      },
      {
        label: 'Forward',
        accelerator: 'CmdOrCtrl+Right',
        click() {
          mainWindow.webContents.send('forward')
        }
      },
      {
        label: 'Backward',
        accelerator: 'CmdOrCtrl+Left',
        click() {
          mainWindow.webContents.send('backward')
        }
      }
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Source Code Repository',
        click() {
          require('electron').shell.openExternal('https://github.com/ilime/Petal')
        }
      }
    ]
  }
]

export default function createMenu() {
  if (isDarwin) {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    })
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

import { app, Menu } from 'electron'

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
      { role: 'delete' },
      { role: 'selectall' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' }
    ]
  },
  {
    label: 'Window',
    submenu: [{ role: 'minimize' }]
  },
  {
    label: 'Operation',
    submenu: [
      {
        label: 'Pause',
        accelerator: 'Space',
        click: (menuItem, browserWindow) => {
          browserWindow.webContents.send('pause')
        }
      },
      {
        label: 'Love',
        accelerator: 'CmdOrCtrl+l',
        click: (menuItem, browserWindow) => {
          browserWindow.webContents.send('love')
        }
      },
      {
        label: 'Skip',
        accelerator: 'CmdOrCtrl+k',
        click: (menuItem, browserWindow) => {
          browserWindow.webContents.send('skip')
        }
      },
      {
        label: 'Trash',
        accelerator: 'CmdOrCtrl+t',
        click: (menuItem, browserWindow) => {
          browserWindow.webContents.send('trash')
        }
      },
      {
        label: 'Forward',
        accelerator: 'CmdOrCtrl+Right',
        click: (menuItem, browserWindow) => {
          browserWindow.webContents.send('forward')
        }
      },
      {
        label: 'Backward',
        accelerator: 'CmdOrCtrl+Left',
        click: (menuItem, browserWindow) => {
          browserWindow.webContents.send('backward')
        }
      }
    ]
  },
  {
    label: 'Related',
    submenu: [
      {
        label: 'Source Code Repo',
        click() {
          require('electron').shell.openExternal('https://github.com/ilime')
        }
      },
      { type: 'separator' },
      {
        label: 'About Author',
        click() {
          require('electron').shell.openExternal('https://github.com/g1eny0ung')
        }
      }
    ]
  }
]

export default function createMenu() {
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    })
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

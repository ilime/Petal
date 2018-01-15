import { app, Menu } from 'electron'
import fs from 'fs'
import { mainWindow, createWindow } from './win'
import { playlistTouchBar } from './touchbar'
import template from './template'
import './ipc'

const createDB = () => {
  fs.access(app.getPath('home') + '/.petal.db', (err) => {
    /* eslint-disable */
    if (!err) {
      console.log('db file existed.')
    } else {
      fs.writeFile(app.getPath('home') + '/.petal.db', '', (err) => {
        if (err) throw err
        console.log('db file created!')
      })
    }
    /* eslint-enable */
  })
}

app.on('ready', () => {
  createDB()
  createWindow()
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'hide', },
        { type: 'separator' },
        { role: 'quit' }
      ]
    })
    setTimeout(() => {
      mainWindow.setTouchBar(playlistTouchBar)
    }, 8000)
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
})

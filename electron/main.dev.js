import { app } from 'electron'
import fs from 'fs'
import { createWindow } from './win'
import createMenu from './menu'
import createTray from './tray'
import { createTouchBar } from './touchbar'
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
  createMenu()
  createTray()
  createTouchBar()
})

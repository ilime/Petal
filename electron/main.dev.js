import './db'
import { app } from 'electron'
import fs from 'fs'
import { createWindow, saveCurrentWindowPosition } from './win'
import createMenu from './menu'
import createTray from './tray'
import './ipc'
//require('./mpris')

const createDB = () => {
  fs.access(app.getPath('home') + '/.petal.db', err => {
    /* eslint-disable */
    if (!err) {
      console.log('db file existed.')
    } else {
      fs.writeFile(app.getPath('home') + '/.petal.db', '', err => {
        if (err) throw err
        console.log('db file created!')
      })
    }
    /* eslint-enable */
  })
}

function createMusicDir() {
  // Patch for below
  const musicDir = app.getPath('home') + '/Music'
  if (!fs.existsSync(musicDir)) {
    fs.mkdirSync(musicDir)
  }
  const dir = app.getPath('music') + '/PETAL豆瓣FM'
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

app.on('ready', () => {
  /* eslint-disable */
  console.log('-------------------------------------')
  console.log('Node version: ', process.versions.node)
  console.log('Electron version: ', process.versions.electron)
  console.log('Chrome version: ', process.versions.chrome)
  console.log('-------------------------------------')
  /* eslint-enable */

  createDB()
  createMusicDir()
  createWindow()
  createMenu()
  createTray()
})

app.on('before-quit', () => {
  saveCurrentWindowPosition()
})

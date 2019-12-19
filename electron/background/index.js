import { ipcRenderer, remote } from 'electron'
import { TrayPainter } from './trayPainter'

const devicePixelRatio = 2
const tray = new TrayPainter(devicePixelRatio)

ipcRenderer.on('trayShow', () => {
  tray.refresh()
})

ipcRenderer.on('trayClick', (_, { position }) => {
  tray.onClick(position.x, position.y)
})

ipcRenderer.on('trayLyricNextSong', (_, song) => {
  tray.nextSong(song)
})

ipcRenderer.on('trayLyricNext', (_, { lyricText, duration }) => {
  tray.nextLyric(lyricText, duration)
})

ipcRenderer.on('trayCompactStatusBar', (_, arg) => {
  tray.onThemeChange(arg)
})

if (remote.process.platform === 'darwin') {
  remote.systemPreferences.subscribeNotification('AppleInterfaceThemeChangedNotification', () => {
    tray.refresh()
  })
}

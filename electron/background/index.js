import { Controller as TrayController, ctrlBtnWidth, ctrlPattern } from './ctrlPainter'
import { ipcRenderer, remote } from 'electron'

import Canvas from './canvas'
import { Lyric } from './lyricPainter'

const devicePixelRatio = 2
const trayController = new TrayController(devicePixelRatio)
const lyric = new Lyric(devicePixelRatio, freshTray)
const ctrlPosOffset = lyric.canvas.width
const trayWidth = trayController.canvas.width + lyric.canvas.width
const trayHeight = trayController.canvas.height
let tray = new Canvas(trayWidth, trayHeight, 1)

export function freshTray() {
  trayController.draw().then(() => {
    tray.ctx.clearRect(0, 0, trayWidth, trayHeight)
    tray.ctx.drawImage(lyric.canvas, 0, 0)
    tray.ctx.drawImage(trayController.canvas, ctrlPosOffset, 0)
    ipcRenderer.send('trayDraw', tray.canvas.toDataURL(), trayWidth)
  })
}

ipcRenderer.on('trayShow', freshTray)

ipcRenderer.on('trayClick', (_, { position }) => {
  switch (parseInt((position.x - ctrlPosOffset / devicePixelRatio) / ctrlBtnWidth)) {
    case 0:
      if (trayController.pattern === ctrlPattern.playlist) {
        ipcRenderer.send('trayCtrlTash')
      }
      if (trayController.pattern === ctrlPattern.songlist) {
        ipcRenderer.send('trayCtrlBackward')
      }
      break
    case 1:
      ipcRenderer.send('trayCtrlPause')
      break
    case 2:
      if (trayController.pattern === ctrlPattern.playlist) {
        ipcRenderer.send('trayCtrlSkip')
      }
      if (trayController.pattern === ctrlPattern.songlist) {
        ipcRenderer.send('trayCtrlForward')
      }
      break
    case 3:
      ipcRenderer.send('trayCtrlLove')
      break
    case 4:
      ipcRenderer.send('trayMenuShow')
      break
    default:
      return
  }
})

ipcRenderer.on('trayLyricNextSong', (_, song) => {
  const { title, artist, length } = song
  let cycleText = `${title} - ${artist}`
  // 30 second per cycle
  for (let i = 0, n = parseInt(length / 30); i < n; i++) cycleText = cycleText.concat(`        ${title} - ${artist}`)
  lyric.nextLyric(cycleText, length * 1000)
})

ipcRenderer.on('trayLyricNext', (_, { lyricText, duration }) => {
  lyric.nextLyric(lyricText, parseInt(duration * 1000 * 0.8))
})

if (remote.process.platform === 'darwin') {
  remote.systemPreferences.subscribeNotification('AppleInterfaceThemeChangedNotification', freshTray)
}

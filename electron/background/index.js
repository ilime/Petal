import { ipcRenderer } from 'electron'
import Canvas from './canvas'
import { Controller, ctrlBtnWidth, ctrlPattern } from './ctrlPainter'
import { Lyric } from './lyricPainter'

const devicePixelRatio = 2
let controller = new Controller(devicePixelRatio), lyric = new Lyric(devicePixelRatio, () => freshTray())
const ctrlPosOffset = lyric.canvas.width, trayWidth = controller.canvas.width + lyric.canvas.width, trayHeight = controller.canvas.height
let tray = new Canvas(trayWidth, trayHeight, 1)

function freshTray() {
  controller.draw().then(
    () => {
      tray.ctx.clearRect(0, 0, trayWidth, trayHeight)
      tray.ctx.drawImage(lyric.canvas, 0, 0)
      tray.ctx.drawImage(controller.canvas, ctrlPosOffset, 0)
      ipcRenderer.send('trayDraw', tray.canvas.toDataURL(), trayWidth)
    }
  )
}

ipcRenderer.on('trayShow', (event, arg) => {
  if (process.platform !== 'darwin') {
    return
  }
  freshTray()
})

ipcRenderer.on('trayClick', (_, { position }) => {
  switch (parseInt((position.x - ctrlPosOffset / devicePixelRatio) / ctrlBtnWidth)) {
    case 0:
      if (controller.pattern === ctrlPattern.songlist) {
        ipcRenderer.send('trayCtrlBackward')
      } else {
        ipcRenderer.send('trayCtrlTash')
      }
      break
    case 1:
      ipcRenderer.send('trayCtrlPause')
      break
    case 2:
      if (controller.pattern === ctrlPattern.songlist) {
        ipcRenderer.send('trayCtrlForward')
      } else {
        ipcRenderer.send('trayCtrlSkip')
      }
      break
    case 3:
      ipcRenderer.send('trayCtrlLove')
      break
    default:
      break
  }
})

ipcRenderer.on('trayPauseAndStart', (_, arg) => {
  controller.pauseAndStart(arg)
  freshTray()
})

ipcRenderer.on('trayRateAndUnrate', (_, arg) => {
  controller.rateAndUnrate(arg)
  freshTray()
})

ipcRenderer.on('trayPlaylistPattern', (_, arg) => {
  controller.toPlaylistPattern()
  freshTray()
})

ipcRenderer.on('traySonglistPattern', (_, arg) => {
  controller.toSonglistPattern()
  freshTray()
})

ipcRenderer.on('trayLyricNextSong', (_, { song }) => {
  const { title, artist, length } = song
  let cycleText = `${title} - ${artist}`
  // 30 second per cycle
  for(let i = 0, n = parseInt(length / 30); i < n; i++)
    cycleText = cycleText.concat(`        ${title} - ${artist}`)
  lyric.nextLyric(cycleText, length * 1000)
})

ipcRenderer.on('trayLyricNext', (_, { lyricText, duration }) => {
  lyric.nextLyric(lyricText, parseInt(duration * 1000 * 0.8))
})
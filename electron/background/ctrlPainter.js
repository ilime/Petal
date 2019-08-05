import Canvas from './canvas'
import { freshTray } from './'
import { ipcRenderer } from 'electron'

export const ctrlBtnWidth = 22
const ctrlBtnCount = 4
const resourcesFolder = (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : __dirname) + '/resources/'
export const ctrlPattern = {
  songlist: 0,
  playlist: 1
}

export class Controller extends Canvas {
  // All buttons' icon is the same as touchbar
  // trashOrBackward, pauseAndStart, skipOrForward, rateAndUnrate
  constructor(devicePixelRatio) {
    super(ctrlBtnCount * ctrlBtnWidth, ctrlBtnWidth, devicePixelRatio)
    this.ctx.textBaseline = 'middle'
    this.pattern = ctrlPattern.playlist
    this.images = [
      `${resourcesFolder}trash.png`,
      `${resourcesFolder}pause.png`,
      `${resourcesFolder}forward.png`,
      `${resourcesFolder}unrate.png`
    ]

    this.pauseAndStart = this.pauseAndStart.bind(this)
    this.rateAndUnrate = this.rateAndUnrate.bind(this)
    this.toPlaylistPattern = this.toPlaylistPattern.bind(this)
    this.toSonglistPattern = this.toSonglistPattern.bind(this)
    this.initRendererListener()
  }

  initRendererListener() {
    ipcRenderer.on('trayPause', (_, playing) => {
      this.pauseAndStart(playing)
    })
    ipcRenderer.on('trayResetPause', () => {
      this.pauseAndStart(true)
    })
    ipcRenderer.on('trayRateColor', (_, love) => {
      this.rateAndUnrate(love)
    })
    ipcRenderer.on('trayToPlaylist', this.toPlaylistPattern)
    ipcRenderer.on('trayToSonglist', this.toSonglistPattern)
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    return Promise.all(this.images.map((item, idx) => this.drawImageBtn(idx, item)))
  }

  drawImageBtn(index, image) {
    return new Promise(resolve => {
      const img = new Image()
      img.onload = () => {
        this.ctx.drawImage(img, ctrlBtnWidth * index * this.devicePixelRatio, this.canvas.height / 2 - img.height / 2)
        resolve()
      }
      img.src = image
    })
  }

  pauseAndStart(playing) {
    if (playing) {
      this.images[1] = `${resourcesFolder}pause.png`
    } else {
      this.images[1] = `${resourcesFolder}play.png`
    }

    freshTray()
  }

  rateAndUnrate(love) {
    if (love === 'red') {
      this.images[3] = `${resourcesFolder}rate.png`
    }

    if (love === 'white') {
      this.images[3] = `${resourcesFolder}unrate.png`
    }

    freshTray()
  }

  toPlaylistPattern() {
    this.pattern = ctrlPattern.playlist
    this.images[0] = `${resourcesFolder}trash.png`
    this.images[2] = `${resourcesFolder}skip.png`

    freshTray()
  }

  toSonglistPattern() {
    this.pattern = ctrlPattern.songlist
    this.images[0] = `${resourcesFolder}backward.png`
    this.images[2] = `${resourcesFolder}forward.png`

    freshTray()
  }
}

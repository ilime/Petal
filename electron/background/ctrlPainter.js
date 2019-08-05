import { ipcRenderer, remote } from 'electron'

import Canvas from './canvas'
import { freshTray } from './'

export const ctrlBtnWidth = 22
const ctrlBtnCount = 4
export const ctrlPattern = {
  songlist: 0,
  playlist: 1
}

function getModeAwareImage(suffix) {
  return `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : __dirname}/resources/osx/${
    remote.systemPreferences.isDarkMode() ? 'dark' : 'normal'
  }/${suffix}`
}

export class Controller extends Canvas {
  // All buttons' icon is the same as touchbar
  // trashOrBackward, pauseAndStart, skipOrForward, rateAndUnrate
  constructor(devicePixelRatio) {
    super(ctrlBtnCount * ctrlBtnWidth, ctrlBtnWidth, devicePixelRatio)
    this.ctx.textBaseline = 'middle'
    this.pattern = ctrlPattern.playlist
    this.images = ['trash.png', 'pause.png', 'skip.png', 'unrate.png']

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
    return Promise.all(this.images.map((item, idx) => this.drawImageBtn(idx, getModeAwareImage(item))))
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
      this.images[1] = 'pause.png'
    } else {
      this.images[1] = 'play.png'
    }

    freshTray()
  }

  rateAndUnrate(love) {
    if (love === 'red') {
      this.images[3] = 'rate.png'
    }

    if (love === 'white') {
      this.images[3] = 'unrate.png'
    }

    freshTray()
  }

  toPlaylistPattern() {
    this.pattern = ctrlPattern.playlist
    this.images[0] = 'trash.png'
    this.images[2] = 'skip.png'

    freshTray()
  }

  toSonglistPattern() {
    this.pattern = ctrlPattern.songlist
    this.images[0] = 'backward.png'
    this.images[2] = 'forward.png'

    freshTray()
  }
}

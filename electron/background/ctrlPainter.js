import { ipcRenderer } from 'electron'

import Canvas from './canvas'

export const ctrlBtnWidth = 22
const ctrlBtnCount = 5
export const ctrlPattern = {
  songlist: 0,
  playlist: 1,
}

function getModeAwareImage(suffix, isDarkMode) {
  return `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : __dirname}/resources/osx/${
    isDarkMode ? 'dark' : 'normal'
  }/${suffix}`
}

export class Controller extends Canvas {
  // All buttons' icon is the same as touchbar
  // trashOrBackward, pauseAndStart, skipOrForward, rateAndUnrate
  constructor(devicePixelRatio, isDarkMode) {
    super(ctrlBtnCount * ctrlBtnWidth, ctrlBtnWidth, devicePixelRatio)
    this.isDarkMode = isDarkMode
    this.ctx.textBaseline = 'middle'
    this.pattern = ctrlPattern.playlist
    this.images = ['trash.png', 'pause.png', 'skip.png', 'unrate.png', 'logo.png']

    this.pauseAndStart = this.pauseAndStart.bind(this)
    this.rateAndUnrate = this.rateAndUnrate.bind(this)
    this.toPlaylistPattern = this.toPlaylistPattern.bind(this)
    this.toSonglistPattern = this.toSonglistPattern.bind(this)
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    return Promise.all(this.images.map((item, i) => this.drawImageBtn(i, getModeAwareImage(item, this.isDarkMode))))
  }

  drawImageBtn(index, image) {
    return new Promise((resolve) => {
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
  }

  rateAndUnrate(love) {
    if (love === 'red') {
      this.images[3] = 'rate.png'
    }
    if (love === 'white') {
      this.images[3] = 'unrate.png'
    }
  }

  toPlaylistPattern() {
    this.pattern = ctrlPattern.playlist
    this.images[0] = 'trash.png'
    this.images[2] = 'skip.png'
  }

  toSonglistPattern() {
    this.pattern = ctrlPattern.songlist
    this.images[0] = 'backward.png'
    this.images[2] = 'forward.png'
  }

  onClick(x, y) {
    switch (parseInt(x / ctrlBtnWidth)) {
      case 0:
        if (this.pattern === ctrlPattern.playlist) {
          ipcRenderer.send('trayCtrlTrash')
        }
        if (this.pattern === ctrlPattern.songlist) {
          ipcRenderer.send('trayCtrlBackward')
        }
        break
      case 1:
        ipcRenderer.send('trayCtrlPause')
        break
      case 2:
        if (this.pattern === ctrlPattern.playlist) {
          ipcRenderer.send('trayCtrlSkip')
        }
        if (this.pattern === ctrlPattern.songlist) {
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
  }
}

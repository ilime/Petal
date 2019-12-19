import { remote, ipcRenderer } from 'electron'
import Canvas from './canvas'
import { Controller } from './ctrlPainter'
import { Lyric } from './lyricPainter'

const devicePixelRatio = 2
const scrollFPS = 25

export class TrayPainter extends Canvas {
  constructor() {
    super(0, 0, devicePixelRatio)
    this.isCompactTheme = false
    // workaround to fix https://github.com/electron/electron/issues/20900
    this.isDarkMode = !remote.nativeTheme ? false : remote.nativeTheme.shouldUseDarkColors
    this.ctrlPainter = new Controller(devicePixelRatio, this.isDarkMode)
    this.lyricPainter = new Lyric(devicePixelRatio, scrollFPS, this.isDarkMode)
    this.lyricScrollTimer = null
    this.lyricClearTimer = null
    this.resize(this.ctrlPainter.width + this.lyricPainter.width, this.ctrlPainter.height)
    this.initCtrlRefreshListsner()
  }

  initCtrlRefreshListsner() {
    ipcRenderer.on('trayPause', (_, playing) => {
      this.ctrlPainter.pauseAndStart(playing)
      this.refresh()
    })
    ipcRenderer.on('trayResetPause', () => {
      this.ctrlPainter.pauseAndStart(true)
      this.refresh()
    })
    ipcRenderer.on('trayRateColor', (_, love) => {
      this.ctrlPainter.rateAndUnrate(love)
      this.refresh()
    })
    ipcRenderer.on('trayToPlaylist', () => {
      this.ctrlPainter.toPlaylistPattern()
      this.refresh()
    })
    ipcRenderer.on('trayToSonglist', () => {
      this.ctrlPainter.toSonglistPattern()
      this.refresh()
    })
  }

  refresh() {
    if (this.isCompactTheme) {
      this.ctrlPainter.draw().then(() => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.ctrlPainter.canvas, 0, 0)
        ipcRenderer.send('trayDraw', this.canvas.toDataURL(), this.width)
      })
    } else {
      Promise.all([
        this.lyricPainter.draw(),
        this.ctrlPainter.draw()
      ]).then(() => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.lyricPainter.canvas, 0, 0)
        this.ctx.drawImage(this.ctrlPainter.canvas, this.lyricPainter.canvas.width, 0)
        ipcRenderer.send('trayDraw', this.canvas.toDataURL(), this.width)
      })
    }
  }
  
  onThemeChange(val) {
    this.isCompactTheme = val
    if (this.isCompactTheme) {
      this.resize(this.ctrlPainter.width, this.ctrlPainter.height)
      clearTimeout(this.lyricClearTimer)
      clearInterval(this.lyricScrollTimer)
    } else {
      this.resize(this.ctrlPainter.width + this.lyricPainter.width, this.ctrlPainter.height)
    }
    this.refresh()
  }

  onClick(x, y) {
    if (this.isCompactTheme) {
      this.ctrlPainter.onClick(x, y)
    } else {
      this.ctrlPainter.onClick(x - this.lyricPainter.width, y)
    }
  }

  nextSong(song) {
    const { title, artist, length } = song
    let cycleText = `${title} - ${artist}`
    // 30 second per cycle
    for (let i = 0, n = parseInt(length / 30); i < n; i++) 
      cycleText = cycleText.concat(`        ${title} - ${artist}`)
    this.lyricPainter.setText(cycleText, length * 1000)
    if (!this.isCompactTheme) {
      this.refreshLyricInterval(cycleText, length * 1000)
      return
    }
  }

  nextLyric(lyricText, duration) {
    this.lyricPainter.setText(lyricText, duration)
    if (!this.isCompactTheme) {
      this.refreshLyricInterval(lyricText, parseInt(duration * 1000 * 0.9))
      return
    }
  }

  refreshLyricInterval(text, duration) {
    clearTimeout(this.lyricClearTimer)
    clearInterval(this.lyricScrollTimer)

    this.lyricScrollTimer = setInterval(() => {
      this.lyricPainter.scrollTick()
      this.refresh()
    }, 1000 / scrollFPS)

    this.lyricClearTimer = setTimeout(() => {
      clearInterval(this.lyricScrollTimer)
    }, duration)
  }
}

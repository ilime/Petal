import Canvas from './canvas'
import { remote } from 'electron'

export const lyricWidth = 150
const lyricHeight = 22
const fontSize = 14
const minWaitTime = 3000
const scrollFPS = 25
const lyricTextPadding = 8

export class Lyric extends Canvas {
  constructor(devicePixelRatio, freshCb) {
    super(lyricWidth, lyricHeight, devicePixelRatio)
    this.ctx.font = `${fontSize * this.devicePixelRatio}px "Font Awesome 5 Free", sans-serif`
    this.ctx.textBaseline = 'middle'
    this.textYOffset = this.canvas.height / 2
    this.lyricScrollTimer = null
    this.lyricClearTimer = null
    this.lyricWaitTimer = null
    this.freshCb = freshCb
  }

  draw(text, xOffset) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.fillStyle = remote.systemPreferences.isDarkMode() ? 'white' : 'black'
    this.ctx.fillText(text, xOffset, this.textYOffset)
    this.freshCb()
  }

  // duration: millisenond
  nextLyric(text, duration) {
    clearTimeout(this.lyricWaitTimer)
    clearTimeout(this.lyricClearTimer)
    clearInterval(this.lyricScrollTimer)

    const fullWidth = this.ctx.measureText(text).width
    if (fullWidth <= this.canvas.width) {
      this.draw(text, (this.canvas.width - fullWidth) / 2)
      return
    }
    const waitTime = Math.min((this.canvas.width * duration) / fullWidth, minWaitTime)
    let xOffset = lyricTextPadding
    this.draw(text, xOffset)

    this.lyricWaitTimer = setTimeout(() => {
      const overflowWidth = fullWidth - this.canvas.width + 2 * lyricTextPadding,
        scrollFrame = ((duration - waitTime) * scrollFPS) / 1000,
        scrollDisPerFrame = overflowWidth / scrollFrame
      this.lyricScrollTimer = setInterval(() => {
        xOffset -= scrollDisPerFrame
        this.draw(text, xOffset)
        return
      }, 1000 / scrollFPS)
    }, waitTime)

    this.lyricClearTimer = setTimeout(() => {
      clearInterval(this.lyricScrollTimer)
    }, duration)
  }
}

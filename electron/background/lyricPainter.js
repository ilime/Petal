import Canvas from './canvas'

export const lyricWidth = 150
const lyricHeight = 22
const fontSize = 14
const minWaitTime = 3000
const lyricTextPadding = 16

export class Lyric extends Canvas {
  constructor(devicePixelRatio, scrollFPS, isDarkMode) {
    super(lyricWidth, lyricHeight, devicePixelRatio)
    this.scrollFPS = scrollFPS
    this.isDarkMode = isDarkMode
    this.text = ''
    this.textXOffset = 0
    this.textYOffset = this.canvas.height / 2
    this.scrollDisPerFrame = 0
    this.ctx.font = `${fontSize * this.devicePixelRatio}px "Font Awesome 5 Free", sans-serif`
    this.ctx.textBaseline = 'middle'
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.fillStyle = this.isDarkMode ? 'white' : 'black'
    this.ctx.fillText(this.text, this.textXOffset, this.textYOffset)
  }

  setText(text, duration) {
    this.text = text
    const fullWidth = this.ctx.measureText(text).width
    if (fullWidth <= this.canvas.width) {
      this.textXOffset = (this.canvas.width - fullWidth) / 2
    } else {
      this.textXOffset = lyricTextPadding
    }
    const waitInterval = Math.min((this.canvas.width * duration) / fullWidth, minWaitTime)
    const scrollFrame = ((duration - waitInterval) * this.scrollFPS) / 1000
    this.scrollDisPerFrame = (fullWidth - this.canvas.width) / scrollFrame
  }

  scrollTick() {
    this.textXOffset -= this.scrollDisPerFrame
  }
}

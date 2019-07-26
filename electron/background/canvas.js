export default class Canvas {
  // anti-alias in high DPI screen
  // http://objcer.com/2017/10/10/High-DPI-Canvas-Render/
  constructor(width, height, devicePixelRatio) {
    this.width = width
    this.height = height
    this.devicePixelRatio = devicePixelRatio
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.width * this.devicePixelRatio
    this.canvas.height = this.height * this.devicePixelRatio
    this.ctx = this.canvas.getContext('2d')
  }
}
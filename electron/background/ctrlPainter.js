import Canvas from './canvas'

export const ctrlBtnWidth = 22, ctrlBtnCount = 4
const resourcesFolder = (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : __dirname) + '/resources/'
export const ctrlPattern = {
  songlist: 0, 
  playlist: 1
}

export class Controller extends Canvas {
  // button's icon is the same as touchbar
  // trashOrBackward, pauseAndStart, skipOrForward, rateAndUnrate
  constructor() {
    super(ctrlBtnCount * ctrlBtnWidth, ctrlBtnWidth, 2)
    this.ctx.textBaseline = 'middle'
    this.pattern = ctrlPattern.playlist
    this.images = [
      `${resourcesFolder}trash.png`,
      `${resourcesFolder}pause.png`,
      `${resourcesFolder}forward.png`,
      `${resourcesFolder}unrate.png`
    ]
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    return Promise.all(
      this.images.map((item, idx) => this.drawImageBtn(idx, item))
    )
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

  pauseAndStart(isPause) {
    if (isPause) {
      this.images[1] = `${resourcesFolder}pause.png`
    } else {
      this.images[1] = `${resourcesFolder}play.png`
    }
  }

  toPlaylistPattern() {
    this.pattern = ctrlPattern.playlist
    this.images[0] = `${resourcesFolder}trash.png`
    this.images[2] = `${resourcesFolder}skip.png`
  }

  toSonglistPattern() {
    this.pattern = ctrlPattern.songlist
    this.images[0] = `${resourcesFolder}backward.png`
    this.images[2] = `${resourcesFolder}forward.png`
  }

  rateAndUnrate(like) {
    if (like) {
      this.images[3] = `${resourcesFolder}rate.png`
    } else {
      this.images[3] = `${resourcesFolder}unrate.png`
    }
  }
}

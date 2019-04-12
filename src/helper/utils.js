import http from 'http'
import fs from 'fs'
const { remote } = window.require('electron')

const UserMusicPath = remote.app.getPath('music')

function fileDownload(url, writePath, name, callback) {
  const file = fs.createWriteStream(`${writePath}/${name}`)
  http.get(url, response => {
    response.pipe(file)
  })

  if (typeof callback === 'function') {
    callback()
  }
}

function removeFile(path) {
  fs.unlink(path, err => {
    if (err) throw err
    console.log(path, ' was deleted.')
  })
}

export { UserMusicPath, fileDownload, removeFile }

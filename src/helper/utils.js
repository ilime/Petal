import http from 'http'
import fs from 'fs'
import { remote } from 'electron'

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

export { UserMusicPath, fileDownload }

import Player from 'mpris-service'
import { isLinux } from './platform'
import { mainWindow } from './win'

class Mpris {
  constructor() {
    if (!isLinux) {
      return null
    }

    try {
      this.player = Player({
        name: 'Petal',
        identity: 'douban.FM player',
        supportedUriSchemes: ['file'],
        supportedMimeTypes: ['audio/mpeg', 'application/ogg'],
        supportedInterfaces: ['player'],
      })

      this.player.getPosition = () => 0 // TODO
      this.player.on('raise', () => mainWindow.show())
      this.player.on('quit', () => process.exit())
      this.player.on('playpause', () => mainWindow.webContents.send('pause'))
      this.player.on('play', () => mainWindow.webContents.send('pause'))
      this.player.on('pause', () => mainWindow.webContents.send('pause'))
      this.player.on('next', () => {
        mainWindow.webContents.send('skip')
        mainWindow.webContents.send('forward')
      })
      this.player.on('previous', () => mainWindow.webContents.send('backward'))
    } catch {
      // If mpris failed to initialize, provide an empty interface
      this.player = {}
      this.player.objectPath = () => {}
    }
  }

  setPlaying(song) {
    this.setMetadata(song)
    this.setPlayingStatus(true)
  }

  setMetadata(song) {
    this.player.metadata = {
      'mpris:trackid': this.player.objectPath('track/0'),
      'mpris:length': 60 * 1000 * 1000, // TODO
      'mpris:artUrl': song.picture,
      'xesam:title': song.title,
      'xesam:album': song.albumtitle,
      'xesam:artist': [song.artist],
    }
  }

  setPlayingStatus(playing) {
    this.player.playbackStatus = playing ? 'Playing' : 'Paused'
  }

  togglePlayingStatus() {
    this.player.playbackStatus = this.player.playbackStatus === 'Playing' ? 'Paused' : 'Playing'
  }
}

export const mpris = new Mpris()

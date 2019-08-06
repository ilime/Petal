import Player from 'mpris-service'
import { isLinux } from './platform'
import { mainWindow } from './win'

class Mpris {
  constructor() {
    if (!isLinux) {
      return null
    }

    this.player = Player({
      name: 'Petal',
      identity: 'douban.FM player',
      supportedUriSchemes: ['file'],
      supportedMimeTypes: ['audio/mpeg', 'application/ogg'],
      supportedInterfaces: ['player']
    })
    this.player.getPosition = () => {
      // TODO:
      return 0
    }
    this.player.on('raise', () => mainWindow.show())
    this.player.on('quit', () => process.exit())
    this.player.on('playpause', () => {
      // console.log('MPRIS playpasue')
      mainWindow.webContents.send('pause')
      // this.togglePlayingStatus();
    })
    this.player.on('play', () => {
      // console.log('MPRIS play')
      mainWindow.webContents.send('pause')
      // this.setPlayingStatus(true);
    })
    this.player.on('pause', () => {
      // console.log('MPRIS pause')
      mainWindow.webContents.send('pause')
      // this.setPlayingStatus(false);
    })
    this.player.on('next', () => {
      // console.log('MPRIS next')
      mainWindow.webContents.send('forward')
      mainWindow.webContents.send('skip')
    })
    this.player.on('previous', () => {
      // console.log('MPRIS previous')
      mainWindow.webContents.send('backward')
    })
  }
  setPlaying(song) {
    this.setMetadata(song)
    this.setPlayingStatus(true)
  }
  setMetadata(song) {
    this.player.metadata = {
      'mpris:trackid': this.player.objectPath('track/0'),
      'mpris:length': 60 * 1000 * 1000, // In microseconds TODO:
      'mpris:artUrl': song.picture,
      'xesam:title': song.title,
      'xesam:album': song.albumtitle,
      'xesam:artist': [song.artist]
    }
    // console.log(`MPRIS Metadata: ${song.title} - ${song.artist} - ${song.albumtitle}`)
  }
  setPlayingStatus(playing) {
    this.player.playbackStatus = playing ? 'Playing' : 'Paused'
    // console.log('MPRIS PlayStatus: ' + this.player.playbackStatus)
  }
  togglePlayingStatus() {
    this.player.playbackStatus = this.player.playbackStatus === 'Playing' ? 'Paused' : 'Playing'
    // console.log('MPRIS PlayStatus: ' + this.player.playbackStatus)
  }
}

export const mpris = new Mpris()

// Events
/*
var events = ['raise', 'quit', 'next', 'previous', 'pause', 'playpause', 'stop', 'play', 'seek', 'position', 'open', 'volume', 'loopStatus', 'shuffle'];
events.forEach(function (eventName) {
	player.on(eventName, function () {
		console.log('Event:', eventName, arguments);
	});
});
*/

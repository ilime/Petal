var Player = require('mpris-service');
var player = Player({
	name: 'Petal',
	identity: 'douban.FM player',
	supportedUriSchemes: ['file'],
	supportedMimeTypes: ['audio/mpeg', 'application/ogg'],
	supportedInterfaces: ['player']
});

player.getPosition = function() {
  // return the position of your player
  return 0;
}

// Events
var events = ['raise', 'quit', 'next', 'previous', 'pause', 'playpause', 'stop', 'play', 'seek', 'position', 'open', 'volume', 'loopStatus', 'shuffle'];
events.forEach(function (eventName) {
	player.on(eventName, function () {
		console.log('Event:', eventName, arguments);
	});
});

player.on('quit', function () {
	process.exit();
});

export function setMprisMetadata(song) {
	console.warn('mpris invoked');
    player.metadata = {
		'mpris:trackid': player.objectPath('track/0'),
		'mpris:length': 60 * 1000 * 1000, // In microseconds
		'mpris:artUrl': song.picture,
		'xesam:title': song.title,
		'xesam:album': song.album,
		'xesam:artist': [song.artist]
    }
    player.playbackStatus = Player.PLAYBACK_STATUS_PLAYING;
    console.log(`Now playing: ${song.title} - ${song.artist} - ${song.album}`);
}
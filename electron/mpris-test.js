var Player = require('mpris-service');

var player = Player({
	name: 'nodejs',
	identity: 'Node.js media player',
	supportedUriSchemes: ['file'],
	supportedMimeTypes: ['audio/mpeg', 'application/ogg'],
	supportedInterfaces: ['player']
});

player.on('quit', function () {
	process.exit();
});
export function setMprisState({title, album, artist}) {
    player.metadata = {
		'mpris:trackid': player.objectPath('track/0'),
		'mpris:length': 60 * 1000 * 1000, // In microseconds
		'mpris:artUrl': 'http://www.adele.tv/images/facebook/adele.jpg',
		'xesam:title': title,
		'xesam:album': album,
		'xesam:artist': artist
    }
    player.playbackStatus = Player.PLAYBACK_STATUS_PLAYING;
    console.log(`Now playing: ${title} - ${artist} - ${album}`);
}

setTimeout( ()=> {
    const state = {
        title:'Love Story',
        album:'Secret',
        artist:['Taylor Swift']
    };
    setMprisState(state);
},1000);

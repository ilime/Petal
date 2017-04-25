'use strict'

export const PLAYLIST_LOADING = 'PLAYLIST_LOADING'
export const PLAYLIST_NEW_REQUEST = 'PLAYLIST_NEW_REQUEST'
export const PLAYLIST_PLAYING_REQUEST = 'PLAYLIST_PLAYING_REQUEST'
export const PLAYLIST_SKIP_REQUEST = 'PLAYLIST_SKIP_REQUEST'
export const PLAYLIST_TRASH_REQUEST = 'PLAYLIST_TRASH_REQUEST'
export const PLAYLIST_RESPONSE = 'PLAYLIST_RESPONSE'
export const SONG_LYRIC_RESPONSE = 'SONG_LYRIC'
export const PLAYLIST_NEXT_SONG = 'PLAYLIST_NEXT_SONG'
export const RED_HEART_LIST = 'RED_HEART_LIST'
export const RED_HEART_RATE = 'RED_HEART_RATE'
export const RED_HEART_UNRATE = 'RED_HEART_UNRATE'
export const RED_HEART_RATE_NEXT_SONG_APPEND = 'RED_HEART_RATE_NEXT_SONG_APPEND'
export const RED_HEART_UN_RATE_NEXT_SONG_APPEND = 'RED_HEART_UN_RATE_NEXT_SONG_APPEND'
export const PLAYLIST_END_REQUEST = 'PLAYLIST_END_REQUEST'
export const RED_HEART_EMPTY = 'RED_HEART_EMPTY'

export const playlistLoading = () => {
  return {
    type: PLAYLIST_LOADING
  }
}

export const playlistNewRequest = () => {
  return {
    type: PLAYLIST_NEW_REQUEST
  }
}

export const playlistPlayingRequest = () => {
  return {
    type: PLAYLIST_PLAYING_REQUEST
  }
}

export const playlistSkipRequest = () => {
  return {
    type: PLAYLIST_SKIP_REQUEST
  }
}

export const playlistTrashRequest = () => {
  return {
    type: PLAYLIST_TRASH_REQUEST
  }
}

export const playlistResponse = (playlist, sid, ssid, song) => {
  return {
    type: PLAYLIST_RESPONSE,
    playlist,
    sid,
    ssid,
    song
  }
}

export const songLyricResponse = (lyric) => {
  return {
    type: SONG_LYRIC_RESPONSE,
    lyric
  }
}

export const playlistNextSong = () => {
  return {
    type: PLAYLIST_NEXT_SONG
  }
}

export const redHeartList = redheart => {
  return {
    type: RED_HEART_LIST,
    redheart
  }
}

export const redHeartRate = () => {
  return {
    type: RED_HEART_RATE
  }
}

export const redHeartUnRate = () => {
  return {
    type: RED_HEART_UNRATE
  }
}

export const redHeartRateNextSongAppend = song => {
  return {
    type: RED_HEART_RATE_NEXT_SONG_APPEND,
    song
  } 
}

export const redHeartUnRateNextSongAppend = song => {
  return {
    type: RED_HEART_UN_RATE_NEXT_SONG_APPEND,
    song
  } 
}

export const playlistEndRequest = () => {
  return {
    type: PLAYLIST_END_REQUEST
  }
}

export const redHeartEmpty = () => {
  return {
    type: RED_HEART_EMPTY
  }
}
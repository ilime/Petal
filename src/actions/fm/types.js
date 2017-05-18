'use strict'

export const PLAYLIST_LOADING = 'PLAYLIST_LOADING'
export const PLAYLIST_NEW_REQUEST = 'PLAYLIST_NEW_REQUEST'
export const PLAYLIST_PLAYING_REQUEST = 'PLAYLIST_PLAYING_REQUEST'
export const PLAYLIST_SKIP_REQUEST = 'PLAYLIST_SKIP_REQUEST'
export const PLAYLIST_TRASH_REQUEST = 'PLAYLIST_TRASH_REQUEST'
export const PLAYLIST_RESPONSE = 'PLAYLIST_RESPONSE'
export const SONG_LYRIC_RESPONSE = 'SONG_LYRIC_RESPONSE'
export const PLAYLIST_NEXT_SONG = 'PLAYLIST_NEXT_SONG'
export const RED_HEART_RATE = 'RED_HEART_RATE'
export const RED_HEART_UNRATE = 'RED_HEART_UNRATE'
export const RED_HEART_RATE_NEXT_SONG_APPEND = 'RED_HEART_RATE_NEXT_SONG_APPEND'
export const RED_HEART_UN_RATE_NEXT_SONG_APPEND = 'RED_HEART_UN_RATE_NEXT_SONG_APPEND'
export const PLAYLIST_END_REQUEST = 'PLAYLIST_END_REQUEST'
export const RECENT_LIST = 'RECENT_LIST'
export const RECENT_EMPTY = 'RECENT_EMPTY'
export const RED_HEART_LIST = 'RED_HEART_LIST'
export const RED_HEART_EMPTY = 'RED_HEART_EMPTY'
export const TRASH_LIST = 'TRASH_LIST'
export const TRASH_EMPTY = 'TRASH_EMPTY'
export const SELECT_PATTERN = 'SELECT_PATTERN'
export const RECENT_PATTERN = 'RECENT_PATTERN'
export const REDHEART_PATTERN = 'REDHEART_PATTERN'
export const FSID_SET = 'FSID_SET'
export const RECENT_GO = 'RECENT_GO'
export const RECENT_BACK = 'RECENT_BACK'
export const RECENT_INDEX_SET = 'RECENT_INDEX_SET'
export const REDHEART_GO = 'REDHEART_GO'
export const REDHEART_BACK = 'REDHEART_BACK'
export const REDHEART_INDEX_SET = 'REDHEART_INDEX_SET'

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

export const songLyricResponse = lyric => {
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

export const recentList = recent => {
  return {
    type: RECENT_LIST,
    recent
  }
}

export const recentEmpty = () => {
  return {
    type: RECENT_EMPTY
  }
}

export const redHeartList = redheart => {
  return {
    type: RED_HEART_LIST,
    redheart
  }
}

export const redHeartEmpty = () => {
  return {
    type: RED_HEART_EMPTY
  }
}

export const trashList = trash => {
  return {
    type: TRASH_LIST,
    trash
  }
}

export const trashEmpty = () => {
  return {
    type: TRASH_EMPTY
  }
}

export const selectPattern = { type: SELECT_PATTERN }

export const recentPattern = { type: RECENT_PATTERN }

export const redheartPattern = { type: REDHEART_PATTERN }

export const fsidSet = fsid => {
  return {
    type: FSID_SET,
    fsid
  }
}

export const recentGo = { type: RECENT_GO }

export const recentBack = { type: RECENT_BACK }

export const recentIndexSet = recentIndex => {
  return {
    type: RECENT_INDEX_SET,
    recentIndex
  }
}

export const redheartGo = { type: REDHEART_GO }

export const redheartBack = { type: REDHEART_BACK }

export const redheartIndexSet = redheartIndex => {
  return {
    type: REDHEART_INDEX_SET,
    redheartIndex
  }
}
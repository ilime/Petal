'use strict'

export const PLAYLIST_NEW_REQUEST = 'PLAYLIST_NEW_REQUEST'
export const PLAYLIST_RESPONSE = 'PLAYLIST_RESPONSE'
export const SONG_LYRIC_RESPONSE = 'SONG_LYRIC'

export const playlistNewRequest = () => {
  return {
    type: PLAYLIST_NEW_REQUEST,
    plType: 'n'
  }
}

export const playlistResponse = (playlist, sid, ssid) => {
  return {
    type: PLAYLIST_RESPONSE,
    playlist,
    sid,
    ssid
  }
}

export const songLyricResponse = (lyric) => {
  return {
    type: SONG_LYRIC_RESPONSE,
    lyric
  }
}
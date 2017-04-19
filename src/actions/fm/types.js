'use strict'

export const PLAYLIST_LOADING = 'PLAYLIST_LOADING'
export const PLAYLIST_NEW_REQUEST = 'PLAYLIST_NEW_REQUEST'
export const PLAYLIST_PLAYING_REQUEST = 'PLAYLIST_PLAYING_REQUEST'
export const PLAYLIST_RESPONSE = 'PLAYLIST_RESPONSE'
export const SONG_LYRIC_RESPONSE = 'SONG_LYRIC'
export const PLAYLIST_NEXT_SONG = 'PLAYLIST_NEXT_SONG'

export const playlistLoading = () => {
  return {
    type: PLAYLIST_LOADING
  }
}

export const playlistNewRequest = () => {
  return {
    type: PLAYLIST_NEW_REQUEST,
  }
}

export const playlistPlayingRequest = () => {
  return {
    type: PLAYLIST_PLAYING_REQUEST,
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
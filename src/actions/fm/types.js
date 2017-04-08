'use strict'

export const PLAYLIST_NEW_REQUEST = 'PLAYLIST_NEW_REQUEST'
export const PLAYLIST_RESPONSE = 'PLAYLIST_RESPONSE'

export const playlistNewRequest = () => {
  return {
    type: PLAYLIST_NEW_REQUEST,
    plType: 'n'
  }
}

export const playlistResponse = (playlist) => {
  return {
    type: PLAYLIST_RESPONSE,
    playlist
  }
}
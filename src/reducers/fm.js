'use strict'

import {
  PLAYLIST_NEW_REQUEST, PLAYLIST_RESPONSE,
  SONG_LYRIC_RESPONSE
} from '../actions/fm/types'

const fmReducer = (state = {
  playlist: {},
  type: '',
  sid: '',
  ssid: '',
  lyric: {}
}, action) => {
  switch (action.type) {
    case PLAYLIST_NEW_REQUEST:
      return Object.assign({}, state, {
        type: 'n'
      })
    case PLAYLIST_RESPONSE:
      return Object.assign({}, state, {
        playlist: action.playlist,
        sid: action.sid,
        ssid: action.ssid
      })
    case SONG_LYRIC_RESPONSE:
      return Object.assign({}, state, {
        lyric: action.lyric
      })
    default:
      return state
  }
}

export default fmReducer


'use strict'

import {
  PLAYLIST_LOADING, PLAYLIST_NEW_REQUEST,
  PLAYLIST_RESPONSE, SONG_LYRIC_RESPONSE,
  PLAYLIST_NEXT_SONG
} from '../actions/fm/types'

const fmReducer = (state = {
  isFetching: false,
  playlist: {},
  type: '',
  sid: '',
  ssid: '',
  song: [],
  lyric: {}
}, action) => {
  switch (action.type) {
    case PLAYLIST_LOADING:
      return Object.assign({}, state, {
        isFetching: true
      })
    case PLAYLIST_NEW_REQUEST:
      return Object.assign({}, state, {
        type: 'n'
      })
    case PLAYLIST_RESPONSE:
      return Object.assign({}, state, {
        playlist: action.playlist,
        sid: action.sid,
        ssid: action.ssid,
        song: action.song
      })
    case SONG_LYRIC_RESPONSE:
      return Object.assign({}, state, {
        isFetching: false,
        lyric: action.lyric
      })
    case PLAYLIST_NEXT_SONG:
      return Object.assign({}, state, {
        sid: state.song[1].sid,
        ssid: state.song[1].ssid,
        song: state.song.slice(1)
      })
    default:
      return state
  }
}

export default fmReducer

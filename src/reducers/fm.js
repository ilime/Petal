'use strict'

import {
  PLAYLIST_LOADING, PLAYLIST_NEW_REQUEST,
  PLAYLIST_RESPONSE, SONG_LYRIC_RESPONSE,
  PLAYLIST_NEXT_SONG, PLAYLIST_PLAYING_REQUEST,
  PLAYLIST_SKIP_REQUEST, PLAYLIST_TRASH_REQUEST,
  RED_HEART_RATE, RED_HEART_UNRATE,
  RED_HEART_RATE_NEXT_SONG_APPEND, RED_HEART_UN_RATE_NEXT_SONG_APPEND,
  PLAYLIST_END_REQUEST, RECENT_LIST,
  RECENT_EMPTY, RED_HEART_LIST,
  RED_HEART_EMPTY, TRASH_LIST,
  TRASH_EMPTY, SELECT_PATTERN,
  RECENT_PATTERN, REDHEART_PATTERH,
  FSID_SET, RECENT_GO,
  RECENT_BACK, REDHEART_GO,
  REDHEART_BACK, RECENT_INDEX_SET,
  REDHEART_INDEX_SET
} from '../actions/fm/types'

const fmReducer = (state = {
  isFetching: false,
  pattern: 'select',
  recentIndex: -1,
  redheartIndex: -1,
  playlist: {},
  type: '',
  sid: '',
  ssid: '',
  fsid: '',
  song: [],
  lyric: {},
  recent: {},
  redheart: [],
  trash: {}
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
    case PLAYLIST_PLAYING_REQUEST:
      return Object.assign({}, state, {
        type: 'p'
      })
    case PLAYLIST_SKIP_REQUEST:
      return Object.assign({}, state, {
        type: 's'
      })
    case PLAYLIST_TRASH_REQUEST:
      return Object.assign({}, state, {
        type: 'b'
      })
    case RED_HEART_RATE:
      return Object.assign({}, state, {
        type: 'r'
      })
    case RED_HEART_UNRATE:
      return Object.assign({}, state, {
        type: 'u'
      })
    case PLAYLIST_RESPONSE:
      return Object.assign({}, state, {
        isFetching: false,
        playlist: action.playlist,
        sid: action.sid,
        ssid: action.ssid,
        song: action.song
      })
    case SONG_LYRIC_RESPONSE:
      return Object.assign({}, state, {
        lyric: action.lyric
      })
    case PLAYLIST_NEXT_SONG:
      return Object.assign({}, state, {
        type: 'continue',
        sid: state.song[1].sid,
        ssid: state.song[1].ssid,
        song: state.song.slice(1)
      })
    case RED_HEART_RATE_NEXT_SONG_APPEND:
      return Object.assign({}, state, {
        song: state.song.concat(action.song)
      })
    case RED_HEART_UN_RATE_NEXT_SONG_APPEND:
      return Object.assign({}, state, {
        song: state.song.slice(0, -1).concat(action.song)
      })
    case PLAYLIST_END_REQUEST:
      return Object.assign({}, state, {
        type: 'e'
      })
    case RECENT_LIST:
      return Object.assign({}, state, {
        recent: action.recent
      })
    case RECENT_EMPTY:
      return Object.assign({}, state, {
        recent: {}
      })
    case RED_HEART_LIST:
      return Object.assign({}, state, {
        redheart: action.redheart
      })
    case RED_HEART_EMPTY:
      return Object.assign({}, state, {
        redheart: {}
      })
    case TRASH_LIST:
      return Object.assign({}, state, {
        trash: action.trash
      })
    case TRASH_EMPTY:
      return Object.assign({}, state, {
        trash: {}
      })
    case SELECT_PATTERN:
      return Object.assign({}, state, {
        pattern: 'select'
      })
    case RECENT_PATTERN:
      return Object.assign({}, state, {
        pattern: 'recent',
        recentIndex: 0
      })
    case REDHEART_PATTERH:
      return Object.assign({}, state, {
        pattern: 'redheart',
        redheartIndex: 0
      })
    case FSID_SET:
      return Object.assign({}, state, {
        fsid: action.fsid
      })
    case RECENT_GO:
      return Object.assign({}, state, {
        recentIndex: state.recentIndex + 1
      })
    case RECENT_BACK:
      return Object.assign({}, state, {
        recentIndex: state.recentIndex - 1
      })
    case REDHEART_GO:
      return Object.assign({}, state, {
        redheartIndex: state.redheartIndex + 1
      })
    case REDHEART_BACK:
      return Object.assign({}, state, {
        redheartIndex: state.redheartIndex - 1
      })
    case RECENT_INDEX_SET:
      return Object.assign({}, state, {
        recentIndex: action.recentIndex
      })
    case REDHEART_INDEX_SET:
      return Object.assign({}, state, {
        redheartIndex: action.redheartIndex
      })
    default:
      return state
  }
}

export default fmReducer

import cond, {
  shallowCopy
} from 'redux-cond'
import {
  PLAYLIST_LOADING,
  PLAYLIST_NEW_REQUEST,
  PLAYLIST_RESPONSE,
  SONG_LYRIC_RESPONSE,
  PLAYLIST_NEXT_SONG,
  PLAYLIST_PLAYING_REQUEST,
  PLAYLIST_SKIP_REQUEST,
  PLAYLIST_TRASH_REQUEST,
  RED_HEART_RATE,
  RED_HEART_UNRATE,
  RED_HEART_RATE_NEXT_SONG_APPEND,
  RED_HEART_UN_RATE_NEXT_SONG_APPEND,
  PLAYLIST_END_REQUEST,
  RECENT_LIST,
  RECENT_EMPTY,
  RED_HEART_LIST,
  RED_HEART_EMPTY,
  TRASH_LIST,
  TRASH_REMOVE,
  TRASH_EMPTY,
  SELECT_PATTERN,
  RECENT_PATTERN,
  REDHEART_PATTERN,
  FSID_SET,
  RECENT_GO,
  RECENT_BACK,
  REDHEART_GO,
  REDHEART_BACK,
  RECENT_INDEX_SET,
  REDHEART_INDEX_SET
} from '../actions/fm/types'

const fmReducer = (state = {
  isFetching: false, // playlist loading, true is loading
  pattern: 'select',
  recentIndex: -1, // recent songs current index, init -1
  redheartIndex: -1, // redheart songs current index, init -1
  playlist: {},
  type: '',
  sid: '', // playlist song sid
  ssid: '', // playlist song ssid
  fsid: '', // recent or redheart songs sid
  song: [], // playlis songs array
  lyric: {},
  recent: {}, // recent list
  redheart: [], // redheart list
  trash: {} // trash list
}, action) => {
  return cond(
    PLAYLIST_LOADING, state => shallowCopy(state, {
      isFetching: true
    }),
    PLAYLIST_NEW_REQUEST, state => shallowCopy(state, {
      type: 'n'
    }),
    PLAYLIST_PLAYING_REQUEST, state => shallowCopy(state, {
      type: 'p'
    }),
    PLAYLIST_SKIP_REQUEST, state => shallowCopy(state, {
      type: 's'
    }),
    PLAYLIST_TRASH_REQUEST, state => shallowCopy(state, {
      type: 'b'
    }),
    PLAYLIST_END_REQUEST, state => shallowCopy(state, {
      type: 'e'
    }),
    RED_HEART_RATE, state => shallowCopy(state, {
      type: 'r'
    }),
    RED_HEART_UNRATE, state => shallowCopy(state, {
      type: 'u'
    }),
    PLAYLIST_RESPONSE, (state, action) => shallowCopy(state, {
      isFetching: false,
      playlist: action.playlist,
      sid: action.sid,
      ssid: action.ssid,
      song: action.song
    }),
    SONG_LYRIC_RESPONSE, (state, action) => shallowCopy(state, {
      lyric: action.lyric
    }),
    PLAYLIST_NEXT_SONG, state => shallowCopy(state, {
      type: 'continue',
      sid: state.song[1].sid,
      ssid: state.song[1].ssid,
      song: state.song.slice(1)
    }),
    RED_HEART_RATE_NEXT_SONG_APPEND, (state, action) => shallowCopy(state, {
      song: state.song.concat(action.song)
    }),
    RED_HEART_UN_RATE_NEXT_SONG_APPEND, (state, action) => shallowCopy(state, {
      song: state.song.slice(0, -1).concat(action.song)
    }),
    RECENT_LIST, (state, action) => shallowCopy(state, {
      recent: action.recent
    }),
    RECENT_EMPTY, state => shallowCopy(state, {
      recent: {}
    }),
    RED_HEART_LIST, (state, action) => shallowCopy(state, {
      redheart: action.redheart
    }),
    RED_HEART_EMPTY, state => shallowCopy(state, {
      redheart: []
    }),
    TRASH_LIST, (state, action) => shallowCopy(state, {
      trash: action.trash
    }),
    TRASH_REMOVE, (state, action) => shallowCopy(state, {
      trash: {
        start: state.trash.start,
        total: state.trash.total - 1,
        songs: state.trash.songs.slice(0, action.index).concat(state.trash.songs.slice(action.index + 1))
      }
    }),
    TRASH_EMPTY, state => shallowCopy(state, {
      trash: {}
    }),
    SELECT_PATTERN, state => shallowCopy(state, {
      pattern: 'select'
    }),
    RECENT_PATTERN, state => shallowCopy(state, {
      pattern: 'recent',
      recentIndex: 0
    }),
    REDHEART_PATTERN, state => shallowCopy(state, {
      pattern: 'redheart',
      redheartIndex: 0
    }),
    FSID_SET, (state, action) => shallowCopy(state, {
      fsid: action.fsid
    }),
    RECENT_GO, state => shallowCopy(state, {
      recentIndex: state.recentIndex + 1
    }),
    RECENT_BACK, state => shallowCopy(state, {
      recentIndex: state.recentIndex - 1
    }),
    RECENT_INDEX_SET, (state, action) => shallowCopy(state, {
      pattern: 'recent',
      recentIndex: action.recentIndex
    }),
    REDHEART_GO, state => shallowCopy(state, {
      redheartIndex: state.redheartIndex + 1
    }),
    REDHEART_BACK, state => shallowCopy(state, {
      redheartIndex: state.redheartIndex - 1
    }),
    REDHEART_INDEX_SET, (state, action) => shallowCopy(state, {
      pattern: 'redheart',
      redheartIndex: action.redheartIndex
    })
  )(state, action)
}

export default fmReducer

import cond, { shallowCopy } from 'redux-cond'
import * as types from '../actions/fm/types'

const fmReducer = (
  state = {
    isFetching: false, // playlist loading, true is loading
    pattern: 'select',
    channelId: -10,
    channels: [],
    songListIndex: 0,
    type: '',
    sid: '', // playlist song sid
    ssid: '', // playlist song ssid
    song: {},
    lyric: {},
    lyricDisplay: false,
    recent: {}, // recent list
    redheart: [], // redheart list
    trash: {}, // trash list
    daily: {}, // daliy list
    sheet: [],
    playtime: '0.0'
  },
  action
) => {
  return cond(
    types.PLAYLIST_LOADING,
    state =>
      shallowCopy(state, {
        isFetching: true
      }),
    types.PLAYLIST_NEW_REQUEST,
    state =>
      shallowCopy(state, {
        type: 'n'
      }),
    types.PLAYLIST_PLAYING_REQUEST,
    state =>
      shallowCopy(state, {
        type: 'p'
      }),
    types.PLAYLIST_SKIP_REQUEST,
    state =>
      shallowCopy(state, {
        type: 's'
      }),
    types.PLAYLIST_TRASH_REQUEST,
    state =>
      shallowCopy(state, {
        type: 'b'
      }),
    types.PLAYLIST_END_REQUEST,
    state =>
      shallowCopy(state, {
        type: 'e'
      }),
    types.RED_HEART_RATE,
    state =>
      shallowCopy(state, {
        type: 'r'
      }),
    types.RED_HEART_UNRATE,
    state =>
      shallowCopy(state, {
        type: 'u'
      }),
    types.PLAYLIST_RESPONSE,
    (state, action) =>
      shallowCopy(state, {
        isFetching: false,
        sid: action.sid,
        ssid: action.ssid,
        song: action.song
      }),
    types.SONG_LYRIC_RESPONSE,
    (state, action) =>
      shallowCopy(state, {
        lyric: action.lyric
      }),
    types.RECENT_LIST,
    (state, action) =>
      shallowCopy(state, {
        recent: action.recent
      }),
    types.RECENT_EMPTY,
    state =>
      shallowCopy(state, {
        recent: {}
      }),
    types.RED_HEART_LIST,
    (state, action) =>
      shallowCopy(state, {
        redheart: action.redheart
      }),
    types.RED_HEART_EMPTY,
    state =>
      shallowCopy(state, {
        redheart: []
      }),
    types.TRASH_LIST,
    (state, action) =>
      shallowCopy(state, {
        trash: action.trash
      }),
    types.TRASH_EMPTY,
    state =>
      shallowCopy(state, {
        trash: {}
      }),
    types.SELECT_PATTERN,
    state =>
      shallowCopy(state, {
        pattern: 'select',
        channelId: -10
      }),
    types.RECENT_PATTERN,
    state =>
      shallowCopy(state, {
        pattern: 'recent',
        songListIndex: 0,
        sid: state.recent.songs[0].sid,
        ssid: state.recent.songs[0].ssid
      }),
    types.REDHEART_PATTERN,
    state =>
      shallowCopy(state, {
        pattern: 'redheart',
        songListIndex: 0,
        sid: state.redheart[0].sid,
        ssid: state.redheart[0].ssid
      }),
    types.DAILY_PATTERN,
    state =>
      shallowCopy(state, {
        pattern: 'daily',
        songListIndex: 0,
        sid: state.daily.songs[0].sid,
        ssid: state.daily.songs[0].ssid
      }),
    types.SHEET_PATTERN,
    state =>
      shallowCopy(state, {
        pattern: 'sheet',
        songListIndex: 0
      }),
    types.SONGLIST_GO,
    state =>
      shallowCopy(state, {
        songListIndex: state.songListIndex + 1
      }),
    types.SONGLIST_BACK,
    state =>
      shallowCopy(state, {
        songListIndex: state.songListIndex - 1
      }),
    types.SONGLIST_INDEX_SET,
    (state, action) =>
      shallowCopy(state, {
        pattern: action.pattern ? action.pattern : state.pattern,
        songListIndex: action.index
      }),
    types.APP_CHANNEL_SET,
    (state, action) =>
      shallowCopy(state, {
        pattern: 'select',
        channelId: action.id
      }),
    types.APP_CHANNEL,
    (state, action) =>
      shallowCopy(state, {
        channels: action.chls
      }),
    types.DAILY_LIST,
    (state, action) =>
      shallowCopy(state, {
        daily: action.daily
      }),
    types.DAILY_EMPTY,
    state =>
      shallowCopy(state, {
        daily: {}
      }),
    types.SHEET_SET,
    (state, action) =>
      shallowCopy(state, {
        sheet: action.list
      }),
    types.PLAYTIME_SET,
    (state, action) =>
      shallowCopy(state, {
        playtime: action.pt
      }),
    types.LYRIC_DISPLAY_TRUE,
    state =>
      shallowCopy(state, {
        lyricDisplay: true
      }),
    types.LYRIC_DISPLAY_FALSE,
    state =>
      shallowCopy(state, {
        lyricDisplay: false
      }),
    types.UPDATE_SID_SSID,
    (state, action) =>
      shallowCopy(state, {
        sid: action.sid,
        ssid: action.ssid
      })
  )(state, action)
}

export default fmReducer

import cond, { shallowCopyHelper as _sch } from 'redux-cond'
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
    refreshLoading: false,
    daily: {}, // daliy list
    sheet: [],
    playtime: '0.0'
  },
  action
) => {
  return cond(
    types.PLAYLIST_LOADING,
    state =>
      _sch(state, {
        isFetching: true
      }),
    types.PLAYLIST_NEW_REQUEST,
    state =>
      _sch(state, {
        type: 'n'
      }),
    types.PLAYLIST_PLAYING_REQUEST,
    state =>
      _sch(state, {
        type: 'p'
      }),
    types.PLAYLIST_SKIP_REQUEST,
    state =>
      _sch(state, {
        type: 's'
      }),
    types.PLAYLIST_TRASH_REQUEST,
    state =>
      _sch(state, {
        type: 'b'
      }),
    types.PLAYLIST_END_REQUEST,
    state =>
      _sch(state, {
        type: 'e'
      }),
    types.RED_HEART_RATE,
    state =>
      _sch(state, {
        type: 'r'
      }),
    types.RED_HEART_UNRATE,
    state =>
      _sch(state, {
        type: 'u'
      }),
    types.PLAYLIST_RESPONSE,
    (state, action) =>
      _sch(state, {
        isFetching: false,
        sid: action.sid,
        ssid: action.ssid,
        song: action.song
      }),
    types.SONG_LYRIC_RESPONSE,
    (state, action) =>
      _sch(state, {
        lyric: action.lyric
      }),
    types.RECENT_LIST,
    (state, action) =>
      _sch(state, {
        refreshLoading: false,
        recent: action.recent
      }),
    types.RECENT_EMPTY,
    state =>
      _sch(state, {
        recent: {}
      }),
    types.RED_HEART_LIST,
    (state, action) =>
      _sch(state, {
        refreshLoading: false,
        redheart: action.redheart
      }),
    types.RED_HEART_EMPTY,
    state =>
      _sch(state, {
        redheart: []
      }),
    types.TRASH_LIST,
    (state, action) =>
      _sch(state, {
        refreshLoading: false,
        trash: action.trash
      }),
    types.TRASH_EMPTY,
    state =>
      _sch(state, {
        trash: {}
      }),
    types.SONGLIST_REFRESH_LOADING,
    state =>
      _sch(state, {
        refreshLoading: true
      }),
    types.SELECT_PATTERN,
    state =>
      _sch(state, {
        pattern: 'select',
        channelId: -10
      }),
    types.RECENT_PATTERN,
    state =>
      _sch(state, {
        pattern: 'recent',
        songListIndex: 0,
        sid: state.recent.songs[0].sid,
        ssid: state.recent.songs[0].ssid
      }),
    types.REDHEART_PATTERN,
    state =>
      _sch(state, {
        pattern: 'redheart',
        songListIndex: 0,
        sid: state.redheart[0].sid,
        ssid: state.redheart[0].ssid
      }),
    types.DAILY_PATTERN,
    state =>
      _sch(state, {
        pattern: 'daily',
        songListIndex: 0,
        sid: state.daily.songs[0].sid,
        ssid: state.daily.songs[0].ssid
      }),
    types.SHEET_PATTERN,
    state =>
      _sch(state, {
        pattern: 'sheet',
        songListIndex: 0
      }),
    types.SONGLIST_GO,
    state =>
      _sch(state, {
        songListIndex: state.songListIndex + 1
      }),
    types.SONGLIST_BACK,
    state =>
      _sch(state, {
        songListIndex: state.songListIndex - 1
      }),
    types.SONGLIST_INDEX_SET,
    (state, action) =>
      _sch(state, {
        pattern: action.pattern ? action.pattern : state.pattern,
        songListIndex: action.index
      }),
    types.APP_CHANNEL_SET,
    (state, action) =>
      _sch(state, {
        pattern: 'select',
        channelId: action.id
      }),
    types.APP_CHANNEL,
    (state, action) =>
      _sch(state, {
        channels: action.chls
      }),
    types.DAILY_LIST,
    (state, action) =>
      _sch(state, {
        daily: action.daily
      }),
    types.DAILY_EMPTY,
    state =>
      _sch(state, {
        daily: {}
      }),
    types.SHEET_SET,
    (state, action) =>
      _sch(state, {
        sheet: action.list
      }),
    types.PLAYTIME_SET,
    (state, action) =>
      _sch(state, {
        playtime: action.pt
      }),
    types.LYRIC_DISPLAY_TRUE,
    state =>
      _sch(state, {
        lyricDisplay: true
      }),
    types.LYRIC_DISPLAY_FALSE,
    state =>
      _sch(state, {
        lyricDisplay: false
      }),
    types.UPDATE_SID_SSID,
    (state, action) =>
      _sch(state, {
        sid: action.sid,
        ssid: action.ssid
      })
  )(state, action)
}

export default fmReducer

import cond from 'redux-cond'
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
) =>
  cond(
    types.PLAYLIST_LOADING,
    state => ({ ...state, isFetching: true }),
    types.PLAYLIST_NEW_REQUEST,
    state => ({ ...state, type: 'n' }),
    types.PLAYLIST_PLAYING_REQUEST,
    state => ({ ...state, type: 'p' }),
    types.PLAYLIST_SKIP_REQUEST,
    state => ({ ...state, type: 's' }),
    types.PLAYLIST_TRASH_REQUEST,
    state => ({ ...state, type: 'b' }),
    types.PLAYLIST_END_REQUEST,
    state => ({ ...state, type: 'e' }),
    types.RED_HEART_RATE,
    state => ({ ...state, type: 'r' }),
    types.RED_HEART_UNRATE,
    state => ({ ...state, type: 'u' }),
    types.PLAYLIST_RESPONSE,
    (state, action) => ({
      ...state,
      isFetching: false,
      sid: action.sid,
      ssid: action.ssid,
      song: action.song
    }),
    types.SONG_LYRIC_RESPONSE,
    (state, action) => ({
      ...state,
      lyric: action.lyric
    }),
    types.RECENT_LIST,
    (state, action) => ({
      ...state,
      refreshLoading: false,
      recent: action.recent
    }),
    types.RECENT_EMPTY,
    state => ({
      ...state,
      recent: {}
    }),
    types.RED_HEART_LIST,
    (state, action) => ({
      ...state,
      refreshLoading: false,
      redheart: action.redheart
    }),
    types.RED_HEART_EMPTY,
    state => ({
      ...state,
      redheart: []
    }),
    types.TRASH_LIST,
    (state, action) => ({
      ...state,
      refreshLoading: false,
      trash: action.trash
    }),
    types.TRASH_EMPTY,
    state => ({
      ...state,
      trash: {}
    }),
    types.SONGLIST_REFRESH_LOADING,
    state => ({
      ...state,
      refreshLoading: true
    }),
    types.SELECT_PATTERN,
    state => ({
      ...state,
      pattern: 'select',
      channelId: -10
    }),
    types.RECENT_PATTERN,
    state => ({
      ...state,
      pattern: 'recent',
      songListIndex: 0,
      sid: state.recent.songs[0].sid,
      ssid: state.recent.songs[0].ssid
    }),
    types.REDHEART_PATTERN,
    state => ({
      ...state,
      pattern: 'redheart',
      songListIndex: 0,
      sid: state.redheart[0].sid,
      ssid: state.redheart[0].ssid
    }),
    types.DAILY_PATTERN,
    state => ({
      ...state,
      pattern: 'daily',
      songListIndex: 0,
      sid: state.daily.songs[0].sid,
      ssid: state.daily.songs[0].ssid
    }),
    types.SHEET_PATTERN,
    state => ({
      ...state,
      pattern: 'sheet',
      songListIndex: 0
    }),
    types.SONGLIST_GO,
    state => ({
      ...state,
      songListIndex: state.songListIndex + 1
    }),
    types.SONGLIST_BACK,
    state => ({
      ...state,
      songListIndex: state.songListIndex - 1
    }),
    types.SONGLIST_INDEX_SET,
    (state, action) => ({
      ...state,
      pattern: action.pattern ? action.pattern : state.pattern,
      songListIndex: action.index
    }),
    types.APP_CHANNEL_SET,
    (state, action) => ({
      ...state,
      pattern: 'select',
      channelId: action.id
    }),
    types.APP_CHANNEL,
    (state, action) => ({
      ...state,
      channels: action.chls
    }),
    types.DAILY_LIST,
    (state, action) => ({
      ...state,
      daily: action.daily
    }),
    types.DAILY_EMPTY,
    state => ({
      ...state,
      daily: {}
    }),
    types.SHEET_SET,
    (state, action) => ({
      ...state,
      sheet: action.list
    }),
    types.PLAYTIME_SET,
    (state, action) => ({
      ...state,
      playtime: action.pt
    }),
    types.LYRIC_DISPLAY_TRUE,
    state => ({
      ...state,
      lyricDisplay: true
    }),
    types.LYRIC_DISPLAY_FALSE,
    state => ({
      ...state,
      lyricDisplay: false
    }),
    types.UPDATE_SID_SSID,
    (state, action) => ({
      ...state,
      sid: action.sid,
      ssid: action.ssid
    })
  )(state, action)

export default fmReducer

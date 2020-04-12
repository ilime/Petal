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
    playtime: '0.0',
  },
  action
) => {
  switch (action.type) {
    case types.PLAYLIST_LOADING:
      return { ...state, isFetching: true }
    case types.PLAYLIST_NEW_REQUEST:
      return { ...state, type: 'n' }
    case types.PLAYLIST_PLAYING_REQUEST:
      return { ...state, type: 'p' }
    case types.PLAYLIST_SKIP_REQUEST:
      return { ...state, type: 's' }
    case types.PLAYLIST_TRASH_REQUEST:
      return { ...state, type: 'b' }
    case types.PLAYLIST_END_REQUEST:
      return { ...state, type: 'e' }
    case types.RED_HEART_RATE:
      return { ...state, type: 'r' }
    case types.RED_HEART_UNRATE:
      return { ...state, type: 'u' }
    case types.PLAYLIST_RESPONSE:
      return {
        ...state,
        isFetching: false,
        sid: action.sid,
        ssid: action.ssid,
        song: action.song,
      }
    case types.SONG_LYRIC_RESPONSE:
      return { ...state, lyric: action.lyric }
    case types.RECENT_LIST:
      return {
        ...state,
        refreshLoading: false,
        recent: action.recent,
      }
    case types.RECENT_EMPTY:
      return { ...state, recent: {} }
    case types.RED_HEART_LIST:
      return {
        ...state,
        refreshLoading: false,
        redheart: action.redheart,
      }
    case types.RED_HEART_EMPTY:
      return { ...state, redheart: [] }
    case types.TRASH_LIST:
      return {
        ...state,
        refreshLoading: false,
        trash: action.trash,
      }
    case types.TRASH_EMPTY:
      return { ...state, trash: {} }
    case types.SONGLIST_REFRESH_LOADING:
      return { ...state, refreshLoading: true }
    case types.SELECT_PATTERN:
      return {
        ...state,
        pattern: 'select',
        channelId: -10,
      }
    case types.RECENT_PATTERN:
      return {
        ...state,
        pattern: 'recent',
        songListIndex: 0,
        sid: state.recent.songs[0].sid,
        ssid: state.recent.songs[0].ssid,
      }
    case types.REDHEART_PATTERN:
      return {
        ...state,
        pattern: 'redheart',
        songListIndex: 0,
        sid: state.redheart[0].sid,
        ssid: state.redheart[0].ssid,
      }
    case types.DAILY_PATTERN:
      return {
        ...state,
        pattern: 'daily',
        songListIndex: 0,
        sid: state.daily.songs[0].sid,
        ssid: state.daily.songs[0].ssid,
      }
    case types.SHEET_PATTERN:
      return {
        ...state,
        pattern: 'sheet',
        songListIndex: 0,
      }
    case types.SONGLIST_GO:
      return { ...state, songListIndex: state.songListIndex + 1 }
    case types.SONGLIST_BACK:
      return { ...state, songListIndex: state.songListIndex - 1 }
    case types.SONGLIST_INDEX_SET:
      return {
        ...state,
        pattern: action.pattern ? action.pattern : state.pattern,
        songListIndex: action.index,
      }
    case types.APP_CHANNEL_SET:
      return {
        ...state,
        pattern: 'select',
        channelId: action.id,
      }
    case types.APP_CHANNEL:
      return { ...state, channels: action.chls }
    case types.DAILY_LIST:
      return { ...state, daily: action.daily }
    case types.DAILY_EMPTY:
      return { ...state, daily: {} }
    case types.SHEET_SET:
      return { ...state, sheet: action.list }
    case types.PLAYTIME_SET:
      return { ...state, playtime: action.pt }
    case types.LYRIC_DISPLAY_TRUE:
      return { ...state, lyricDisplay: true }
    case types.LYRIC_DISPLAY_FALSE:
      return { ...state, lyricDisplay: false }
    case types.UPDATE_SID_SSID:
      return {
        ...state,
        sid: action.sid,
        ssid: action.ssid,
      }
    default:
      return state
  }
}

export default fmReducer

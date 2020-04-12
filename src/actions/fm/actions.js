import * as types from './types'

export const playlistLoading = () => ({ type: types.PLAYLIST_LOADING })

export const playlistNewRequest = () => ({ type: types.PLAYLIST_NEW_REQUEST })

export const playlistPlayingRequest = () => ({
  type: types.PLAYLIST_PLAYING_REQUEST,
})

export const playlistSkipRequest = () => ({
  type: types.PLAYLIST_SKIP_REQUEST,
})

export const playlistTrashRequest = () => ({
  type: types.PLAYLIST_TRASH_REQUEST,
})

export const playlistEndRequest = () => ({ type: types.PLAYLIST_END_REQUEST })

export const playlistResponse = (sid, ssid, song) => ({
  type: types.PLAYLIST_RESPONSE,
  sid,
  ssid,
  song,
})

export const songLyricResponse = (lyric) => ({
  type: types.SONG_LYRIC_RESPONSE,
  lyric,
})

export const redHeartRate = () => ({ type: types.RED_HEART_RATE })

export const redHeartUnRate = () => ({ type: types.RED_HEART_UNRATE })

export const recentList = (recent) => ({ type: types.RECENT_LIST, recent })

export const recentEmpty = () => ({ type: types.RECENT_EMPTY })

export const redHeartList = (redheart) => ({
  type: types.RED_HEART_LIST,
  redheart,
})

export const redHeartEmpty = () => ({ type: types.RED_HEART_EMPTY })

export const songlistRefreshLoading = () => ({
  type: types.SONGLIST_REFRESH_LOADING,
})

export const trashList = (trash) => ({ type: types.TRASH_LIST, trash })

export const trashEmpty = () => ({ type: types.TRASH_EMPTY })

export const selectPattern = () => ({ type: types.SELECT_PATTERN })
export const recentPattern = () => ({ type: types.RECENT_PATTERN })
export const redheartPattern = () => ({ type: types.REDHEART_PATTERN })
export const sheetPattern = () => ({ type: types.SHEET_PATTERN })
export const dailyPattern = () => ({ type: types.DAILY_PATTERN })

export const songListGo = () => ({ type: types.SONGLIST_GO })
export const songListBack = () => ({ type: types.SONGLIST_BACK })
export const songListIndexSet = (index, pattern = null) => ({
  type: types.SONGLIST_INDEX_SET,
  index,
  pattern,
})

export const appChannel = (chls) => ({ type: types.APP_CHANNEL, chls })
export const appChannelSet = (id) => ({ type: types.APP_CHANNEL_SET, id })

export const dailyList = (daily) => ({ type: types.DAILY_LIST, daily })

export const dailyEmpty = () => ({ type: types.DAILY_EMPTY })

export const sheetSet = (list) => ({ type: types.SHEET_SET, list })

export const playtimeSet = (pt) => ({ type: types.PLAYTIME_SET, pt })

export const lyricDisplayTrue = () => ({ type: types.LYRIC_DISPLAY_TRUE })
export const lyricDisplayFalse = () => ({ type: types.LYRIC_DISPLAY_FALSE })

export const updateSidSsid = (sid, ssid) => ({
  type: types.UPDATE_SID_SSID,
  sid,
  ssid,
})

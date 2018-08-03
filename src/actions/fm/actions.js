import * as types from './types'

export const playlistLoading = () => {
  return {
    type: types.PLAYLIST_LOADING
  }
}

export const playlistNewRequest = () => {
  return {
    type: types.PLAYLIST_NEW_REQUEST
  }
}

export const playlistPlayingRequest = () => {
  return {
    type: types.PLAYLIST_PLAYING_REQUEST
  }
}

export const playlistSkipRequest = () => {
  return {
    type: types.PLAYLIST_SKIP_REQUEST
  }
}

export const playlistTrashRequest = () => {
  return {
    type: types.PLAYLIST_TRASH_REQUEST
  }
}

export const playlistEndRequest = () => {
  return {
    type: types.PLAYLIST_END_REQUEST
  }
}

export const playlistResponse = (sid, ssid, song) => {
  return {
    type: types.PLAYLIST_RESPONSE,
    sid,
    ssid,
    song
  }
}

export const songLyricResponse = lyric => {
  return {
    type: types.SONG_LYRIC_RESPONSE,
    lyric
  }
}

export const redHeartRate = () => {
  return {
    type: types.RED_HEART_RATE
  }
}

export const redHeartUnRate = () => {
  return {
    type: types.RED_HEART_UNRATE
  }
}

export const recentList = recent => {
  return {
    type: types.RECENT_LIST,
    recent
  }
}

export const recentEmpty = () => {
  return {
    type: types.RECENT_EMPTY
  }
}

export const redHeartList = redheart => {
  return {
    type: types.RED_HEART_LIST,
    redheart
  }
}

export const redHeartEmpty = () => {
  return {
    type: types.RED_HEART_EMPTY
  }
}

export const songlistRefreshLoading = {
  type: types.SONGLIST_REFRESH_LOADING
}

export const trashList = trash => {
  return {
    type: types.TRASH_LIST,
    trash
  }
}

export const trashEmpty = () => {
  return {
    type: types.TRASH_EMPTY
  }
}

export const selectPattern = { type: types.SELECT_PATTERN }
export const recentPattern = { type: types.RECENT_PATTERN }
export const redheartPattern = { type: types.REDHEART_PATTERN }
export const sheetPattern = { type: types.SHEET_PATTERN }
export const dailyPattern = { type: types.DAILY_PATTERN }

export const songListGo = { type: types.SONGLIST_GO }
export const songListBack = { type: types.SONGLIST_BACK }
export const songListIndexSet = (index, pattern = null) => {
  return {
    type: types.SONGLIST_INDEX_SET,
    index,
    pattern
  }
}

export const appChannel = chls => {
  return {
    type: types.APP_CHANNEL,
    chls
  }
}
export const appChannelSet = id => {
  return {
    type: types.APP_CHANNEL_SET,
    id
  }
}

export const dailyList = daily => {
  return {
    type: types.DAILY_LIST,
    daily
  }
}

export const dailyEmpty = () => {
  return {
    type: types.DAILY_EMPTY
  }
}

export const sheetSet = list => {
  return {
    type: types.SHEET_SET,
    list
  }
}

export const playtimeSet = pt => {
  return {
    type: types.PLAYTIME_SET,
    pt
  }
}

export const lyricDisplayTrue = { type: types.LYRIC_DISPLAY_TRUE }
export const lyricDisplayFalse = { type: types.LYRIC_DISPLAY_FALSE }

export const updateSidSsid = (sid, ssid) => {
  return {
    type: types.UPDATE_SID_SSID,
    sid,
    ssid
  }
}

import cond from 'redux-cond'
import * as types from '../actions/setting/types'

const settingReducer = (
  state = {
    mainVersion: 2,
    secondaryVersion: 23,
    volume: 20,
    openWithPlaying: true,
    restoreLastWinPos: false,
    hideAbout: false,
    openPattern: 'select',
    compactStatusBar: false,
    preferBitRate: '128',
    saveSuccess: false
  },
  action
) => {
  return cond(
    types.AUDIO_VOLUME_SET,
    (state, action) => ({ ...state, volume: action.volume }),
    types.OPEN_WITH_PLAYING_SET,
    (state, action) => ({ ...state, openWithPlaying: action.openWithPlaying }),
    types.RESTORE_LAST_WIN_POS,
    (state, action) => ({ ...state, restoreLastWinPos: action.restoreLastWinPos }),
    types.HIDE_ABOUT,
    (state, action) => ({ ...state, hideAbout: action.hideAbout }),
    types.OPEN_PATTERN,
    (state, action) => ({ ...state, openPattern: action.openPattern }),
    types.COMPACT_STATUS_BAR,
    (state, action) => ({ ...state, compactStatusBar: action.compactStatusBar }),
    types.PREFER_BIT_RATE,
    (state, action) => ({ ...state, preferBitRate: action.preferBitRate }),
    types.SETTING_SAVE_SUCCESS,
    state => ({ ...state, saveSuccess: true }),
    types.SETTING_SAVE_SUCCESS_RESET,
    state => ({ ...state, saveSuccess: false })
  )(state, action)
}

export default settingReducer

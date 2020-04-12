import * as types from '../actions/setting/types'

const settingReducer = (
  state = {
    mainVersion: 2,
    secondaryVersion: 25,
    volume: 20,
    openWithPlaying: true,
    restoreLastWinPos: false,
    hideAbout: false,
    openPattern: 'select',
    compactStatusBar: false,
    preferBitRate: '128',
    saveSuccess: false,
  },
  action
) => {
  switch (action.type) {
    case types.AUDIO_VOLUME_SET:
      return { ...state, volume: action.volume }
    case types.OPEN_WITH_PLAYING_SET:
      return { ...state, openWithPlaying: action.openWithPlaying }
    case types.RESTORE_LAST_WIN_POS:
      return { ...state, restoreLastWinPos: action.restoreLastWinPos }
    case types.HIDE_ABOUT:
      return { ...state, hideAbout: action.hideAbout }
    case types.OPEN_PATTERN:
      return { ...state, openPattern: action.openPattern }
    case types.COMPACT_STATUS_BAR:
      return { ...state, compactStatusBar: action.compactStatusBar }
    case types.PREFER_BIT_RATE:
      return { ...state, preferBitRate: action.preferBitRate }
    case types.SETTING_SAVE_SUCCESS:
      return { ...state, saveSuccess: true }
    case types.SETTING_SAVE_SUCCESS_RESET:
      return { ...state, saveSuccess: false }
    default:
      return state
  }
}

export default settingReducer

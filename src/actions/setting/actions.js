import * as types from './types'

const audioVolumeSet = volume => ({
  type: types.AUDIO_VOLUME_SET,
  volume
})

const openWithPlayingSet = bool => ({
  type: types.OPEN_WITH_PLAYING_SET,
  openWithPlaying: bool
})

const restoreLastWinPosSet = bool => ({
  type: types.RESTORE_LAST_WIN_POS,
  restoreLastWinPos: bool
})

const hideAboutSet = bool => ({
  type: types.HIDE_ABOUT,
  hideAbout: bool
})

const openPatternSet = pattern => ({
  type: types.OPEN_PATTERN,
  openPattern: pattern
})

const settingSaveSuccess = () => ({ type: types.SETTING_SAVE_SUCCESS })
const settingSaveSuccessReset = () => ({
  type: types.SETTING_SAVE_SUCCESS_RESET
})

export {
  audioVolumeSet,
  openWithPlayingSet,
  restoreLastWinPosSet,
  hideAboutSet,
  openPatternSet,
  settingSaveSuccess,
  settingSaveSuccessReset
}

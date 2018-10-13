import * as types from './types'

const audioVolumeSet = volume => {
  return {
    type: types.AUDIO_VOLUME_SET,
    volume
  }
}

const openWithPlayingSet = bool => {
  return {
    type: types.OPEN_WITH_PLAYING_SET,
    openWithPlaying: bool
  }
}

const restoreLastWinPos = bool => {
  return {
    type: types.RESTORE_LAST_WIN_POS,
    restoreLastWinPos: bool
  }
}

const settingSaveSuccess = { type: types.SETTING_SAVE_SUCCESS }
const settingSaveSuccessReset = { type: types.SETTING_SAVE_SUCCESS_RESET }

export {
  audioVolumeSet,
  openWithPlayingSet,
  restoreLastWinPos,
  settingSaveSuccess,
  settingSaveSuccessReset
}

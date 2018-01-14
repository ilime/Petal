import * as types from './types'

const audioVolumeSet = volume => {
  return {
    type: types.AUDIO_VOLUME_SET,
    volume
  }
}

const settingSaveSuccess = { type: types.SETTING_SAVE_SUCCESS }
const settingSaveSuccessReset = { type: types.SETTING_SAVE_SUCCESS_RESET }

export {
  audioVolumeSet,
  settingSaveSuccess,
  settingSaveSuccessReset
}

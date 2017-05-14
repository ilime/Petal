'use strict'

import { AUDIO_VOLUME_PROGRESS_SET, AUDIO_VOLUME_PIN_SET } from '../actions/setting/types'

const settingReducer = (state = {
  mainVersion: 1,
  secondaryVersion: 0,
  audioVolumeProgress: 30,
  audioVolumePin: 39
}, action) => {
  switch (action.type) {
    case AUDIO_VOLUME_PROGRESS_SET:
      return Object.assign({}, state, {
        audioVolumeProgress: action.width
      })
    case AUDIO_VOLUME_PIN_SET:
      return Object.assign({}, state, {
        audioVolumePin: action.left
      })
    default:
      return state
  }
}

export default settingReducer
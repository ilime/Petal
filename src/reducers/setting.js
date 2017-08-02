import cond, {
  shallowCopy
} from 'redux-cond'
import {
  AUDIO_VOLUME_PROGRESS_SET,
  AUDIO_VOLUME_PIN_SET
} from '../actions/setting/types'

const settingReducer = (state = {
  mainVersion: 1,
  secondaryVersion: 3,
  audioVolumeProgress: 30,
  audioVolumePin: 39
}, action) => {
  return cond(
    AUDIO_VOLUME_PROGRESS_SET, (state, action) => shallowCopy(state, {
      audioVolumeProgress: action.width
    }),
    AUDIO_VOLUME_PIN_SET, (state, action) => shallowCopy(state, {
      audioVolumePin: action.left
    })
  )(state, action)
}

export default settingReducer

import cond from 'redux-cond'
import { AUDIO_VOLUME_PROGRESS_SET, AUDIO_VOLUME_PIN_SET } from '../actions/setting/types'
import { updateObject } from '../helper/copy'

const settingReducer = (state = {
  mainVersion: 1,
  secondaryVersion: 3,
  audioVolumeProgress: 30,
  audioVolumePin: 39
}, action) => {
  return cond(
    AUDIO_VOLUME_PROGRESS_SET, (state, action) => updateObject(state, { audioVolumeProgress: action.width }),
    AUDIO_VOLUME_PIN_SET, (state, action) => updateObject(state, { audioVolumePin: action.left })
  )(state, action)
}

export default settingReducer
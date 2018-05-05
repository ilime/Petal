import cond, { shallowCopy } from 'redux-cond'
import * as types from '../actions/setting/types'

const settingReducer = (
  state = {
    mainVersion: 2,
    secondaryVersion: 8,
    volume: 20,
    openWithPlaying: true,
    saveSuccess: false
  },
  action
) => {
  return cond(
    types.AUDIO_VOLUME_SET,
    (state, action) =>
      shallowCopy(state, {
        volume: action.volume
      }),
    types.OPEN_WITH_PLAYING_SET,
    (state, action) =>
      shallowCopy(state, {
        openWithPlaying: action.openWithPlaying
      }),
    types.SETTING_SAVE_SUCCESS,
    state =>
      shallowCopy(state, {
        saveSuccess: true
      }),
    types.SETTING_SAVE_SUCCESS_RESET,
    state =>
      shallowCopy(state, {
        saveSuccess: false
      })
  )(state, action)
}

export default settingReducer

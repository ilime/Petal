import cond, { shallowCopyHelper as _sch } from 'redux-cond'
import * as types from '../actions/setting/types'

const settingReducer = (
  state = {
    mainVersion: 2,
    secondaryVersion: 18,
    volume: 20,
    openWithPlaying: true,
    restoreLastWinPos: false,
    hideAbout: false,
    openPattern: 'select',
    saveSuccess: false
  },
  action
) => {
  return cond(
    types.AUDIO_VOLUME_SET,
    (state, action) =>
      _sch(state, {
        volume: action.volume
      }),
    types.OPEN_WITH_PLAYING_SET,
    (state, action) =>
      _sch(state, {
        openWithPlaying: action.openWithPlaying
      }),
    types.RESTORE_LAST_WIN_POS,
    (state, action) =>
      _sch(state, {
        restoreLastWinPos: action.restoreLastWinPos
      }),
    types.HIDE_ABOUT,
    (state, action) =>
      _sch(state, {
        hideAbout: action.hideAbout
      }),
    types.OPEN_PATTERN,
    (state, action) =>
      _sch(state, {
        openPattern: action.openPattern
      }),
    types.SETTING_SAVE_SUCCESS,
    state =>
      _sch(state, {
        saveSuccess: true
      }),
    types.SETTING_SAVE_SUCCESS_RESET,
    state =>
      _sch(state, {
        saveSuccess: false
      })
  )(state, action)
}

export default settingReducer

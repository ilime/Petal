import * as actions from './actions'

import db from '../../helper/db'

/**
 * Deal with Loading user setting
 * The following:
 *
 * 1. Volume setting
 *
 * @returns {Function} - a thunk function
 */
export const settingLoad = () => {
  return dispatch => {
    db.findOne({ setting: 'normal' }, (err, doc) => {
      if (doc !== null) {
        dispatch(actions.audioVolumeSet(doc.volume))
        dispatch(actions.openWithPlayingSet(doc.openWithPlaying))
      }
    })
  }
}

/**
 * Store user settting
 * The following:
 *
 * 1. Volume setting
 *
 * @param {number} volume
 */
export const settingStore = state => {
  return dispatch => {
    db.findOne({ setting: 'normal' }, (err, doc) => {
      if (doc !== null) {
        db.update(
          { setting: 'normal' },
          {
            $set: {
              volume: state.volume,
              openWithPlaying: state.openWithPlaying
            }
          },
          {},
          (err, numReplaced) => {
            if (err === null) {
              console.log('update setting: ' + numReplaced)
              dispatch(actions.audioVolumeSet(state.volume))
              dispatch(actions.openWithPlayingSet(state.openWithPlaying))
              dispatch(actions.settingSaveSuccess)
              setTimeout(() => {
                dispatch(actions.settingSaveSuccessReset)
              }, 3000)
            }
          }
        )
      } else {
        db.insert(
          {
            setting: 'normal',
            volume: state.volume,
            openWithPlaying: state.openWithPlaying
          },
          (err, doc) => {
            if (err === null) {
              console.log(doc)
              dispatch(actions.audioVolumeSet(state.volume))
              dispatch(actions.openWithPlayingSet(state.openWithPlaying))
              dispatch(actions.settingSaveSuccess)
              setTimeout(() => {
                dispatch(actions.settingSaveSuccessReset)
              }, 3000)
            }
          }
        )
      }
    })
  }
}

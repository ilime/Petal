import * as actions from './actions'

import db from '../../helper/db'

/**
 * Deal with Loading user setting
 * The following:
 *
 * 1. Volume setting
 * 2. Whether open with playing
 * 3. Whether remember last window position
 * 4. Whether hide about page
 *
 * @returns {Function} - a thunk function
 */
export const settingLoad = () => {
  return dispatch => {
    db.findOne({ setting: 'normal' }, (err, doc) => {
      if (doc !== null) {
        dispatch(actions.audioVolumeSet(doc.volume))
        dispatch(actions.openWithPlayingSet(doc.openWithPlaying || true))
        dispatch(actions.restoreLastWinPosSet(doc.restoreLastWinPos || false))
        dispatch(actions.hideAboutSet(doc.hideAbout || false))
      }
    })
  }
}

/**
 * Store user setting
 * The following:
 *
 * 1. Volume setting
 * 2. Whether open with playing
 * 3. Whether remember last window position
 * 4. Whether hide about page
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
              openWithPlaying: state.openWithPlaying,
              restoreLastWinPos: state.restoreLastWinPos,
              hideAbout: state.hideAbout
            }
          },
          {
            upsert: true
          },
          (err, numReplaced) => {
            if (err === null) {
              console.log('Update setting:', numReplaced)
              dispatch(actions.audioVolumeSet(state.volume))
              dispatch(actions.openWithPlayingSet(state.openWithPlaying))
              dispatch(actions.restoreLastWinPosSet(state.restoreLastWinPos))
              dispatch(actions.hideAboutSet(state.hideAbout))
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
            openWithPlaying: state.openWithPlaying,
            restoreLastWinPos: state.restoreLastWinPos,
            hideAbout: state.hideAbout
          },
          (err, doc) => {
            if (err === null) {
              console.log('Insert setting:', doc)
              dispatch(actions.audioVolumeSet(state.volume))
              dispatch(actions.openWithPlayingSet(state.openWithPlaying))
              dispatch(actions.restoreLastWinPosSet(state.restoreLastWinPos))
              dispatch(actions.hideAboutSet(state.hideAbout))
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

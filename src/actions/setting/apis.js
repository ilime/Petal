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
        console.log('Petal Setting:', doc)
        dispatch(actions.audioVolumeSet(doc.volume))
        dispatch(actions.openWithPlayingSet(doc.openWithPlaying ? true : false))
        dispatch(actions.restoreLastWinPosSet(doc.restoreLastWinPos || false))
        dispatch(actions.hideAboutSet(doc.hideAbout || false))
        dispatch(actions.openPatternSet(doc.openPattern || 'select'))
        dispatch(actions.compactStatusBarSet(doc.compactStatusBar || false))
        dispatch(actions.preferBitRateSet(doc.preferBitRate || '128'))
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
 * 5. Whether use compact status bar
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
              hideAbout: state.hideAbout,
              openPattern: state.openPattern,
              compactStatusBar: state.compactStatusBar,
              preferBitRateSet: state.preferBitRate
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
              dispatch(actions.openPatternSet(state.openPattern))
              dispatch(actions.compactStatusBarSet(state.compactStatusBar))
              dispatch(actions.preferBitRateSet(state.preferBitRate))
              dispatch(actions.settingSaveSuccess())
              setTimeout(() => {
                dispatch(actions.settingSaveSuccessReset())
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
            hideAbout: state.hideAbout,
            openPattern: state.openPattern,
            compactStatusBar: state.compactStatusBar,
            preferBitRateSet: state.preferBitRate
          },
          (err, doc) => {
            if (err === null) {
              console.log('Insert setting:', doc)
              dispatch(actions.audioVolumeSet(state.volume))
              dispatch(actions.openWithPlayingSet(state.openWithPlaying))
              dispatch(actions.restoreLastWinPosSet(state.restoreLastWinPos))
              dispatch(actions.hideAboutSet(state.hideAbout))
              dispatch(actions.openPatternSet(state.openPattern))
              dispatch(actions.compactStatusBarSet(state.compactStatusBar))
              dispatch(actions.preferBitRateSet(state.preferBitRate))
              dispatch(actions.settingSaveSuccess())
              setTimeout(() => {
                dispatch(actions.settingSaveSuccessReset())
              }, 3000)
            }
          }
        )
      }
    })
  }
}

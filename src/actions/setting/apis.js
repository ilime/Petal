'use strict'

import { audioVolumeProgressSet, audioVolumePinSet } from './types'

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
        dispatch(audioVolumeProgressSet(doc.audioVolumeProgress))
        dispatch(audioVolumePinSet(doc.audioVolumePin))
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
 * @param {number} width - volume progress width
 * @param {number} left - volume pin's current position of the left
 */
export const settingStore = (width, left) => {
  db.findOne({ setting: 'normal' }, (err, doc) => {
    if (doc !== null) {
      db.update({ setting: 'normal' }, {
        $set: {
          audioVolumeProgress: width,
          audioVolumePin: left
        },
      }, {}, (err, numReplaced) => {
        console.log('update setting: ' + numReplaced)
      })
    } else {
      db.insert({
        setting: 'normal',
        audioVolumeProgress: width,
        audioVolumePin: left
      }, (err, doc) => {
        console.log(doc)
      })
    }
  })
}
'use strict'

import { audioVolumeProgressSet, audioVolumePinSet } from './types'

import db from '../../helper/db'

export const settingLoad = () => {
  return (dispatch, getState) => {
    db.findOne({ setting: 'normal' }, (err, doc) => {
      if (doc !== null) {
        dispatch(audioVolumeProgressSet(doc.audioVolumeProgress))
        dispatch(audioVolumePinSet(doc.audioVolumePin))
      }
    })
  }
}

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
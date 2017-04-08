'use strict'

import {
  PLAYLIST_NEW_REQUEST, PLAYLIST_RESPONSE
} from '../actions/fm/types'

const fmReducer = (state = {
  playlist: {},
  type: '',
  sid: ''
}, action) => {
  switch (action.type) {
    case PLAYLIST_NEW_REQUEST:
      return Object.assign({}, state, {
        type: 'n'
      })
    case PLAYLIST_RESPONSE:
      return Object.assign({}, state, {
        playlist: action.playlist
      })
    default:
      return state
  }
}

export default fmReducer


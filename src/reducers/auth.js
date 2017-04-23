'use strict'

import {
  AUTH_LOGIN_REQUEST, AUTH_LOGIN_RESPONSE,
  AUTH_TOKEN_LOAD, AUTH_LOGOUT
} from '../actions/auth/types'

const authReducer = (state = {
  isFetching: false,
  _id: 0,
  userToken: {}
}, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case AUTH_LOGIN_RESPONSE:
      return Object.assign({}, state, {
        isFetching: false,
        _id: action._id,
        userToken: action.userToken
      })
    case AUTH_TOKEN_LOAD:
      return Object.assign({}, state, {
        _id: action._id,
        userToken: action.userToken
      })
    case AUTH_LOGOUT:
      return Object.assign({}, state, {
        _id: 0,
        userToken: {}
      })
    default:
      return state
  }
}

export default authReducer
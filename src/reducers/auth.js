'use strict'

import {
  AUTH_LOGIN_REQUEST, AUTH_LOGIN_RESPONSE,
  AUTH_LOGIN_FAIL, AUTH_REMOVE_FAIL_MESSAGE,
  AUTH_TOKEN_LOAD, AUTH_LOGOUT,
  USER_INFO
} from '../actions/auth/types'

const authReducer = (state = {
  isFetching: false,
  loginFail: false,
  loginFailMessage: '',
  _id: 0,
  userToken: {},
  userInfo: {}
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
    case AUTH_LOGIN_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        loginFail: true,
        loginFailMessage: action.message
      })
    case AUTH_REMOVE_FAIL_MESSAGE:
      return Object.assign({}, state, {
        loginFail: false,
        loginFailMessage: ''
      })
    case AUTH_TOKEN_LOAD:
      return Object.assign({}, state, {
        _id: action._id,
        userToken: action.userToken
      })
    case AUTH_LOGOUT:
      return Object.assign({}, state, {
        _id: 0,
        userToken: {},
        userInfo: {}
      })
    case USER_INFO:
      return Object.assign({}, state, {
        userInfo: action.userInfo
      })
    default:
      return state
  }
}

export default authReducer
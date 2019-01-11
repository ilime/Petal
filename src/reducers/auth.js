import cond, { shallowCopyHelper as _sch } from 'redux-cond'
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_RESPONSE,
  AUTH_LOGIN_FAIL,
  AUTH_REMOVE_FAIL_MESSAGE,
  AUTH_TOKEN_LOAD,
  AUTH_LOGOUT,
  USER_INFO
} from '../actions/auth/types'

const authReducer = (
  state = {
    isFetching: false, // login loading, true is loading
    loginFail: false,
    loginFailMessage: '',
    _id: 0, // if _id === 1, use is login
    userToken: {},
    userInfo: {}
  },
  action
) => {
  return cond(
    AUTH_LOGIN_REQUEST,
    state =>
      _sch(state, {
        isFetching: true
      }),
    AUTH_LOGIN_RESPONSE,
    (state, action) =>
      _sch(state, {
        isFetching: false,
        _id: action._id,
        userToken: action.userToken
      }),
    AUTH_LOGIN_FAIL,
    (state, action) =>
      _sch(state, {
        isFetching: false,
        loginFail: true,
        loginFailMessage: action.message
      }),
    AUTH_REMOVE_FAIL_MESSAGE,
    state =>
      _sch(state, {
        loginFail: false,
        loginFailMessage: ''
      }),
    AUTH_TOKEN_LOAD,
    state =>
      _sch(state, {
        _id: action._id,
        userToken: action.userToken
      }),
    AUTH_LOGOUT,
    state =>
      _sch(state, {
        _id: 0,
        userToken: {},
        userInfo: {}
      }),
    USER_INFO,
    (state, action) =>
      _sch(state, {
        userInfo: action.userInfo
      })
  )(state, action)
}

export default authReducer

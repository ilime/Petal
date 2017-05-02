'use strict'

export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST'
export const AUTH_LOGIN_RESPONSE = 'AUTH_LOGIN_RESPONSE'
export const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL'
export const AUTH_REMOVE_FAIL_MESSAGE = 'AUTH_REMOVE_FAIL_MESSAGE'
export const AUTH_TOKEN_LOAD = 'AUTH_TOKEN_LOAD'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

export const authLoginRequest = () => {
  return {
    type: AUTH_LOGIN_REQUEST
  }
}

export const authLoginResponse = userToken => {
  return {
    type: AUTH_LOGIN_RESPONSE,
    _id: 1,
    userToken
  }
}

export const authLoginFail = message => {
  return {
    type: AUTH_LOGIN_FAIL,
    message
  }
}

export const authRemoveFailMessage = { type: AUTH_REMOVE_FAIL_MESSAGE }

export const authTokenLoad = doc => {
  return {
    type: AUTH_TOKEN_LOAD,
    _id: doc._id,
    userToken: doc.userToken
  }
}

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT
  }
}
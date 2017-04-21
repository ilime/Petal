'use strict'

export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST'
export const AUTH_LOGIN_RESPONSE= 'AUTH_LOGIN_RESPONSE'
export const AUTH_TOKEN_LOAD = 'AUTH_TOKEN_LOAD'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

export const authLoginRequest = () => {
  return {
    type: AUTH_LOGIN_REQUEST
  }
}

export const authLoginResponse = (userInfo) => {
  return {
    type: AUTH_LOGIN_RESPONSE,
    _id: 1,
    userInfo
  }
}

export const authTokenLoad = (doc) => {
  return {
    type: AUTH_TOKEN_LOAD,
    _id: doc._id,
    userInfo: doc.userInfo
  }
}

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT
  }
}
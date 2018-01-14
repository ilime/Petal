import * as types from './types'

export const authLoginRequest = () => {
  return {
    type: types.AUTH_LOGIN_REQUEST
  }
}

export const authLoginResponse = userToken => {
  return {
    type: types.AUTH_LOGIN_RESPONSE,
    _id: 1,
    userToken
  }
}

export const authLoginFail = message => {
  return {
    type: types.AUTH_LOGIN_FAIL,
    message
  }
}

export const authRemoveFailMessage = { type: types.AUTH_REMOVE_FAIL_MESSAGE }

export const authTokenLoad = doc => {
  return {
    type: types.AUTH_TOKEN_LOAD,
    _id: doc._id,
    userToken: doc.userToken
  }
}

export const authLogout = () => {
  return {
    type: types.AUTH_LOGOUT
  }
}

export const userInfo = userInfo => {
  return {
    type: types.USER_INFO,
    userInfo
  }
}

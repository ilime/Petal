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
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return { ...state, isFetching: true }
    case AUTH_LOGIN_RESPONSE:
      return { ...state, isFetching: false, _id: action._id, userToken: action.userToken }
    case AUTH_LOGIN_FAIL:
      return { ...state, isFetching: false, loginFail: true, loginFailMessage: action.message }
    case AUTH_REMOVE_FAIL_MESSAGE:
      return { ...state, loginFail: false, loginFailMessage: '' }
    case AUTH_TOKEN_LOAD:
      return { ...state, _id: action._id, userToken: action.userToken }
    case AUTH_LOGOUT:
      return { ...state, _id: 0, userToken: {}, userInfo: {} }
    case USER_INFO:
      return { ...state, userInfo: action.userInfo }
    default:
      return state
  }
}

export default authReducer

import { combineReducers } from 'redux'

import fmReducer from './fm'
import authReducer from './auth'
import settingReducer from './setting'

export default combineReducers({
  fmReducer,
  authReducer,
  settingReducer
})
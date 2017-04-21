'use strict'

import { combineReducers } from 'redux'

import fmReducer from './fm'
import authReducer from './auth'

export default combineReducers({
  fmReducer,
  authReducer
})
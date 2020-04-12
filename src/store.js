import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './reducers'

const middlewares = [thunkMiddleware]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default (initialState) => {
  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger')

    middlewares.push(logger)
  }

  return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)))
}

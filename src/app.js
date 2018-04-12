import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './store'
import HotContainer from './HotContainer'

const store = configureStore()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HotContainer />
      </Provider>
    )
  }
}

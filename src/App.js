import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './store'
import Container from './components/Container'
import TrayTwin from './components/Tray'

const store = configureStore()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
        <TrayTwin />
      </Provider>
    )
  }
}

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'

const rootEl = document.getElementById('app')
const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl
  )

render(App)
if (module.hot) module.hot.accept('./App', () => render(App))

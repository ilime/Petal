'use strict'

import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Container from './components/Container/index.jsx'

import configureStore from './store'

const store = configureStore()

ReactDOM.render(
	<Provider store={store}>
		<Container />
	</Provider>,
	document.getElementById('app')
)
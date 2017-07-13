import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Container from './components/Container/index.jsx'
import configureStore from './store'

const store = configureStore()

render(
	<Provider store={store}>
		<Container />
	</Provider>,
	document.getElementById('app')
)
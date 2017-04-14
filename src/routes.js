'use strict'

import React from 'react'
import { Route } from 'react-router-dom'

import Login from './components/Login/index.jsx'
import FM from './components/FM/index.jsx'

const routes = [
  {
    id: 1,
    path: '/login',
    component: Login
  }
]

const RouteWithSubRoutes = (route) => (
  <Route exact={route.exact} path={route.path} render={props => (
    <route.component {...props} routes={route.routes} />
  )} />
)

export default routes.map(route => (
  <RouteWithSubRoutes key={route.id} {...route} />
))
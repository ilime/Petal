'use strict'

import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'

class Login extends Component {
  componentDidMount() {
    document.querySelector('.fmRegion').style.display = 'none'
  }

  componentWillUnmount() {
    if (this.props.history.location.pathname === '/') {
      document.querySelector('.fmRegion').style.display = 'block'
    }
  }

  render() {
    return (
      <div>
        <Header size='huge' textAlign='center'>Petal Login</Header>
      </div>
    )
  }
}

export default Login
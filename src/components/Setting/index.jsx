import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import Main from './Main'

class Setting extends Component {
  componentDidMount() {
    document.querySelector('.fm-region').style.display = 'none'
  }

  componentWillUnmount() {
    if (this.props.history.location.pathname === '/') {
      document.querySelector('.fm-region').style.display = 'flex'
    }
  }

  render() {
    return (
      <article className="petal-setting">
        <Header as="h2">设置</Header>
        <Main />
      </article>
    )
  }
}

export default Setting

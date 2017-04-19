'use strict'

import React, { Component } from 'react'
import { Header, Button, Form, Input, Grid, Divider} from 'semantic-ui-react'
import './index.scss'

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

        <Header as='header' size='huge' className="loginHeader">Petal</Header>
        <h3 className='logoPlaceholder'>Logo</h3>
        <Form className='formContent'>
          <Form.Field>
            <input placeholder='豆瓣账号' />
          </Form.Field>
          <Form.Field>
            <input placeholder='密码' />
          </Form.Field>
          <Button type='submit' fluid color='green' className='submitBtn'>登 录</Button>
        </Form>
        <p className='panelTail'>忘记密码？<a href="#">马上注册!</a></p>
        <Divider horizontal>关于我们</Divider>
      </div>
    )
  }
}

export default Login
'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Header, Image, Form, Grid, Button, Dimmer, Loader, Message } from 'semantic-ui-react'

import { authLoginFail, authRemoveFailMessage } from '../../actions/auth/types'
import { authPost } from '../../actions/auth/apis'
import './index.scss'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    document.querySelector('.fmRegion').style.display = 'none'
  }

  componentWillUnmount() {
    if (this.props.history.location.pathname === '/') {
      document.querySelector('.fmRegion').style.display = 'block'
    }
  }

  openInDefaultBrowser = (url) => {
    return () => {
      const shell = window.require('electron').shell
      shell.openExternal(url)
    }
  }

  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleLoginSubmit = (e) => {
    e.preventDefault()
    const { username, password } = this.state
    const { handleAuthPost, handleAuthLoginFail, loginFail } = this.props

    if (username === '' || password === '') {
      handleAuthLoginFail('账号或密码不能为空')
    } else {
      handleAuthPost({ username, password }, () => this.props.history.push('/'))
    }
  }

  render() {
    const { isFetching, loginFail, loginFailMessage } = this.props
    const { username, password } = this.state

    return (
      <article className='loginRegion'>
        <Header as='h1' textAlign='center' className='loginHeader'>
          <Image src='./resources/petal.png' size='huge' />
          <span className='appTitle'>Petal</span>
        </Header>
        <Dimmer.Dimmable dimmed>
          <Dimmer active={isFetching} inverted>
            <Loader>加载中</Loader>
          </Dimmer>
          <Form className='loginFormContent'>
            {loginFail && <Message size='small' negative onDismiss={this.props.handleRemoveLoginFailMessage}>
              <Message.Header>登录失败</Message.Header>
              <p>{loginFailMessage}</p>
            </Message>}
            <Form.Input name='username' value={username} onChange={this.handleInputChange} placeholder='豆瓣账号' />
            <Form.Input type='password' name='password' value={password} onChange={this.handleInputChange} placeholder='密码' />
            <Button fluid color='green' className='loginSubmitBtn' onClick={this.handleLoginSubmit}>登 录</Button>
          </Form>
        </Dimmer.Dimmable>
        <p className='loginExtra'>没有豆瓣账号? <span onClick={this.openInDefaultBrowser('https://www.douban.com')}>去注册</span></p>
      </article>
    )
  }
}

Login.PropTypes = {
  handleAuthPost: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  loginFail: PropTypes.bool.isRequired,
  loginFailMessage: PropTypes.string.isRequired,
  handleAuthLoginFail: PropTypes.func.isRequired,
  handleRemoveLoginFailMessage: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.authReducer.isFetching,
    loginFail: state.authReducer.loginFail,
    loginFailMessage: state.authReducer.loginFailMessage
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleAuthPost: (usernameAndPassword, callback) => dispatch(authPost(usernameAndPassword, callback)),
    handleAuthLoginFail: message => dispatch(authLoginFail(message)),
    handleRemoveLoginFailMessage: () => dispatch(authRemoveFailMessage)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
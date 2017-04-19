'use strict'

import React, { Component } from 'react'
import { Header, Image, Form, Grid, Button, Divider } from 'semantic-ui-react'

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

  openInDefaultBrowser = (url) => {
    return () => {
      const shell = window.require('electron').shell
      shell.openExternal(url)
    }
  }

  render() {
    return (
      <article className='loginRegion'>
        <Header as='h1' textAlign='center' className='loginHeader'>
          <Image src='./petal.png' size='tiny' />
          <span className='appTitle'>Petal</span>
        </Header>
        <Form className='loginFormContent'>
          <Form.Input placeholder='豆瓣账号' />
          <Form.Input placeholder='密码' />
          <Button type='submit' fluid color='green' className='loginSubmitBtn'>登 录</Button>
        </Form>
        <p className='loginExtra'>没有豆瓣账号? <span onClick={this.openInDefaultBrowser('https://www.douban.com')}>去注册</span></p>
        <Divider horizontal>关于我们</Divider>
        <div className='aboutUs'>
          <p>Petal是一个豆瓣第三方客户端，以FM为主，计划集成豆瓣图书，电影，音乐等功能。</p>
          <p>不得将此应用用于任何非法用途，所有功能均使用豆瓣API构建，<strong>一切权益归豆瓣所有</strong>。</p>
          <p>Petal的维护者是
            <span onClick={this.openInDefaultBrowser('https://github.com/SandStorms')}>SandStorms</span>，
            如果有任何使用上的问题，请前往
            <span onClick={this.openInDefaultBrowser('https://github.com/SandStorms/Petal/issues')}>仓库下的issue</span>
            下提出
          </p>
          <p>App Icon <span onClick={this.openInDefaultBrowser('http://www.freepik.com/free-vector/collection-of-floral-elements-and-leaves_1019890.htm')}>Designed by Freepik</span></p>
        </div>
      </article>
    )
  }
}

export default Login
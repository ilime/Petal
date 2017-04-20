'use strict'

import React, { Component } from 'react'
import { Grid, Icon, Header, Image } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

import PetalRoutes from '../../routes'

import FM from '../FM/index.jsx'

import './index.scss'

const electron = window.require('electron'),
  remote = electron.remote

class Container extends Component {
  handleAppMinimize = () => {
    remote.getCurrentWindow().minimize()
  }

  handleAppClose = () => {
    remote.getCurrentWindow().close()
  }

  render() {
    return (
      <Grid>
        <Grid.Row className='outside'>
          <Grid.Column as='nav' width={2} id='sidebarColumn'>
            <ul className='navigation'>
              <li>
                <NavLink exact to='/' activeClassName='selected'>
                  <Icon name='leaf' size='large' color='grey' />
                  <span>I'mFM</span>
                </NavLink>
              </li>
              <li>
                <Icon name='book' size='large' color='grey' />
                <span>图书</span>
              </li>
              <li>
                <Icon name='video' size='large' color='grey' />
                <span>电影</span>
              </li>
              <li>
                <Icon name='music' size='large' color='grey' />
                <span>音乐</span>
              </li>
              <li id='logIn'>
                <NavLink to='/login' activeClassName='selected'>
                  <Icon name='user circle' size='large' color='grey' />
                  <span>登录</span>
                </NavLink>
              </li>
            </ul>
          </Grid.Column>
          <Grid.Column width={14}>
            <FM />
            {PetalRoutes}
          </Grid.Column>
          <footer className='petalControl'>
            <Icon name='window minimize' size='large' color='yellow' link className='windowMinimize' onClick={this.handleAppMinimize} />
            <Icon name='close' size='large' color='red' link onClick={this.handleAppClose} />
            <Icon name='setting' size='large' color='grey' link />
          </footer>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Container
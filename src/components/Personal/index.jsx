'use strict'

import React, { Component } from 'react'
import { Grid, Menu } from 'semantic-ui-react'
import { NavLink, Route } from 'react-router-dom'

import Recent from './Recent/index.jsx'
import RedHeart from './RedHeart/index.jsx'
import Trash from './Trash/index.jsx'
import './index.scss'

class Personal extends Component {
  componentDidMount() {
    document.querySelector('.fmRegion').style.display = 'none'
  }

  componentWillUnmount() {
    if (this.props.history.location.pathname === '/') {
      document.querySelector('.fmRegion').style.display = 'block'
    }
  }

  render() {
    const { match } = this.props

    return (
      <article className='personal'>
        <Grid>
          <Grid.Row>
            <Grid.Column width={5}>
              <Menu pointing secondary vertical>
                <NavLink
                  to={`${match.url}/recent`}
                  className='item'>
                  最近播放
                </NavLink>
                <NavLink
                  to={`${match.url}/redHeart`}
                  className='item'>
                  红心列表
                </NavLink>
                <NavLink
                  to={`${match.url}/trash`}
                  className='item'>
                  不再播放
                </NavLink>
              </Menu>
            </Grid.Column>
            <Grid.Column width={11} className='songlist'>
              <Route path={`${match.url}/recent`} component={Recent} />
              <Route path={`${match.url}/redHeart`} component={RedHeart} />
              <Route path={`${match.url}/trash`} component={Trash} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </article>
    )
  }
}

export default Personal
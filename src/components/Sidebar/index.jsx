'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon, Image } from 'semantic-ui-react'
import { NavLink, withRouter } from 'react-router-dom'

import { authLoad } from '../../actions/auth/apis'
import { redHeartListGET } from '../../actions/fm/apis'
import './index.scss'

class Sidebar extends Component {
  componentDidMount() {
    this.props.handleAuthLoad()
  }

  render() {
    const { _id, userToken } = this.props

    return (
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
          {_id === 0 ?
            <NavLink to='/login' activeClassName='selected'>
              <Icon name='user circle' size='large' color='grey' />
              <span>登录</span>
            </NavLink> :
            <Image src={'https://img3.doubanio.com/icon/ul' + userToken.douban_user_id + '-2.jpg'} avatar className='userAvatar' />
          }
        </li>
      </ul>
    )
  }
}

Sidebar.PropTypes = {
  handleAuthLoad: PropTypes.func.isRequired,
  _id: PropTypes.number.isRequired,
  userToken: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    _id: state.authReducer._id,
    userToken: state.authReducer.userToken
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleAuthLoad: () => dispatch(authLoad())
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar))


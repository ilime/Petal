'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon, Image } from 'semantic-ui-react'
import { Link, NavLink, withRouter } from 'react-router-dom'

import { authLoad } from '../../actions/auth/apis'
import { playlistGET } from '../../actions/fm/apis'

class Sidebar extends Component {
  componentDidMount() {
    this.props.handleAuthLoad()
  }

  render() {
    const { _id, userToken, icon } = this.props

    return (
      <ul className='navigation'>
        <li>
          <NavLink exact to='/' activeClassName='selected'>
            <Icon name='leaf' size='large' color='grey' />
            <span>I'mFM</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/read' activeClassName='selected'>
            <Icon name='book' size='large' color='grey' />
            <span>读书</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/movie' activeClassName='selected'>
            <Icon name='video' size='large' color='grey' />
            <span>电影</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/music' activeClassName='selected'>
            <Icon name='music' size='large' color='grey' />
            <span>音乐</span>
          </NavLink>
        </li>
        <li id='logIn'>
          {_id === 0 ?
            <NavLink to='/login' activeClassName='selected'>
              <Icon name='user circle' size='large' color='grey' />
              <span>登录</span>
            </NavLink> :
            <Link to='/personal/recent'>
              <Image src={icon} avatar className='userAvatar' />
            </Link>
          }
        </li>
      </ul>
    )
  }
}

Sidebar.PropTypes = {
  handleAuthLoad: PropTypes.func.isRequired,
  _id: PropTypes.number.isRequired,
  userToken: PropTypes.object.isRequired,
  icon: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    _id: state.authReducer._id,
    userToken: state.authReducer.userToken,
    icon: state.authReducer.userInfo.icon
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


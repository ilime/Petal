import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon, Image } from 'semantic-ui-react'
import { Link, NavLink, withRouter } from 'react-router-dom'

export class Sidebar extends Component {
  render() {
    const { _id, icon } = this.props

    return (
      <ul className='navigation'>
        <li>
          <NavLink exact to='/' activeClassName='selected'>
            <Icon name='leaf' size='large' color='grey' />
            <span>I'mFM</span>
          </NavLink>
        </li>
        <li id='logIn'>
          {_id === 0 ?
            <NavLink to='/login' activeClassName='selected'>
              <Icon name='user circle' size='large' color='grey' />
              <span>登录</span>
            </NavLink> :
            <Link to='/personal'>
              <Image src={icon} avatar className='userAvatar' />
            </Link>
          }
        </li>
      </ul>
    )
  }
}

Sidebar.propTypes = {
  _id: PropTypes.number.isRequired,
  icon: PropTypes.string
}

const mapStateToProps = state => {
  return {
    _id: state.authReducer._id,
    icon: state.authReducer.userInfo.icon
  }
}

export default withRouter(connect(
  mapStateToProps,
  null
)(Sidebar))

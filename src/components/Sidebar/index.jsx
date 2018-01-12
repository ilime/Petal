import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon, Image } from 'semantic-ui-react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { appMinimize, appQuit } from '../../helper/electron'

export class Sidebar extends Component {
  render() {
    const { _id, icon } = this.props

    return (
      <nav className="petal-sidebar">
        <section className="petal-app-control">
          <div>
            <span className='quit' onClick={appQuit}></span>
          </div>
          <div>
            <span className='hide' onClick={appMinimize}></span>
          </div>
        </section>
        <ul className='petal-sidebar-itemlist'>
          <li>
            <NavLink exact to='/' activeClassName='selected'>
              <Icon name='leaf' size='large' color='grey' />
            </NavLink>
          </li>
          <li>
            <NavLink exact to='/pattern' activeClassName='selected'>
              <Icon name='options' size='large' color='grey' />
            </NavLink>
          </li>
          <li>
            <NavLink exact to='/setting' activeClassName='selected'>
              <Icon name='setting' size='large' color='grey' />
            </NavLink>
          </li>
          <li className="auth">
            {_id === 0 ?
              <NavLink to='/login' activeClassName='selected'>
                <Icon name='spy' size='large' color='grey' />
              </NavLink> :
              <Link to='/personal'>
                <Image src={icon} avatar className='userAvatar' />
              </Link>
            }
          </li>
        </ul>
      </nav>
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

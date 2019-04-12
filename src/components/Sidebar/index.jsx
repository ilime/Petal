import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon, Image } from 'semantic-ui-react'
import { NavLink, withRouter } from 'react-router-dom'
import { appMinimize, appQuit } from '../../helper/electron'

export class Sidebar extends Component {
  render() {
    const { _id, avatar } = this.props

    return (
      <nav className="petal-sidebar">
        <section className="petal-app-control">
          <div>
            <span className="quit" onClick={appQuit} title="关闭" />
          </div>
          <div>
            <span className="hide" onClick={appMinimize} title="最小化" />
          </div>
        </section>
        <ul className="petal-sidebar-itemlist">
          <li>
            <NavLink exact to="/" activeClassName="selected">
              <Icon name="leaf" size="large" color="grey" />
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/pattern" activeClassName="selected">
              <Icon name="options" size="large" color="grey" />
            </NavLink>
          </li>
          {_id === 1 && (
            <li>
              <NavLink exact to="/sheet" activeClassName="selected">
                <Icon name="lab" size="large" color="grey" />
              </NavLink>
            </li>
          )}
          {_id === 1 && (
            <li>
              <NavLink exact to="/redHeartList" activeClassName="selected">
                <Icon name="heart outline" size="large" color="grey" />
              </NavLink>
            </li>
          )}
          {_id === 1 && (
            <li>
              <NavLink exact to="/recentList" activeClassName="selected">
                <Icon name="history" size="large" color="grey" />
              </NavLink>
            </li>
          )}
          {_id === 1 && (
            <li>
              <NavLink exact to="/trashList" activeClassName="selected">
                <Icon name="trash alternate outline" size="large" color="grey" />
              </NavLink>
            </li>
          )}
          <li>
            <NavLink exact to="/setting" activeClassName="selected">
              <Icon name="setting" size="large" color="grey" />
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/about" activeClassName="selected">
              <Icon name="idea" size="large" color="grey" />
            </NavLink>
          </li>
          <li className="auth">
            {_id === 0 ? (
              <NavLink to="/login" activeClassName="selected">
                <Icon name="user circle" size="large" color="grey" />
              </NavLink>
            ) : (
              <NavLink to="/personal" activeClassName="selected">
                <Image src={avatar} avatar />
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    )
  }
}

Sidebar.propTypes = {
  _id: PropTypes.number.isRequired,
  avatar: PropTypes.string
}

const mapStateToProps = state => {
  return {
    _id: state.authReducer._id,
    avatar: state.authReducer.userInfo.icon
  }
}

export default withRouter(connect(mapStateToProps, null)(Sidebar))

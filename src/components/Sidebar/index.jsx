import { Icon, Image, Menu } from 'semantic-ui-react'
import { NavLink, withRouter } from 'react-router-dom'
import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class Sidebar extends Component {
  render() {
    const { _id, avatar, hideAbout } = this.props

    return (
      <Menu className="petal-sidebar" vertical icon secondary pointing>
        <Menu.Item as={NavLink} exact to="/" activeClassName="active">
          <Icon name="leaf" size="large" color="grey" />
        </Menu.Item>
        <Menu.Item as={NavLink} exact to="/pattern" activeClassName="active">
          <Icon name="options" size="large" color="grey" />
        </Menu.Item>
        {_id === 1 && (
          <Menu.Item as={NavLink} exact to="/sheet" activeClassName="active">
            <Icon name="lab" size="large" color="grey" />
          </Menu.Item>
        )}
        {_id === 1 && (
          <Menu.Item as={NavLink} exact to="/redHeartList" activeClassName="active">
            <Icon name="heart outline" size="large" color="grey" />
          </Menu.Item>
        )}
        {_id === 1 && (
          <Menu.Item as={NavLink} exact to="/recentList" activeClassName="active">
            <Icon name="history" size="large" color="grey" />
          </Menu.Item>
        )}
        {_id === 1 && (
          <Menu.Item as={NavLink} exact to="/trashList" activeClassName="active">
            <Icon name="trash alternate outline" size="large" color="grey" />
          </Menu.Item>
        )}
        <Menu.Item as={NavLink} exact to="/setting" activeClassName="active">
          <Icon name="setting" size="large" color="grey" />
        </Menu.Item>
        {!hideAbout && (
          <Menu.Item as={NavLink} exact to="/about" activeClassName="active">
            <Icon name="question circle outline" size="large" color="grey" />
          </Menu.Item>
        )}
        {_id === 0 ? (
          <Menu.Item as={NavLink} to="/login" activeClassName="active" id="auth">
            <Icon name="user circle" size="large" color="grey" />
          </Menu.Item>
        ) : (
          <Menu.Item as={NavLink} to="/personal" activeClassName="active" id="auth">
            <Image src={avatar} avatar />
          </Menu.Item>
        )}
      </Menu>
    )
  }
}

Sidebar.propTypes = {
  _id: PropTypes.number.isRequired,
  avatar: PropTypes.string,
  hideAbout: PropTypes.bool
}

const mapStateToProps = state => ({
  _id: state.authReducer._id,
  avatar: state.authReducer.userInfo.icon,
  hideAbout: state.settingReducer.hideAbout
})

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Sidebar)
)

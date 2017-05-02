'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { authRemove } from '../../actions/auth/apis'

class Main extends Component {
  handleAuthRemove = () => {
    this.props.handleAuthRemove()
    this.props.handleClose()
  }

  render() {
    const { _id } = this.props

    return (
      <div className='petalSettingMain'>
        {_id === 1 && <div>
          <Menu pointing secondary>
            <Menu.Item name='账号' active />
          </Menu>
          <Button content='退出登录'
                  icon='sign out'
                  labelPosition='left' 
                  negative
                  onClick={this.handleAuthRemove} />
        </div>}

        <Menu pointing secondary>
          <Menu.Item name='一般' active />
        </Menu>
      </div>
    )
  }
}

Main.PropTypes = {
  _id: PropTypes.number.isRequired,
  handleAuthRemove: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    _id: state.authReducer._id
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleAuthRemove: () => authRemove(dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
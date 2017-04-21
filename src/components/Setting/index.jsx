'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, Header, Button, Icon } from 'semantic-ui-react'

import { authRemove } from '../../actions/auth/apis'

class Setting extends Component {
  handleAuthRemove = () => {
    this.props.handleAuthRemove()
    this.props.handleClose()
  }

  render() {
    const { _id } = this.props

    return (
      <Modal
        open={this.props.open}
        basic
        size='small'
      >
        <Header icon='setting' content='设置' />
        <Modal.Content>
        </Modal.Content>
        <Modal.Actions>
          {_id === 1 && <Button color='red' inverted onClick={this.handleAuthRemove}>登出账号</Button>}
          <Button color='green' onClick={this.props.handleClose} inverted>
            <Icon name='checkmark' /> 保存并关闭
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

Setting.PropTypes = {
  _id: PropTypes.number.isRequired,
  handleAuthRemove: PropTypes.func.isRequired
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
)(Setting)
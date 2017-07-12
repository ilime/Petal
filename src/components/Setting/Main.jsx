import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { authRemove } from '../../actions/auth/apis'
import { settingStore } from '../../actions/setting/apis'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      volume: this.props.audioVolumeProgress
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ volume: nextProps.audioVolumeProgress })
  }

  handleAuthRemove = () => {
    this.props.handleAuthRemove(() => this.props.history.push('/login'))
    this.props.handleClose()
  }

  reset = () => {
    this.setState({
      volume: this.props.audioVolumeProgress
    })
  }

  handleResetAndClose = () => {
    this.reset()
    this.props.handleClose()
  }

  handleVolumeUp = () => {
    const { volume } = this.state
    if (volume === 100) { return }
    this.setState({ volume: volume + 10 })
  }

  handleVolumeDown = () => {
    const { volume } = this.state
    if (volume === 0) { return }
    this.setState({ volume: volume - 10 })
  }

  handleSettingStore = () => {
    const { volume } = this.state
    let pin = this.progressToPin(volume)
    if (pin !== -1) {
      settingStore(volume, pin)
    }
    this.handleResetAndClose()
  }

  progressToPin = progress => {
    switch (progress) {
      case 0:
        return -10
      case 10:
        return 16
      case 20:
        return 23
      case 30:
        return 39
      case 40:
        return 56
      case 50:
        return 72
      case 60:
        return 89
      case 70:
        return 106
      case 80:
        return 122
      case 90:
        return 138
      case 100:
        return 165
      default:
        return -1
    }
  }

  render() {
    const { _id } = this.props
    const { volume } = this.state

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
            size='tiny'
            onClick={this.handleAuthRemove} />
        </div>}

        <Menu pointing secondary>
          <Menu.Item name='一般行为' active />
        </Menu>
        <div className='settingItem'>
          <div className='label'>默认音量: </div>
          <div className='content'>
            <Button.Group size='mini'>
              <Button icon='minus' onClick={this.handleVolumeDown} />
              <Button>{volume + '%'}</Button>
              <Button icon='plus' onClick={this.handleVolumeUp} />
            </Button.Group>
          </div>
        </div>
        <Button content='关闭' floated='right' size='tiny' onClick={this.handleResetAndClose} />
        <Button content='保存并关闭' title='重启后生效' primary floated='right' size='tiny' onClick={this.handleSettingStore} />
      </div>
    )
  }
}

Main.PropTypes = {
  _id: PropTypes.number.isRequired,
  handleAuthRemove: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  audioVolumeProgress: PropTypes.number.isRequired
}

const mapStateToProps = state => {
  return {
    _id: state.authReducer._id,
    audioVolumeProgress: state.settingReducer.audioVolumeProgress
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleAuthRemove: callback => authRemove(dispatch, callback)
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Main))
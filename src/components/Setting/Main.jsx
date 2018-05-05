import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Header, Message, Button, Checkbox } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { settingSaveSuccessReset } from '../../actions/setting/actions'
import { settingStore } from '../../actions/setting/apis'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      volume: this.props.audioVolume,
      openWithPlaying: this.props.settingOpenWithPlaying
    }
  }

  componentWillUnmount() {
    this.props.handleSaveSuccessReset()
  }

  handleVolumeUp = () => {
    const { volume } = this.state
    if (volume === 100) {
      return
    }
    this.setState({ volume: volume + 10 })
  }

  handleVolumeDown = () => {
    const { volume } = this.state
    if (volume === 0) {
      return
    }
    this.setState({ volume: volume - 10 })
  }

  handleOpenWithPlayingState = () => {
    this.setState({
      openWithPlaying: !this.state.openWithPlaying
    })
  }

  handleSettingStore = () => {
    this.props.handleSettingStore(this.state)
  }

  render() {
    const { saveSuccess } = this.props
    const { volume, openWithPlaying } = this.state

    return (
      <div className="petal-setting-main">
        <Header as="h5">默认音量: </Header>
        <Button.Group size="mini">
          <Button icon="minus" onClick={this.handleVolumeDown} />
          <Button>{volume + '%'}</Button>
          <Button icon="plus" onClick={this.handleVolumeUp} />
        </Button.Group>
        <Header as="h5">其他设置: </Header>
        <div>
          <Checkbox
            label="打开后自动播放"
            onClick={this.handleOpenWithPlayingState}
            checked={openWithPlaying}
          />
        </div>
        {saveSuccess && (
          <Message
            size="small"
            positive
            onDismiss={this.props.handleSaveSuccessReset}
          >
            保存成功
          </Message>
        )}
        <Button
          className="save"
          content="保存"
          fluid
          color="green"
          size="tiny"
          onClick={this.handleSettingStore}
        />
      </div>
    )
  }
}

Main.propTypes = {
  audioVolume: PropTypes.number.isRequired,
  saveSuccess: PropTypes.bool,
  handleSettingStore: PropTypes.func,
  handleSaveSuccessReset: PropTypes.func,
  settingOpenWithPlaying: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    saveSuccess: state.settingReducer.saveSuccess,
    audioVolume: state.settingReducer.volume,
    settingOpenWithPlaying: state.settingReducer.openWithPlaying
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSaveSuccessReset: () => dispatch(settingSaveSuccessReset),
    handleSettingStore: state => dispatch(settingStore(state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

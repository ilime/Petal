import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Header, Message, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { settingSaveSuccessReset } from '../../actions/setting/actions'
import { settingStore } from '../../actions/setting/apis'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      volume: this.props.audioVolume
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

  handleSettingStore = () => {
    const { volume } = this.state
    this.props.handleSettingStore(volume)
  }

  render() {
    const { saveSuccess } = this.props
    const { volume } = this.state

    return (
      <div className="petal-setting-main">
        <Header as="h5">默认音量: </Header>
        <Button.Group size="mini">
          <Button icon="minus" onClick={this.handleVolumeDown} />
          <Button>{volume + '%'}</Button>
          <Button icon="plus" onClick={this.handleVolumeUp} />
        </Button.Group>
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
  handleSaveSuccessReset: PropTypes.func
}

const mapStateToProps = state => {
  return {
    saveSuccess: state.settingReducer.saveSuccess,
    audioVolume: state.settingReducer.volume
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSaveSuccessReset: () => dispatch(settingSaveSuccessReset),
    handleSettingStore: volume => dispatch(settingStore(volume))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

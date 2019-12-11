import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Checkbox, Header, Message, Select } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { settingSaveSuccessReset } from '../../actions/setting/actions'
import { settingStore } from '../../actions/setting/apis'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      volume: this.props.audioVolume,
      openWithPlaying: this.props.settingOpenWithPlaying,
      restoreLastWinPos: this.props.settingRestoreLastWinPos,
      hideAbout: this.props.hideAbout,
      openPattern: this.props.openPattern,
      compactStatusBar: this.props.compactStatusBar
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

  handleRestorelastWinPosState = () => {
    this.setState({
      restoreLastWinPos: !this.state.restoreLastWinPos
    })
  }

  handleHideAbout = () => {
    this.setState({
      hideAbout: !this.state.hideAbout
    })
  }

  handleSelectInitialPattern = (e, data) => {
    this.setState({
      openPattern: data.value
    })
  }

  handleCompactStausBar = () => {
    const val = !this.state.compactStatusBar
    this.setState({
      compactStatusBar: val
    })
  }

  handleSettingStore = () => {
    this.props.handleSettingStore(this.state)
  }

  render() {
    const { _id, saveSuccess } = this.props
    const { volume, openWithPlaying, restoreLastWinPos, hideAbout, openPattern, compactStatusBar } = this.state

    const patternOptions = [
      { key: 'select', text: '豆瓣精选 MHz', value: 'select' },
      { key: 'personal', text: '我的私人 MHz', value: 'personal' }
    ]

    return (
      <div className="petal-setting-main">
        <Header as="h5">默认音量: </Header>
        <Button.Group size="mini">
          <Button icon="minus" onClick={this.handleVolumeDown} />
          <Button>{volume + '%'}</Button>
          <Button icon="plus" onClick={this.handleVolumeUp} />
        </Button.Group>
        <Header as="h5">播放设置：</Header>
        <div>
          <div>
            <Checkbox label="打开后自动播放" onChange={this.handleOpenWithPlayingState} checked={openWithPlaying} />
          </div>
          {_id === 1 && (
            <div>
              <div style={{ margin: '8px 0' }}>初始模式：</div>
              <Select value={openPattern} options={patternOptions} onChange={this.handleSelectInitialPattern} />
            </div>
          )}
        </div>
        <Header as="h5">其他设置: </Header>
        <div>
          <div>
            <Checkbox
              label="记住上次窗口位置"
              onChange={this.handleRestorelastWinPosState}
              checked={restoreLastWinPos}
            />
          </div>
          <div>
            <Checkbox label="隐藏关于界面" onChange={this.handleHideAbout} checked={hideAbout} />
          </div>
          <div>
            <Checkbox label="精简状态栏" onChange={this.handleCompactStausBar} checked={compactStatusBar} />
          </div>
        </div>
        {saveSuccess && (
          <Message size="small" positive onDismiss={this.props.handleSaveSuccessReset}>
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
  _id: PropTypes.number.isRequired,
  audioVolume: PropTypes.number.isRequired,
  saveSuccess: PropTypes.bool,
  handleSettingStore: PropTypes.func,
  handleSaveSuccessReset: PropTypes.func,
  settingOpenWithPlaying: PropTypes.bool,
  settingRestoreLastWinPos: PropTypes.bool,
  hideAbout: PropTypes.bool,
  openPattern: PropTypes.string,
  compactStatusBar: PropTypes.bool
}

const mapStateToProps = state => ({
  _id: state.authReducer._id,
  saveSuccess: state.settingReducer.saveSuccess,
  audioVolume: state.settingReducer.volume,
  settingOpenWithPlaying: state.settingReducer.openWithPlaying,
  settingRestoreLastWinPos: state.settingReducer.restoreLastWinPos,
  hideAbout: state.settingReducer.hideAbout,
  openPattern: state.settingReducer.openPattern,
  compactStatusBar: state.settingReducer.compactStatusBar
})

const mapDispatchToProps = dispatch => ({
  handleSaveSuccessReset: () => dispatch(settingSaveSuccessReset()),
  handleSettingStore: state => dispatch(settingStore(state))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

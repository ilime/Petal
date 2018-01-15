import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon, Header, Button, Image } from 'semantic-ui-react'
import { selectPattern, recentPattern, redheartPattern, appChannelSet } from '../../actions/fm/actions'
import { playlistGET } from '../../actions/fm/apis'
import { rendererProcessSend } from '../../helper/electron'

class Pattern extends Component {
  constructor(props) {
    super(props)
    this._patterns = new Map([
      ['recent', () => {
        props.switchToRecent()
      }],
      ['redheart', () => {
        props.switchToRedheart()
      }]
    ])
  }

  componentDidMount() {
    document.querySelector('.fm-region').style.display = 'none'
  }

  componentWillUnmount() {
    if (this.props.history.location.pathname === '/') {
      document.querySelector('.fm-region').style.display = 'flex'
    }
  }

  /**
   * Handle switch pattern
   * 
   * 1. select
   * 2. recent
   * 3. redheart
   * 
   * @memberof Pattern
   */
  handleSwitchPattern = name => {
    const { pattern } = this.props

    if (pattern !== name) {
      this._patterns.get(name)()
      rendererProcessSend('touchBarResetPause')
      rendererProcessSend('patternSwitch', name)
    }
    this.props.history.push('/')
  }

  handleAppChannelSetWrapper = id => {
    if (this.props.channelId === id) {
      return
    } else {
      this.props.handleAppChannelSet(id)
      this.props.getPlaylist('new')
    }
    this.props.history.push('/')
  }

  render() {
    const { _id, avatar, pattern, channelId, channels } = this.props

    return (
      <article className="petal-pattern">
        <Header as="h2">兆赫</Header>
        <div className="default-MHz">
          <Button basic className={(pattern === 'select' && channelId === -10) ? 'selected' : ''} onClick={() => this.handleAppChannelSetWrapper(-10)}><Icon name='leaf' /> 豆瓣精选 MHz</Button>
          {_id === 1 && <Button basic className={pattern === 'redheart' ? 'selected' : ''} onClick={() => this.handleSwitchPattern('redheart')}><Icon name='heart' /> 红心</Button>}
          {_id === 1 && <Button basic className={pattern === 'recent' ? 'selected' : ''} onClick={() => this.handleSwitchPattern('recent')}><Icon name='history' /> 最近收听</Button>}
          {_id === 1 && <Button basic className={(pattern === 'select' && channelId === 0) ? 'selected' : ''} onClick={() => this.handleAppChannelSetWrapper(0)}><Image src={avatar} avatar /> 我的私人 MHz</Button>}
        </div>
        {channels.length > 0 && channels.map(channel => {
          return <div key={channel.group_name} style={{ marginTop: '10px' }}>
            <Header as='h5' dividing>{channel.group_name}</Header>
            {channel.chls.length > 0 && channel.chls.map(c => {
              return <Button key={c.name} basic className={(pattern === 'select' && channelId === c.id) ? 'selected' : ''} onClick={() => this.handleAppChannelSetWrapper(c.id)} title={c.intro}>{c.name}</Button>
            })}
          </div>
        })}
      </article >
    )
  }
}

Pattern.propTypes = {
  _id: PropTypes.number.isRequired,
  avatar: PropTypes.string,
  pattern: PropTypes.string.isRequired,
  getPlaylist: PropTypes.func.isRequired,
  channelId: PropTypes.number,
  channels: PropTypes.array,
  handleAppChannelSet: PropTypes.func
}

const mapStateToProps = state => {
  return {
    _id: state.authReducer._id,
    avatar: state.authReducer.userInfo.icon,
    pattern: state.fmReducer.pattern,
    channelId: state.fmReducer.channelId,
    channels: state.fmReducer.channels
  }
}

const mapDispatchToProps = dispatch => {
  return {
    switchToSelect: () => dispatch(selectPattern),
    switchToRecent: () => dispatch(recentPattern),
    switchToRedheart: () => dispatch(redheartPattern),
    getPlaylist: type => dispatch(playlistGET(type)),
    handleAppChannelSet: id => dispatch(appChannelSet(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pattern)

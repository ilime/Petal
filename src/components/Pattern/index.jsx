import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon, Header, Button, Image, Popup } from 'semantic-ui-react'
import {
  selectPattern,
  recentPattern,
  redheartPattern,
  appChannelSet
} from '../../actions/fm/actions'
import { playlistGET, songLyricGET } from '../../actions/fm/apis'
import { rendererProcessSend } from '../../helper/electron'

class Pattern extends Component {
  constructor(props) {
    super(props)
    this.state = {
      songlistEmpty: ''
    }
    this._patterns = new Map([
      [
        'recent',
        () => {
          props.switchToRecent()
        }
      ],
      [
        'redheart',
        () => {
          props.switchToRedheart()
        }
      ]
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

  handleLyricUpdated = () => {
    if (this.props.lyricGlobalDisplay) {
      this.props.handleSongLyricGET()
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
    const { pattern, recentSong, redheartSong } = this.props

    if (name === 'recent' && recentSong.length === 0) return
    if (name === 'redheart' && redheartSong.length === 0) return

    if (pattern !== name) {
      this._patterns.get(name)()
      this.handleLyricUpdated()
      rendererProcessSend('touchBarResetPause')
      rendererProcessSend('patternSwitch', name)
    }
    this.props.history.push('/')
  }

  handleAppChannelSetWrapper = id => {
    if (!(this.props.channelId === id && this.props.pattern === 'select')) {
      this.props.handleAppChannelSet(id)
      this.props.getPlaylist('new', this.handleLyricUpdated)
      rendererProcessSend('touchBarResetPause')
      rendererProcessSend('patternSwitch', 'select')
    }
    this.props.history.push('/')
  }

  handleOpen = pattern => {
    const { recentSong, redheartSong } = this.props
    if (
      (pattern === 'recent' && recentSong.length === 0) ||
      (pattern === 'redheart' && redheartSong.length === 0)
    ) {
      this.setState({ songlistEmpty: pattern })

      this.timeout = setTimeout(() => {
        this.setState({ songlistEmpty: '' })
      }, 3000)
    }
  }

  handleClose = () => {
    this.setState({ songlistEmpty: '' })
    clearTimeout(this.timeout)
  }

  render() {
    const { _id, avatar, pattern, channelId, channels } = this.props

    return (
      <article className="petal-pattern">
        <Header as="h2">兆赫</Header>
        <div className="default-MHz">
          <Button
            basic
            className={
              pattern === 'select' && channelId === -10 ? 'selected' : ''
            }
            onClick={() => this.handleAppChannelSetWrapper(-10)}
          >
            <Icon name="leaf" />
            豆瓣精选 MHz
          </Button>
          {_id === 1 && (
            <Popup
              trigger={
                <Button
                  basic
                  className={pattern === 'redheart' ? 'selected' : ''}
                  onClick={() => this.handleSwitchPattern('redheart')}
                >
                  <Icon name="heart" />
                  红心
                </Button>
              }
              content={'当前红心为空。'}
              on="hover"
              open={this.state.songlistEmpty === 'redheart'}
              onClose={this.handleClose}
              onOpen={() => this.handleOpen('redheart')}
              position="top left"
            />
          )}
          {_id === 1 && (
            <Popup
              trigger={
                <Button
                  basic
                  className={pattern === 'recent' ? 'selected' : ''}
                  onClick={() => this.handleSwitchPattern('recent')}
                >
                  <Icon name="history" />
                  最近收听
                </Button>
              }
              content={'当前最近收听为空。'}
              on="hover"
              open={this.state.songlistEmpty === 'recent'}
              onClose={this.handleClose}
              onOpen={() => this.handleOpen('recent')}
              position="top left"
            />
          )}
          {_id === 1 && (
            <Button
              basic
              className={
                pattern === 'select' && channelId === 0 ? 'selected' : ''
              }
              onClick={() => this.handleAppChannelSetWrapper(0)}
            >
              <Image src={avatar} avatar />
              我的私人 MHz
            </Button>
          )}
        </div>
        {channels.length > 0 &&
          channels.map(channel => {
            if (channel.chls.length > 0) {
              return (
                <div key={channel.group_name} style={{ marginTop: '10px' }}>
                  <Header as="h5" dividing>
                    {channel.group_name}
                  </Header>
                  {channel.chls.map(c => {
                    return (
                      <Button
                        key={c.name}
                        basic
                        className={
                          pattern === 'select' && channelId === c.id
                            ? 'selected'
                            : ''
                        }
                        onClick={() => this.handleAppChannelSetWrapper(c.id)}
                        title={c.intro}
                      >
                        <Image src={c.cover} avatar />
                        {c.name}
                      </Button>
                    )
                  })}
                </div>
              )
            }
          })}
      </article>
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
  recentSong: PropTypes.array,
  redheartSong: PropTypes.array,
  handleAppChannelSet: PropTypes.func,
  lyricGlobalDisplay: PropTypes.bool,
  handleSongLyricGET: PropTypes.func
}

const mapStateToProps = state => {
  return {
    _id: state.authReducer._id,
    avatar: state.authReducer.userInfo.icon,
    pattern: state.fmReducer.pattern,
    channelId: state.fmReducer.channelId,
    channels: state.fmReducer.channels,
    recentSong: state.fmReducer.recent.songs,
    redheartSong: state.fmReducer.redheart,
    lyricGlobalDisplay: state.fmReducer.lyricDisplay
  }
}

const mapDispatchToProps = dispatch => {
  return {
    switchToSelect: () => dispatch(selectPattern),
    switchToRecent: () => dispatch(recentPattern),
    switchToRedheart: () => dispatch(redheartPattern),
    getPlaylist: (type, callback) => dispatch(playlistGET(type, callback)),
    handleAppChannelSet: id => dispatch(appChannelSet(id)),
    handleSongLyricGET: () => dispatch(songLyricGET())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pattern)

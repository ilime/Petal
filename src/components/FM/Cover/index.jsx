'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dimmer, Image, Icon, Popup } from 'semantic-ui-react'

import { playlistGET } from '../../../actions/fm/apis'
import './index.scss'

class Cover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: true,
      cover: '',
      love: 'white',
      isLoginPopup: false
    }
  }

  componentDidMount() {
    document.querySelector('#_audio').addEventListener(
      'ended',
      () => {
        this.setState({ love: 'white' })
      })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.song !== this.props.song) {
      const { song } = nextProps
      this.setState({
        playing: true,
        cover: song[0].picture
      })
    }
    if (this.props._id === 1 && nextProps._id === 0) {
      this.setState({ love: 'white' })
    }
  }

  handleControlShow = () => this.setState({ controlPanelActive: true })
  handleControlHide = () => this.setState({ controlPanelActive: false })

  handleAudioPlay = () => {
    const audio = document.querySelector('#_audio')
    if (audio.paused) {
      audio.play()
      this.setState({ playing: true })
    } else {
      audio.pause()
      this.setState({ playing: false })
    }
  }

  handleSkipSong = () => {
    this.props.getPlayList('skip')
  }

  handleTrashSong = () => {
    this.props.getPlayList('trash')
  }

  handleLoveSong = () => {
    if (this.props._id === 0) { return }
    const { love } = this.state
    if (love === 'white') {
      this.props.getPlayList('rate')
      this.setState({ love: 'red' })
    }
    if (love === 'red') {
      this.props.getPlayList('unrate')
      this.setState({ love: 'white' })
    }
  }

  handleLoveIsLoginPopupOpen = () => {
    if (this.props._id === 0) {
      this.setState({ isLoginPopup: true })
      this.PopupTimeout = setTimeout(() => {
        this.setState({ isLoginPopup: false })
      }, 3000)
    }
  }

  handleLoveIsLoginPopupClose = () => {
    this.setState({ isLoginPopup: false })
    clearTimeout(this.PopupTimeout)
  }

  render() {
    const { controlPanelActive, playing, cover, love, isLoginPopup } = this.state
    const controlPanel = (
      <div>
        <div className='musicPause' onClick={this.handleAudioPlay}>
          <Icon name={playing ? 'pause' : 'play'} size='large' />
        </div>
        <div className='heartTrashForward'>
          <Popup
            trigger={<Icon name='heart' size='big' style={{ color: love }} onClick={this.handleLoveSong} />}
            content='想要喜欢歌曲，请先登录'
            position='bottom center'
            on='click'
            open={isLoginPopup}
            onOpen={this.handleLoveIsLoginPopupOpen}
            onClose={this.handleLoveIsLoginPopupClose} />
          <Icon name='trash' size='big' onClick={this.handleTrashSong} />
          <Icon name='step forward' size='big' onClick={this.handleSkipSong} />
        </div>
      </div>
    )

    return (
      <Dimmer.Dimmable
        className='cover'
        as={Image}
        blurring={true}
        dimmed={controlPanelActive}
        dimmer={{ active: controlPanelActive, content: controlPanel }}
        onMouseEnter={this.handleControlShow}
        onMouseLeave={this.handleControlHide}
        src={cover}
        size='medium'
        shape='rounded'
      />
    )
  }
}

Cover.propTypes = {
  song: PropTypes.array.isRequired,
  getPlayList: PropTypes.func.isRequired,
  _id: PropTypes.number.isRequired
}

const mapStateToProps = state => {
  return {
    song: state.fmReducer.song,
    _id: state.authReducer._id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPlayList: (type) => dispatch(playlistGET(type))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cover)
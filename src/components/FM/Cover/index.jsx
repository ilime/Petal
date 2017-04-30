'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dimmer, Image, Icon, Popup } from 'semantic-ui-react'

import {
  fsidSet,
  recentGo, recentBack,
  redheartGo, redheartBack,
  recentIndexSet, redheartIndexSet
} from '../../../actions/fm/types'
import { playlistGET, playLog } from '../../../actions/fm/apis'
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

  componentWillReceiveProps(nextProps) {
    const { pattern, song, recentSong, recentIndex, redheartSong, redheartIndex } = nextProps

    if (pattern === 'select' && song[0] !== this.props.song[0]) {
      this.setCover(song[0])
    }

    if (pattern === 'recent' && recentIndex !== this.props.recentIndex) {
      this.setCover(recentSong[recentIndex])
      this.props.setFsid(recentSong[recentIndex].sid)
    }

    if (pattern === 'redheart' && redheartIndex !== this.props.redheartIndex) {
      this.setCover(redheartSong[redheartIndex], pattern)
      this.props.setFsid(redheartSong[redheartIndex].sid)
    }

    if (this.props._id === 1 && nextProps._id === 0) {
      this.setState({ love: 'white' })
    }
  }

  setCover = (song, pattern) => {
    this.setState({
      playing: true,
      cover: song.picture,
      love: pattern === 'redheart' ? 'red' : (song.like === 1 ? 'red' : 'white')
    })
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

  handleSongForward = () => {
    const { pattern, fsid, recentIndex, recentSong, redheartIndex, redheartSong,
      handlePlayLog, handleRecentGo, handleRedheartGo, handleRecentIndexSet,
      handleRedheartIndexSet } = this.props

    if (pattern === 'recent') {
      handlePlayLog(fsid, 'j', 'y')
      if (recentIndex === recentSong.length - 1) {
        handleRecentIndexSet(0)
      } else {
        handleRecentGo()
      }
    }

    if (pattern === 'redheart') {
      handlePlayLog(fsid, 'j', 'h')
      if (redheartIndex === redheartSong.length - 1) {
        handleRedheartIndexSet(0)
      } else {
        handleRedheartGo()
      }
    }
  }

  handleSongBackward = () => {
    const { pattern, fsid, recentIndex, recentSong, redheartIndex, redheartSong,
      handlePlayLog, handleRecentBack, handleRedheartBack, handleRecentIndexSet,
      handleRedheartIndexSet } = this.props

    if (pattern === 'recent') {
      handlePlayLog(fsid, 'k', 'y')
      if (recentIndex === 0) {
        handleRecentIndexSet(recentSong.length - 1)
      } else {
        handleRecentBack()
      }
    }

    if (pattern === 'redheart') {
      handlePlayLog(fsid, 'k', 'h')
      if (redheartIndex === 0) {
        handleRedheartIndexSet(redheartSong.length - 1)
      } else {
        handleRedheartBack()
      }
    }
  }

  handleSkipSong = () => {
    this.props.getPlayList('skip')
  }

  handleTrashSong = () => {
    this.props.getPlayList('trash')
  }

  handleLoveSong = () => {
    const { _id, pattern, getPlayList, handlePlayLog, fsid } = this.props
    if (_id === 0) { return }
    const { love } = this.state

    if (love === 'white') {
      if (pattern === 'select') {
        getPlayList('rate')
      }
      if (pattern === 'recent') {
        handlePlayLog(fsid, 'r', 'y')
      }
      if (pattern === 'redheart') {
        handlePlayLog(fsid, 'r', 'h')
      }
      this.setState({ love: 'red' })
    }

    if (love === 'red') {
      if (pattern === 'select') {
        getPlayList('unrate')
      }
      if (pattern === 'recent') {
        handlePlayLog(fsid, 'u', 'y')
      }
      if (pattern === 'redheart') {
        handlePlayLog(fsid, 'u', 'h')
      }
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
    const { pattern } = this.props
    const { controlPanelActive, playing, cover, love, isLoginPopup } = this.state
    const controlPanel = (
      <div>
        <div className='musicPause' onClick={this.handleAudioPlay}>
          <Icon name={playing ? 'pause' : 'play'} size='large' />
        </div>
        <div className='heartTrashForward'>
          {pattern === 'select' && <div>
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
          </div>}
          {(pattern === 'recent' || pattern === 'redheart') && <div>
            <Icon name='step backward' size='big' onClick={this.handleSongBackward} />
            <Icon name='heart' size='big' style={{ color: love }} onClick={this.handleLoveSong} />
            <Icon name='step forward' size='big' onClick={this.handleSongForward} />
          </div>}
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
  pattern: PropTypes.string.isRequired,
  song: PropTypes.array.isRequired,
  recentSong: PropTypes.array,
  redheartSong: PropTypes.array.isRequired,
  recentIndex: PropTypes.number.isRequired,
  redheartIndex: PropTypes.number.isRequired,
  getPlayList: PropTypes.func.isRequired,
  _id: PropTypes.number.isRequired,
  fsid: PropTypes.string.isRequired,
  setFsid: PropTypes.func.isRequired,
  handlePlayLog: PropTypes.func.isRequired,
  handleRecentGo: PropTypes.func.isRequired,
  handleRecentBack: PropTypes.func.isRequired,
  handleRedheartGo: PropTypes.func.isRequired,
  handleRedheartBack: PropTypes.func.isRequired,
  handleRecentIndexSet: PropTypes.func.isRequired,
  handleRedheartIndexSet: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    pattern: state.fmReducer.pattern,
    song: state.fmReducer.song,
    _id: state.authReducer._id,
    recentSong: state.fmReducer.recent.songs,
    redheartSong: state.fmReducer.redheart,
    recentIndex: state.fmReducer.recentIndex,
    redheartIndex: state.fmReducer.redheartIndex,
    fsid: state.fmReducer.fsid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPlayList: (type) => dispatch(playlistGET(type)),
    setFsid: sid => dispatch(fsidSet(sid)),
    handlePlayLog: (sid, type, play_source) => dispatch(playLog(sid, type, play_source)),
    handleRecentGo: () => dispatch(recentGo),
    handleRecentBack: () => dispatch(recentBack),
    handleRedheartGo: () => dispatch(redheartGo),
    handleRedheartBack: () => dispatch(redheartBack),
    handleRecentIndexSet: index => dispatch(recentIndexSet(index)),
    handleRedheartIndexSet: index => dispatch(redheartIndexSet(index))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cover)
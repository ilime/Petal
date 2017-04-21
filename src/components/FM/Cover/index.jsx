'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dimmer, Image, Icon } from 'semantic-ui-react'

import { playlistGET } from '../../../actions/fm/apis'
import './index.scss'

class Cover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: true,
      cover: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.song !== this.props.song) {
      const { song } = nextProps
      this.setState({
        playing: true,
        cover: song[0].picture
      })
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

  render() {
    const { controlPanelActive, playing, cover } = this.state
    const controlPanel = (
      <div>
        <div className='musicPause' onClick={this.handleAudioPlay}>
          <Icon name={playing ? 'pause' : 'play'} size='large' />
        </div>
        <div className='heartTrashForward'>
          <Icon name='heart' size='big' />
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
  getPlayList: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    song: state.fmReducer.song
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
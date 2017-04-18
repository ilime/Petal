'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dimmer, Image, Icon } from 'semantic-ui-react'

import './index.scss'

class Cover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: false,
      cover: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.song !== this.props.song) {
      const { song } = nextProps
      this.setState({
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

  render() {
    const { controlPanelActive, playing, cover } = this.state
    const controlPanel = (
      <div>
        <div className='musicPause' onClick={this.handleAudioPlay}>
          <Icon name={playing ? 'pause' : 'play'} size='large' />
        </div>
        <div className='heartTrashForward'>
          <Icon name='heart' size='big' />
          <Icon name='trash' size='big' />
          <Icon name='step forward' size='big' />
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
  song: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    song: state.fmReducer.song
  }
}

export default connect(
  mapStateToProps,
  null
)(Cover)
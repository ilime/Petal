'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Progress, Icon } from 'semantic-ui-react'

import { nextSong, playlistGET } from '../../../actions/fm/apis'

import './index.scss'

class Audio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      percent: 0
    }
  }

  componentDidMount() {
    this.initAudio()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.song !== this.props.song) {
      const { song } = nextProps
      this.nextAudio(song)
    }
  }

  nextAudio = (song) => {
    const audio = document.querySelector('#_audio')
    const lyricContainer = document.querySelector('.lyric')
    const totalTime = document.querySelector('.totalTime')

    audio.src = song[0].url
    audio.currentTime = 0
    audio.onloadedmetadata = () => {
      totalTime.textContent = this.formatTime(audio.duration)
    }
    audio.play()
    lyricContainer.scrollTop = 0
  }

  initAudio = () => {
    const audio = document.querySelector('#_audio')
    const currentTime = document.querySelector('.currentTime')
    audio.volume = 0.3
    audio.addEventListener('timeupdate',
      this.updateAudioTimeAndProgress(currentTime, audio))
    audio.addEventListener('ended',
      this.endedAudio(audio))
    this.volumeSlider('.volumeBar', audio)
  }

  formatTime = (time) => {
    let min = Math.floor(time / 60)
    let sec = Math.floor(time % 60)
    return min + ':' + (sec < 10 ? '0' + sec : sec)
  }

  volumeSlider = (name, audio) => {
    let range = document.querySelector(name),
      slider = range.children[1],
      sliderWidth = slider.offsetWidth,
      mouseDown = false,
      rangeWidth,
      rangeLeft,
      volumeProgress = document.querySelector('.volumeProgress')

    range.addEventListener('mousedown', function (e) {
      rangeWidth = this.offsetWidth
      rangeLeft = this.offsetLeft
      mouseDown = true
      forbidSelect()
      updateSlider(e)
      return false
    })

    document.addEventListener('mousemove', function (e) {
      updateSlider(e)
    })

    document.addEventListener('mouseup', function () {
      mouseDown = false
      restoreSelect()
    })

    function updateSlider(e) {
      let X = e.pageX - 196
      if (mouseDown
        && X >= rangeLeft
        && X <= rangeLeft + rangeWidth) {
        slider.style.left = X - rangeLeft - sliderWidth + 'px'
        let percent = Math.round((X - rangeLeft) / rangeWidth * 100)
        volumeProgress.style.width = percent + '%'
        audio.volume = percent / 100
      }
    }

    function forbidSelect() {
      document.querySelector('body').style.userSelect = 'none'
    }
    function restoreSelect() {
      document.querySelector('body').style.userSelect = 'text'
    }
  }

  updateAudioTimeAndProgress = (currentTimeElement, audio) => {
    return () => {
      let currentTime = audio.currentTime
      currentTimeElement.textContent = this.formatTime(currentTime)
      this.setState({
        percent: currentTime / audio.duration * 100
      })
    }
  }

  endedAudio = (audio) => {
    return () => {
      if (this.props.song.length !== 1) {
        this.props.handleNextSong()
      } else {
        this.props.getPlayList('playing')
      }
    }
  }

  render() {
    const { percent } = this.state
    return (
      <div className='player'>
        <div className='songProgress'>
          <Progress percent={percent} color='green' size='tiny' />
        </div>
        <div className='st-vo'>
          <div className="startAndEnd">
            <span className='currentTime'>0:00</span>
            <span>/</span>
            <span className='totalTime'>0:00</span>
          </div>
          <div className="volume">
            <Icon name='volume down' />
            <div className='volumeBar'>
              <div className="volumeProgress"></div>
              <span className='pin'></span>
            </div>
            <Icon name='volume up' />
          </div>
        </div>
        <audio id='_audio'></audio>
      </div>
    )
  }
}

Audio.propTypes = {
  song: PropTypes.array.isRequired,
  getPlayList: PropTypes.func.isRequired,
  handleNextSong: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    song: state.fmReducer.song
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPlayList: type => dispatch(playlistGET(type)),
    handleNextSong: () => dispatch(nextSong())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Audio)
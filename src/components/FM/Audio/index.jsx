'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Progress, Icon } from 'semantic-ui-react'

import {
  recentGo, redheartGo,
  recentIndexSet, redheartIndexSet
} from '../../../actions/fm/types'
import { nextSong, playlistGET, playLog } from '../../../actions/fm/apis'

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
    const { pattern, song, type, recentSong, recentIndex, redheartSong, redheartIndex } = nextProps

    if (pattern === 'select' && song !== this.props.song) {
      if (type !== 'r' && type != 'u') {
        this.nextAudio(song[0])
      }
    }

    if (pattern === 'recent' && (recentIndex !== this.props.recentIndex || pattern !== this.props.pattern)) {
      this.nextAudio(recentSong[recentIndex])
    }

    if (pattern === 'redheart' && (redheartIndex !== this.props.redheartIndex || pattern !== this.props.pattern)) {
      this.nextAudio(redheartSong[redheartIndex])
    }
  }

  nextAudio = song => {
    const audio = document.querySelector('#_audio')
    const lyricContainer = document.querySelector('.lyric')

    audio.currentTime = 0
    audio.src = song.url
    audio.load()
    lyricContainer.scrollTop = 0
  }

  initAudio = () => {
    const audio = document.querySelector('#_audio')
    const currentTime = document.querySelector('.currentTime')
    audio.volume = this.props.audioVolumeProgress / 100
    audio.addEventListener('timeupdate',
      this.updateAudioTimeAndProgress(currentTime, audio))
    audio.addEventListener('ended',
      this.endedAudio(audio))
    audio.onloadedmetadata = () => {
      const totalTime = document.querySelector('.totalTime')
      totalTime.textContent = this.formatTime(audio.duration)
    }
    audio.oncanplaythrough = () => {
      audio.play()
    }
    this.volumeSlider('.volumeBar', audio)
  }

  formatTime = time => {
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

  endedAudio = audio => {
    return () => {
      const { pattern, fsid, recentIndex, recentSong, redheartIndex, redheartSong, handlePlayLog,
        handleRecentGo, handleRecentIndexSet, handleRedheartGo, handleRedheartIndexSet } = this.props,
        audio = document.querySelector('#_audio')

      if (pattern === 'select') {
        this.props.getPlaylist('end')
        if (this.props.song.length !== 1) {
          this.props.handleNextSong()
        } else {
          this.props.getPlaylist('playing')
        }
      }

      if (pattern === 'recent') {
        if (recentSong.length === 1) {
          audio.play()
          return
        }
        handlePlayLog(fsid, 'p', 'y')
        if (recentIndex === recentSong.length - 1) {
          handleRecentIndexSet(0)
        } else {
          handleRecentGo()
        }
      }

      if (pattern === 'redheart') {
        if (redheartSong.length === 1) {
          audio.play()
          return
        }
        handlePlayLog(fsid, 'p', 'h')
        if (redheartIndex === redheartSong.length - 1) {
          handleRedheartIndexSet(0)
        } else {
          handleRedheartGo()
        }
      }
    }
  }

  render() {
    const { audioVolumeProgress, audioVolumePin } = this.props
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
              <div className="volumeProgress" style={{ width: audioVolumeProgress + '%' }}></div>
              <span className='pin' style={{ left: audioVolumePin + 'px' }}></span>
            </div>
            <Icon name='volume up' />
          </div>
        </div>
        <audio id='_audio' preload='none'></audio>
      </div>
    )
  }
}

Audio.propTypes = {
  pattern: PropTypes.string.isRequired,
  song: PropTypes.array.isRequired,
  recentSong: PropTypes.array,
  redheartSong: PropTypes.array,
  recentIndex: PropTypes.number.isRequired,
  redheartIndex: PropTypes.number.isRequired,
  getPlaylist: PropTypes.func.isRequired,
  handleNextSong: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  fsid: PropTypes.string.isRequired,
  handlePlayLog: PropTypes.func.isRequired,
  handleRecentGo: PropTypes.func.isRequired,
  handleRedheartGo: PropTypes.func.isRequired,
  handleRecentIndexSet: PropTypes.func.isRequired,
  handleRedheartIndexSet: PropTypes.func.isRequired,
  audioVolumeProgress: PropTypes.number.isRequired,
  audioVolumePin: PropTypes.number.isRequired
}

const mapStateToProps = state => {
  return {
    pattern: state.fmReducer.pattern,
    song: state.fmReducer.song,
    type: state.fmReducer.type,
    recentSong: state.fmReducer.recent.songs,
    redheartSong: state.fmReducer.redheart,
    recentIndex: state.fmReducer.recentIndex,
    redheartIndex: state.fmReducer.redheartIndex,
    fsid: state.fmReducer.fsid,
    audioVolumeProgress: state.settingReducer.audioVolumeProgress,
    audioVolumePin: state.settingReducer.audioVolumePin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPlaylist: type => dispatch(playlistGET(type)),
    handleNextSong: () => dispatch(nextSong()),
    handlePlayLog: (sid, type, play_source) => dispatch(playLog(sid, type, play_source)),
    handleRecentGo: () => dispatch(recentGo),
    handleRedheartGo: () => dispatch(redheartGo),
    handleRecentIndexSet: index => dispatch(recentIndexSet(index)),
    handleRedheartIndexSet: index => dispatch(redheartIndexSet(index))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Audio)
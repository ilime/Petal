import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Progress, Icon } from 'semantic-ui-react'
import {
  recentGo, redheartGo,
  recentIndexSet, redheartIndexSet
} from '../../../actions/fm/types'
import { playlistGET, playLog } from '../../../actions/fm/apis'
import patternSwitch from '../../../helper/patternSwitch'

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

    if (pattern === 'select' && song !== this.props.song && type !== 'r' && type !== 'u') {
      this.nextAudio(song)
    }

    patternSwitch.bind(this)(
      this.props.pattern,
      pattern,
      recentSong,
      redheartSong,
      this.props.recentIndex,
      recentIndex,
      this.props.redheartIndex,
      redheartIndex,
      this.switchHelper
    )
  }

  switchHelper = (pattern, nextPattern) => {
    return (songs, index, nextIndex) => {
      if (nextIndex !== index || nextPattern !== pattern) {
        this.nextAudio(songs[nextIndex])
      }
    }
  }

  /**
   * Handle next song
   * This function will reset .currentTime, set song url,
   * reset lyric scrollbar to top
   * 
   * @memberof Audio
   */
  nextAudio = song => {
    const audio = document.querySelector('#_audio')

    audio.currentTime = 0
    audio.src = song.url
    audio.load()
  }

  /**
   * Init Audio
   * 
   * @memberof Audio
   */
  initAudio = () => {
    const audio = document.querySelector('#_audio')
    this.audio = audio
    const currentTime = document.querySelector('.currenttime')

    audio.addEventListener('timeupdate', this.updateAudioTimeAndProgress(currentTime, audio))
    audio.addEventListener('ended', this.endedAudio(audio))
    audio.addEventListener('loadedmetadata', () => {
      const totalTime = document.querySelector('.totaltime')
      totalTime.textContent = this.formatTime(audio.duration)
    })
    audio.addEventListener('canplaythrough', () => {
      audio.play()
    })
    this.initVolume(audio)
  }

  /**
   * Format time, the result is m:ss/m:ss
   * 
   * @memberof Audio
   * @return {string} - the formated time
   */
  formatTime = time => {
    let min = Math.floor(time / 60)
    let sec = Math.floor(time % 60)
    return min + ':' + (sec < 10 ? '0' + sec : sec)
  }

  /**
   * set the volume slider, adjust the volume
   * 
   * @memberof Audio
   */
  initVolume = (audio) => {
    let range = document.querySelector('.volume-bar'),
      rangeRect = range.getBoundingClientRect(),
      volumeProgress = range.children[0],
      slider = range.children[1],
      mouseDown = false

    range.addEventListener('mousedown', function (e) {
      mouseDown = true
      forbidSelect()
      updateSlider(e)
      document.addEventListener('mousemove', updateSlider)
    })

    document.addEventListener('mouseup', function () {
      mouseDown = false
      restoreSelect()
      document.removeEventListener('mousemove', updateSlider)
    })

    function updateSlider(e) {
      if (mouseDown) {
        let mousePositionX = e.clientX
        let rangeLeft = rangeRect.left
        let rangeWidth = rangeRect.width
        let percent = Math.round((mousePositionX - rangeLeft - slider.offsetWidth / 2) / rangeWidth * 100)
        if (percent > 100) {
          percent = 100
        }
        if (percent < 0) {
          percent = 0
        }

        slider.style.left = percent + '%'
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

  /**
   * Song ended.Do following:
   * 
   * 1. log current song into recent list
   * 2. if pattern is select, nextSong or getPlaylist(type => 'playing')
   * 3. if pattern is recent or redheart, get next song in array with index
   * 
   * @memberof Audio
   */
  endedAudio = audio => {
    return () => {
      const { pattern, fsid, recentIndex, recentSong, redheartIndex, redheartSong, handlePlayLog,
        handleRecentGo, handleRecentIndexSet, handleRedheartGo, handleRedheartIndexSet } = this.props

      if (pattern === 'select') {
        this.props.getPlaylist('playing')
        this.props.getPlaylist('end')
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
    const { percent } = this.state
    return (
      <div className='petal-player'>
        <Progress percent={percent} size='tiny' />
        <div className='player-bar'>
          <div className="player-time">
            <span className='currenttime'>0:00</span>
            <span>/</span>
            <span className='totaltime'>0:00</span>
          </div>
          <div className="player-volume">
            <Icon name='volume down' />
            <div className='volume-bar'>
              <div className="progress"></div>
              <span className='pin'></span>
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
  song: PropTypes.object.isRequired,
  recentSong: PropTypes.array,
  redheartSong: PropTypes.array,
  recentIndex: PropTypes.number.isRequired,
  redheartIndex: PropTypes.number.isRequired,
  getPlaylist: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  fsid: PropTypes.string.isRequired,
  handlePlayLog: PropTypes.func.isRequired,
  handleRecentGo: PropTypes.func.isRequired,
  handleRedheartGo: PropTypes.func.isRequired,
  handleRecentIndexSet: PropTypes.func.isRequired,
  handleRedheartIndexSet: PropTypes.func.isRequired
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
    fsid: state.fmReducer.fsid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPlaylist: type => dispatch(playlistGET(type)),
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

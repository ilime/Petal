import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Progress, Icon } from 'semantic-ui-react'
import { playlistGET, playLog } from '../../../actions/fm/apis'
import { songListGo, songListIndexSet } from '../../../actions/fm/actions'

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
    const { pattern, songListIndex, song, type, audioVolume } = nextProps

    if (audioVolume !== this.props.audioVolume) {
      this.setVolume(audioVolume)
    }

    if (pattern === 'select' && song !== this.props.song && type !== 'r' && type !== 'u') {
      this.nextAudio(song)
      return
    }

    if (pattern === 'redheart' && this.props.pattern !== 'redheart') {
      this.nextAudio(this.props.redheartSong[songListIndex])
      return
    }

    if (pattern === 'recent' && this.props.pattern !== 'recent') {
      this.nextAudio(this.props.recentSong[songListIndex])
      return
    }

    if (pattern === 'daily' && this.props.pattern !== 'daily') {
      this.nextAudio(this.props.dailySong[songListIndex])
    }

    // if (pattern === 'sheet' && this.props.pattern !== 'sheet') {
    //   this.nextAudio(this.props.sheetSong[songListIndex])
    // }

    if (songListIndex !== this.props.songListIndex && pattern === this.props.pattern) {
      if (pattern === 'redheart') {
        this.nextAudio(this.props.redheartSong[songListIndex])
        return
      }

      if (pattern === 'recent') {
        this.nextAudio(this.props.recentSong[songListIndex])
        return
      }

      if (pattern === 'daily') {
        this.nextAudio(this.props.dailySong[songListIndex])
        return
      }

      // if (pattern === 'sheet') {
      //   this.nextAudio(this.props.sheetSong[songListIndex])
      //   return
      // }
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
    this.audio.src = song.url
    this.audio.load()
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
    audio.addEventListener('ended', this.endedAudio)
    audio.addEventListener('loadedmetadata', () => {
      const totalTime = document.querySelector('.totaltime')
      totalTime.textContent = this.formatTime(audio.duration)
    })
    audio.addEventListener('canplaythrough', () => {
      audio.play()
    })
    this.initVolume(audio)
    this.setVolume(this.props.audioVolume)
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

  setVolume = (volume) => {
    let range = document.querySelector('.volume-bar'),
      volumeProgress = range.children[0],
      slider = range.children[1]

    this.audio.volume = volume / 100
    slider.style.left = volume + '%'
    volumeProgress.style.width = volume + '%'
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
      if (!isNaN(audio.duration)) {
        let currentTime = audio.currentTime
        currentTimeElement.textContent = this.formatTime(currentTime)
        this.setState({
          percent: currentTime / audio.duration * 100
        })
      }
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
  endedAudio = () => {
    const { pattern, recentSong, redheartSong, dailySong, songListIndex } = this.props

    if (pattern === 'select') {
      this.props.getPlaylist('end')
      this.props.getPlaylist('playing')
    } else if (pattern === 'recent') {
      this.props.handlePlayLog(recentSong[songListIndex].sid, 'p', 'y')
      if (recentSong.length === 1) {
        this.audio.load()
      } else if (songListIndex === recentSong.length - 1) {
        this.props.handleSongListIndexSet(0)
      } else {
        this.props.handleSongListGo()
      }
    } else if (pattern === 'redheart') {
      this.props.handlePlayLog(redheartSong[songListIndex].sid, 'p', 'h')
      if (redheartSong.length === 1) {
        this.audio.load()
      } else if (songListIndex === redheartSong.length - 1) {
        this.props.handleSongListIndexSet(0)
      } else {
        this.props.handleSongListGo()
      }
    } else if (pattern === 'daily') {
      this.props.handlePlayLog(dailySong[songListIndex].sid, 'p', 'd')
      if (dailySong.length === 1) {
        this.audio.load()
      } else if (songListIndex === dailySong.length - 1) {
        this.props.handleSongListIndexSet(0)
      } else {
        this.props.handleSongListGo()
      }
    }
  }

  render() {
    const { percent } = this.state
    return (
      <article className='petal-player'>
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
      </article>
    )
  }
}

Audio.propTypes = {
  pattern: PropTypes.string.isRequired,
  songListIndex: PropTypes.number,
  song: PropTypes.object.isRequired,
  recentSong: PropTypes.array,
  redheartSong: PropTypes.array,
  dailySong: PropTypes.array,
  // sheetSong: PropTypes.array,
  getPlaylist: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  audioVolume: PropTypes.number.isRequired,
  handleSongListGo: PropTypes.func,
  handleSongListIndexSet: PropTypes.func,
  handlePlayLog: PropTypes.func
}

const mapStateToProps = state => {
  return {
    pattern: state.fmReducer.pattern,
    songListIndex: state.fmReducer.songListIndex,
    song: state.fmReducer.song,
    type: state.fmReducer.type,
    recentSong: state.fmReducer.recent.songs,
    redheartSong: state.fmReducer.redheart,
    dailySong: state.fmReducer.daily.songs,
    // sheetSong: state.fmReducer.sheet,
    audioVolume: state.settingReducer.volume
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPlaylist: type => dispatch(playlistGET(type)),
    handleSongListGo: () => dispatch(songListGo),
    handleSongListIndexSet: index => dispatch(songListIndexSet(index)),
    handlePlayLog: (sid, type, play_source) => dispatch(playLog(sid, type, play_source))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Audio)

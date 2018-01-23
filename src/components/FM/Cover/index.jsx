import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dimmer, Image, Icon, Popup, Header } from 'semantic-ui-react'
import {
  onReceiveFromMainProcess,
  rendererProcessSend
} from '../../../helper/electron'
import { playlistGET, playLog } from '../../../actions/fm/apis'
import {
  songListGo,
  songListBack,
  songListIndexSet
} from '../../../actions/fm/actions'

class Cover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: true,
      song: {
        title: '',
        singers: [
          {
            avatar: ''
          }
        ],
        artist: '',
        picture: ''
      },
      love: 'white',
      isLoginPopup: false
    }
  }

  componentDidMount() {
    onReceiveFromMainProcess('pause', this.handleAudioPlay)
    onReceiveFromMainProcess('love', this.handleLoveSong)
    onReceiveFromMainProcess('trash', this.handleTrashSong)
    onReceiveFromMainProcess('skip', this.handleSkipSong)
    onReceiveFromMainProcess('forward', this.handleSongForward)
    onReceiveFromMainProcess('backward', this.handleSongBackward)
  }

  componentWillReceiveProps(nextProps) {
    const { _id, pattern, songListIndex, song } = nextProps

    if (pattern === 'select' && song !== this.props.song) {
      this.setCover(song, pattern)
      return
    }

    if (pattern === 'redheart' && this.props.pattern !== 'redheart') {
      this.setCover(this.props.redheartSong[songListIndex], pattern)
      return
    }

    if (pattern === 'recent' && this.props.pattern !== 'recent') {
      this.setCover(this.props.recentSong[songListIndex], pattern)
      return
    }

    if (pattern === 'daily' && this.props.pattern !== 'daily') {
      this.setCover(this.props.dailySong[songListIndex], pattern)
      return
    }

    // if (pattern === 'sheet' && this.props.pattern !== 'sheet') {
    //   this.setCover(this.props.sheetSong[songListIndex], pattern)
    //   return
    // }

    if (
      songListIndex !== this.props.songListIndex &&
      pattern === this.props.pattern
    ) {
      if (pattern === 'redheart') {
        this.setCover(this.props.redheartSong[songListIndex], pattern)
        return
      }

      if (pattern === 'recent') {
        this.setCover(this.props.recentSong[songListIndex], pattern)
        return
      }

      if (pattern === 'daily') {
        this.setCover(this.props.dailySong[songListIndex], pattern)
        return
      }

      // if (pattern === 'sheet') {
      //   this.setCover(this.props.sheetSong[songListIndex], pattern)
      //   return
      // }
    }

    if (_id === 0 && this.props._id === 1) {
      this.setState({ love: 'white' }, () => {
        rendererProcessSend('touchBarRateColor', this.state.love)
      })
    }
  }

  /**
   * Set cover.Do following:
   *
   * 1. set song picture
   * 2. set current state, user already liked it?
   *
   * @param {Object} song
   * @param {string} pattern
   * @memberof Cover
   */
  setCover = (song, pattern) => {
    this.setState(
      {
        playing: true,
        song,
        love: pattern === 'redheart' ? 'red' : song.like === 1 ? 'red' : 'white'
      },
      () => {
        rendererProcessSend('touchBarRateColor', this.state.love)
      }
    )
  }

  handleControlShow = () => this.setState({ controlPanelActive: true })
  handleControlHide = () => this.setState({ controlPanelActive: false })

  /**
   * Play or paused current song
   *
   * @memberof Cover
   */
  handleAudioPlay = () => {
    const audio = document.querySelector('#_audio')
    if (audio.paused) {
      audio.play()
      this.setState({ playing: true }, () => {
        rendererProcessSend('touchBarPauseAndStart', this.state.playing)
      })
    } else {
      audio.pause()
      this.setState({ playing: false }, () => {
        rendererProcessSend('touchBarPauseAndStart', this.state.playing)
      })
    }
  }

  handleSongForward = () => {
    const {
      pattern,
      recentSong,
      redheartSong,
      dailySong,
      songListIndex
    } = this.props

    if (pattern === 'select') {
      return
    }

    if (pattern === 'recent') {
      this.props.handlePlayLog(recentSong[songListIndex].sid, 'j', 'y')
      if (songListIndex === recentSong.length - 1) {
        this.props.handleSongListIndexSet(0)
      } else {
        this.props.handleSongListGo()
      }
    }

    if (pattern === 'redheart') {
      this.props.handlePlayLog(redheartSong[songListIndex].sid, 'j', 'h')
      if (songListIndex === redheartSong.length - 1) {
        this.props.handleSongListIndexSet(0)
      } else {
        this.props.handleSongListGo()
      }
    }

    if (pattern === 'daily') {
      this.props.handlePlayLog(dailySong[songListIndex].sid, 'j', 'd')
      if (songListIndex === dailySong.length - 1) {
        this.props.handleSongListIndexSet(0)
      } else {
        this.props.handleSongListGo()
      }
    }

    // if (pattern === 'sheet') {
    //   this.props.handlePlayLog(sheetSong[songListIndex].sid, 'j', 'n')
    //   if (songListIndex === sheetSong.length - 1) {
    //     this.props.handleSongListIndexSet(0)
    //   } else {
    //     this.props.handleSongListGo()
    //   }
    // }
  }

  handleSongBackward = () => {
    const {
      pattern,
      recentSong,
      redheartSong,
      dailySong,
      songListIndex
    } = this.props

    if (pattern === 'select') {
      return
    }

    if (pattern === 'recent') {
      this.props.handlePlayLog(recentSong[songListIndex].sid, 'k', 'y')
      if (songListIndex === 0) {
        this.props.handleSongListIndexSet(recentSong.length - 1)
      } else {
        this.props.handleSongListBack()
      }
    }

    if (pattern === 'redheart') {
      this.props.handlePlayLog(redheartSong[songListIndex].sid, 'k', 'h')
      if (songListIndex === 0) {
        this.props.handleSongListIndexSet(redheartSong.length - 1)
      } else {
        this.props.handleSongListBack()
      }
    }

    if (pattern === 'daily') {
      this.props.handlePlayLog(dailySong[songListIndex].sid, 'k', 'd')
      if (songListIndex === 0) {
        this.props.handleSongListIndexSet(dailySong.length - 1)
      } else {
        this.props.handleSongListBack()
      }
    }

    // if (pattern === 'sheet') {
    //   this.props.handlePlayLog(sheetSong[songListIndex].sid, 'k', 'n')
    //   if (songListIndex === 0) {
    //     this.props.handleSongListIndexSet(sheetSong.length - 1)
    //   } else {
    //     this.props.handleSongListBack()
    //   }
    // }
  }

  handleSkipSong = () => {
    this.props.getPlayList('skip')
  }

  handleTrashSong = () => {
    this.props.getPlayList('trash')
  }

  /**
   * Handle like current song.Must login.
   * Now apply with three patterns
   *
   * 1. select
   * 2. recent
   * 3. redheart
   *
   * @memberof Cover
   */
  handleLoveSong = () => {
    const {
      _id,
      pattern,
      getPlayList,
      recentSong,
      redheartSong,
      dailySong,
      songListIndex
    } = this.props
    const { love } = this.state
    if (_id === 0) {
      this.handleLoveIsLoginPopupOpen()
      return
    }

    if (love === 'white') {
      if (pattern === 'select') {
        getPlayList('rate')
      }

      if (pattern === 'recent') {
        this.props.handlePlayLog(recentSong[songListIndex].sid, 'r', 'y')
      }

      if (pattern === 'redheart') {
        this.props.handlePlayLog(redheartSong[songListIndex].sid, 'r', 'h')
      }

      if (pattern === 'daily') {
        this.props.handlePlayLog(dailySong[songListIndex].sid, 'r', 'd')
      }

      // if (pattern === 'sheet') {
      //   this.props.handlePlayLog(sheetSong[songListIndex].sid, 'r', 'n')
      // }

      this.setState({ love: 'red' }, () => {
        rendererProcessSend('touchBarRateColor', this.state.love)
      })
    }

    if (love === 'red') {
      if (pattern === 'select') {
        getPlayList('unrate')
      }

      if (pattern === 'recent') {
        this.props.handlePlayLog(recentSong[songListIndex].sid, 'u', 'y')
      }

      if (pattern === 'redheart') {
        this.props.handlePlayLog(redheartSong[songListIndex].sid, 'u', 'h')
      }

      if (pattern === 'daily') {
        this.props.handlePlayLog(dailySong[songListIndex].sid, 'u', 'd')
      }

      // if (pattern === 'sheet') {
      //   this.props.handlePlayLog(sheetSong[songListIndex].sid, 'u', 'n')
      // }

      this.setState({ love: 'white' }, () => {
        rendererProcessSend('touchBarRateColor', this.state.love)
      })
    }
  }

  handleLoveIsLoginPopupOpen = () => {
    this.setState({ isLoginPopup: true })
    this.PopupTimeout = setTimeout(() => {
      this.setState({ isLoginPopup: false })
    }, 3000)
  }

  handleLoveIsLoginPopupClose = () => {
    this.setState({ isLoginPopup: false })
    clearTimeout(this.PopupTimeout)
  }

  render() {
    const { pattern } = this.props
    const { controlPanelActive, playing, love, isLoginPopup, song } = this.state
    const controlPanel = (
      <div>
        <div className="play-pause" onClick={this.handleAudioPlay}>
          <Icon name={playing ? 'pause' : 'play'} size="large" />
        </div>
        <div className="heart-trash-forward">
          {pattern === 'select' && (
            <div>
              <Popup
                trigger={
                  <Icon
                    name="heart"
                    size="big"
                    style={{ color: love }}
                    onClick={this.handleLoveSong}
                  />
                }
                content="想要喜欢歌曲，请先登录"
                position="bottom center"
                on="click"
                open={isLoginPopup}
                onClose={this.handleLoveIsLoginPopupClose}
              />
              <Icon name="trash" size="big" onClick={this.handleTrashSong} />
              <Icon
                name="step forward"
                size="big"
                onClick={this.handleSkipSong}
              />
            </div>
          )}
          {(pattern === 'recent' ||
            pattern === 'redheart' ||
            pattern === 'daily') && (
              <div>
                <Icon
                  name="step backward"
                  size="big"
                  onClick={this.handleSongBackward}
                />
                <Icon
                  name="heart"
                  size="big"
                  style={{ color: love }}
                  onClick={this.handleLoveSong}
                />
                <Icon
                  name="step forward"
                  size="big"
                  onClick={this.handleSongForward}
                />
              </div>
            )}
        </div>
      </div>
    )

    return (
      <article className="petal-cover">
        <div className="info">
          <div className="title">
            <Header as="h3">
              {song.title.length > 20
                ? song.title.substring(0, 17) + '...'
                : song.title}
              <Header.Subheader>
                {song.artist.length > 20
                  ? song.artist.substring(0, 17) + '...'
                  : song.artist}
              </Header.Subheader>
            </Header>
          </div>
          <div className="artist">
            <Image src={song.singers[0].avatar} size="mini" circular />
          </div>
        </div>
        <Dimmer.Dimmable
          className="cover"
          as={Image}
          blurring={true}
          dimmed={controlPanelActive}
          dimmer={{ active: controlPanelActive, content: controlPanel }}
          onMouseEnter={this.handleControlShow}
          onMouseLeave={this.handleControlHide}
          src={song.picture}
          rounded
        />
      </article>
    )
  }
}

Cover.propTypes = {
  pattern: PropTypes.string.isRequired,
  song: PropTypes.object.isRequired,
  recentSong: PropTypes.array,
  redheartSong: PropTypes.array,
  dailySong: PropTypes.array,
  // sheetSong: PropTypes.array,
  getPlayList: PropTypes.func.isRequired,
  _id: PropTypes.number.isRequired,
  songListIndex: PropTypes.number.isRequired,
  handleSongListGo: PropTypes.func,
  handleSongListBack: PropTypes.func,
  handleSongListIndexSet: PropTypes.func,
  handlePlayLog: PropTypes.func
}

const mapStateToProps = state => {
  return {
    pattern: state.fmReducer.pattern,
    song: state.fmReducer.song,
    _id: state.authReducer._id,
    recentSong: state.fmReducer.recent.songs,
    redheartSong: state.fmReducer.redheart,
    dailySong: state.fmReducer.daily.songs,
    // sheetSong: state.fmReducer.sheet,
    songListIndex: state.fmReducer.songListIndex
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPlayList: type => dispatch(playlistGET(type)),
    handleSongListGo: () => dispatch(songListGo),
    handleSongListBack: () => dispatch(songListBack),
    handleSongListIndexSet: index => dispatch(songListIndexSet(index)),
    handlePlayLog: (sid, type, play_source) =>
      dispatch(playLog(sid, type, play_source))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cover)

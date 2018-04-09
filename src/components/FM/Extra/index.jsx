import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import { songLyricGET } from '../../../actions/fm/apis'
import {
  lyricDisplayTrue,
  lyricDisplayFalse
} from '../../../actions/fm/actions'
import lyricParsing from '../../../helper/lyricParsing'
import db from '../../../helper/db'
import { UserMusicPath, fileDownload } from '../../../helper/utils'

class Extra extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lyric: {
        lyricArr: [],
        canScroll: false
      },
      lyricAreaDisplay: false,
      lyricAreaHeight: 0,
      redheartAlreadyDownload: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lyric.sid !== this.props.lyric.sid) {
      console.log(nextProps.lyric)
      if (this.scrollId) {
        clearInterval(this.scrollId)
        this.scrollId = 0
        console.log('scroll end and clear id(skip)')
        this.resetScroll()
      }
      this.setState(
        {
          lyric: lyricParsing(nextProps.lyric.lyric)
        },
        () => {
          this.resetScroll()
          if (this.state.lyric.canScroll) {
            this.handleLyricScroll()
          }
        }
      )
    }

    if (
      (nextProps.pattern === 'redheart' && this.props.pattern !== 'redheart') ||
      (this.props.pattern === 'redheart' &&
        nextProps.songListIndex !== this.props.songListIndex)
    ) {
      setTimeout(() => {
        db.findOne({ _id: this.props.sid }, (err, doc) => {
          this.setState({
            redheartAlreadyDownload: doc !== null ? true : false
          })
        })
      }, 1000)
    }
  }

  showLyric = () => {
    const { lyric, sid, handleSongLyricGET } = this.props
    if (this.state.lyricAreaDisplay === false) {
      if (sid !== lyric.sid) {
        handleSongLyricGET()
      }

      this.props.handleGlobalLyricDisplayTrue()
      this.setState({
        lyricAreaDisplay: true,
        lyricAreaHeight: 80
      })
    } else {
      this.props.handleGlobalLyricDisplayFalse()
      this.setState({
        lyricAreaDisplay: false,
        lyricAreaHeight: 0
      })
    }
  }

  handleLyricScroll = () => {
    const audio = this.props.audio
    let height = this.lyricScrollArea.scrollHeight
    let lyric = this.state.lyric
    console.log(lyric)
    let lineHeight = height / lyric.lyricArr.length
    let prevIndex = 0
    let index = 0

    const scroll = () => {
      console.log('scroll begin')
      this.scrollId = setInterval(() => {
        let time = lyric.lyricArr[index][0]
        let currentTime = audio.currentTime
        if (currentTime > time) {
          lyric.lyricArr[prevIndex].active = false
          lyric.lyricArr[index].active = true
          this.setState({
            lyric
          })
          this.lyricScrollArea.scrollTop = lineHeight * index
          prevIndex = index
          index++
        }
        if (index === lyric.lyricArr.length) {
          clearInterval(this.scrollId)
          console.log('scroll end normally')
        }
      }, 1000)
    }

    scroll()
  }

  resetScroll = () => {
    this.lyricScrollArea.scrollTop = 0
  }

  downloadSong = () => {
    if (this.state.redheartAlreadyDownload) {
      return
    }

    const { sid, redheartSong, songListIndex } = this.props
    const title = redheartSong[songListIndex].title
    const artist = redheartSong[songListIndex].artist
    const name = `${title}-${artist}.${redheartSong[songListIndex].file_ext}`

    db.insert(
      {
        _id: sid,
        title,
        artist,
        path: UserMusicPath + '/PETAL豆瓣FM/' + name
      },
      () => {
        fileDownload(
          redheartSong[songListIndex].url,
          UserMusicPath + '/PETAL豆瓣FM',
          name,
          () => {
            this.setState({ redheartAlreadyDownload: true })
          }
        )
      }
    )
  }

  render() {
    const { lyric, lyricAreaDisplay, lyricAreaHeight } = this.state

    return (
      <article className="petal-fm-extra">
        <div className="panel">
          <div>
            <Icon
              className={lyricAreaDisplay ? 'item-active' : ''}
              link
              name="rocket"
              color="grey"
              onClick={this.showLyric}
              title="打开歌词"
            />
          </div>
          <div>
            <Icon link name="share alternate" color="grey" title="分享" />
            {this.props.pattern === 'redheart' && (
              <Icon.Group>
                <Icon
                  link
                  name="download"
                  color="grey"
                  title="下载歌曲"
                  onClick={this.downloadSong}
                />
                {this.state.redheartAlreadyDownload && (
                  <Icon corner name="check" color="green" />
                )}
              </Icon.Group>
            )}
          </div>
        </div>
        <div
          className="lyric-area"
          style={{ height: `${lyricAreaHeight}px` }}
          ref={node => (this.lyricScrollArea = node)}
        >
          <h5>{this.props.lyric.name}</h5>
          {lyric.lyricArr.length > 0 &&
            lyric.lyricArr.map((line, index) => (
              <p key={index} className={line.active ? 'line-active' : ''}>
                {typeof line === 'string' ? line : line[1]}
              </p>
            ))}
        </div>
      </article>
    )
  }
}

Extra.propTypes = {
  lyric: PropTypes.object,
  sid: PropTypes.string,
  handleSongLyricGET: PropTypes.func,
  handleGlobalLyricDisplayTrue: PropTypes.func,
  handleGlobalLyricDisplayFalse: PropTypes.func,
  pattern: PropTypes.string,
  redheartSong: PropTypes.array,
  songListIndex: PropTypes.number
}

function mapStateToProps(state) {
  return {
    lyric: state.fmReducer.lyric,
    sid: state.fmReducer.sid,
    pattern: state.fmReducer.pattern,
    redheartSong: state.fmReducer.redheart,
    songListIndex: state.fmReducer.songListIndex
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleSongLyricGET: () => dispatch(songLyricGET()),
    handleGlobalLyricDisplayTrue: () => dispatch(lyricDisplayTrue),
    handleGlobalLyricDisplayFalse: () => dispatch(lyricDisplayFalse)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Extra)

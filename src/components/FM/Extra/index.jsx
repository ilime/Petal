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

class Extra extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lyric: {
        lyricArr: [],
        canScroll: false
      },
      lyricAreaDisplay: false,
      lyricAreaHeight: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lyric.sid !== this.props.lyric.sid) {
      console.log(nextProps.lyric)
      if (this.scrollId) {
        clearInterval(this.scrollId)
        this.scrollId = 0
        console.log('scroll end because skip')
        this.resetScroll()
      }
      this.setState(
        {
          lyric: lyricParsing(nextProps.lyric.lyric)
        },
        () => {
          if (this.state.lyric.canScroll) {
            this.handleLyricScroll()
          }
        }
      )
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

    if (!this.alreadySetLyricLogicInAudio) {
      this.alreadySetLyricLogicInAudio = true
      this.props.audio.addEventListener('ended', () => {
        if (this.state.lyricAreaDisplay === true) {
          const sti = setInterval(() => {
            if (sid !== lyric.sid) {
              handleSongLyricGET()
              clearInterval(sti)
              this.resetScroll()
            }
          }, 2000)
        }
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
            <Icon link name="download" color="grey" title="下载歌曲" />
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
  handleGlobalLyricDisplayFalse: PropTypes.func
}

function mapStateToProps(state) {
  return {
    lyric: state.fmReducer.lyric,
    sid: state.fmReducer.sid
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

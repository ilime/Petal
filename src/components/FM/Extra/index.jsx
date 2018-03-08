import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import { songLyricGET } from '../../../actions/fm/apis'
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
    if (nextProps.lyric.lyric) {
      this.setState({
        lyric: lyricParsing(nextProps.lyric.lyric)
      })
    }
  }

  showLyric = () => {
    const { lyric, sid, handleSongLyricGET } = this.props
    if (this.state.lyricAreaDisplay === false) {
      if (sid !== lyric.sid) {
        handleSongLyricGET()
      }

      this.setState({
        lyricAreaDisplay: true,
        lyricAreaHeight: 80
      })
    } else {
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
            if (this.props.sid !== this.props.lyric.sid) {
              this.props.handleSongLyricGET()
              clearInterval(sti)
            }
          }, 2000)
        }
      })
    }
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
        <div className="lyric-area" style={{ height: `${lyricAreaHeight}px` }}>
          <h5>{this.props.lyric.name}</h5>
          {lyric.lyricArr.length > 0 &&
            lyric.lyricArr.map((line, index) => (
              <p key={index}>{typeof line === 'string' ? line : line[1]}</p>
            ))}
        </div>
      </article>
    )
  }
}

Extra.propTypes = {
  lyric: PropTypes.object,
  sid: PropTypes.string
}

function mapStateToProps(state) {
  return {
    lyric: state.fmReducer.lyric,
    sid: state.fmReducer.sid
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleSongLyricGET: () => dispatch(songLyricGET())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Extra)

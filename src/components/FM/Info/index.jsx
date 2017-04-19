'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Header, Image } from 'semantic-ui-react'

import './index.scss'

class Info extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      singer: '',
      avatar: '',
      albumTitle: '',
      lc: [],
      canScroll: true
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.song !== this.props.song) {
      const { song, lyric } = nextProps
      this.setState({
        title: song[0].title,
        singer: song[0].singers[0].name,
        avatar: song[0].singers[0].avatar,
        albumTitle: song[0].albumtitle,
      })
    }
    if (nextProps.lyric !== this.props.lyric) {
      const { lyric } = nextProps
      this.setState({ canScroll: true })
      Promise.resolve(this.setState({
        lc: this.handleLyric(lyric.lyric)
      })).then(() => {
        this.syncLyric()
      })
    }
  }

  handleLyric = (lyric) => {
    let result = []
    if (lyric === '暂无歌词') {
      result.push(lyric)
    }
    if (lyric.startsWith('\r\n')) {
      lyric = lyric.slice(2)
    }
    if (!lyric.startsWith('[')) {
      var re = lyric.split('\r\n').map(l => l.trim())
      this.setState({ canScroll: false })
      return re
    }
    let pattern = /\[\d{2}:\d{2}\.\d{2}\]/g
    let splitByNewline = lyric.split('\r\n')
    while (!pattern.test(splitByNewline[0])) {
      splitByNewline = splitByNewline.slice(1)
    }
    splitByNewline = splitByNewline.filter((l) => {
      return l !== ''
    })
    splitByNewline.forEach(l => {
      let time = l.match(pattern)
      let value = l.replace(pattern, '')
      time.forEach(item => {
        let t = item.slice(1, -1).split(':')
        result.push([value, parseInt(t[0]) * 60 + parseFloat(t[1])])
      })
    })
    result.sort((a, b) => {
      return a[1] - b[1]
    })
    return result.filter(l => {
      return l[0] !== ''
    })
  }

  syncLyric = () => {
    if (this.state.canScroll === false) { return }
    const audio = document.querySelector('#_audio')
    const lyricContainer = document.querySelector('.lyric')
    const lc = this.state.lc
    let index = 0

    audio.ontimeupdate = () => {
      if (index === lc.length) { return }
      let ct = audio.currentTime
      if (ct > lc[index][1]) {
        let lines = lyricContainer.children
        lines[index].classList.add('lyricGreen')
        if (index > 0) {
          lines[index - 1].classList.remove('lyricGreen')
          if (index > 3) {
            lyricContainer.scrollTop += lines[index - 1].clientHeight + 14
          }
        }
        index++
      }
    }
  }

  render() {
    const { title, singer, avatar, albumTitle, lc, canScroll } = this.state
    return (
      <section>
        <div className='songTitleAndSinger'>
          <Header as='h3' id='title'>
            {title}
            <Header.Subheader>专辑: {albumTitle}</Header.Subheader>
          </Header>
          <Header as='h5'>
            <Image size='mini' shape='circular' src={avatar} className='avatar' />
            {singer}
          </Header>
        </div>
        <div className='lyric'>
          {!canScroll && <p className='cannotscroll'>暂不支持滚动</p>}
          {lc.length > 0 && lc.map((l, i) => {
            return <p key={i}>{typeof l === 'string' ? l : l[0]}</p>
          })}
        </div>
      </section>
    )
  }
}

Info.propTypes = {
  song: PropTypes.array.isRequired,
  lyric: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    song: state.fmReducer.song,
    lyric: state.fmReducer.lyric
  }
}

export default connect(
  mapStateToProps,
  null
)(Info)
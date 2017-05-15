'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, Header, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { selectPattern, recentPattern, redheartPattern } from '../../actions/fm/types'
import { playlistGET } from '../../actions/fm/apis'

class Pattern extends Component {
  constructor(props) {
    super(props)
    this._patterns = new Map([
      ['select', () => {
        props.switchToSelect()
        props.getPlaylist('new')
      }],
      ['recent', () => {
        props.switchToRecent()
      }],
      ['redheart', () => {
        props.switchToRedheart()
      }]
    ])
  }
  /**
   * Handle switch pattern
   * 
   * 1. select
   * 2. recent
   * 3. redheart
   * 
   * @memberof Pattern
   */
  handleSwitchPattern = (e, { name }) => {
    const { pattern } = this.props

    if (pattern !== name) { this._patterns.get(name)() }

    this.props.handleClose()
  }

  render() {
    const { _id, pattern, likedNum, playedNum } = this.props

    return (
      <Modal
        open={this.props.open}
        basic
        size='small'
        dimmer
      >
        <Header icon='signal' content='播放模式控制' />
        <Modal.Content>
          <Button name='select' inverted active={pattern === 'select'} onClick={this.handleSwitchPattern}>豆瓣精选</Button>
          {_id === 0 ?
            <Link to='login'>
              <Button basic onClick={this.props.handleClose} inverted color='red'>登录后解锁更多模式</Button>
            </Link>
            :
            <div style={{ 'display': 'inline' }}>
              {playedNum !== 0
                ? <Button name='recent' inverted active={pattern === 'recent'} onClick={this.handleSwitchPattern}>最近播放</Button>
                : <Button negative>没有最近播放</Button>}
              {likedNum !== 0
                ? <Button name='redheart' inverted active={pattern === 'redheart'} onClick={this.handleSwitchPattern}>红心歌曲</Button>
                : <Button negative>没有红心歌曲</Button>}
            </div>}
        </Modal.Content>
        <Modal.Actions>
          <Button basic onClick={this.props.handleClose} inverted color='green'>
            <Icon name='checkmark' /> 关闭
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

Pattern.PropTypes = {
  _id: PropTypes.number.isRequired,
  pattern: PropTypes.string.isRequired,
  getPlaylist: PropTypes.func.isRequired,
  likedNum: PropTypes.number.isRequired,
  playedNum: PropTypes.number.isRequired
}

const mapStateToProps = state => {
  return {
    _id: state.authReducer._id,
    pattern: state.fmReducer.pattern,
    likedNum: state.authReducer.userInfo.liked_num,
    playedNum: state.authReducer.userInfo.played_num
  }
}

const mapDispatchToProps = dispatch => {
  return {
    switchToSelect: () => dispatch(selectPattern),
    switchToRecent: () => dispatch(recentPattern),
    switchToRedheart: () => dispatch(redheartPattern),
    getPlaylist: type => dispatch(playlistGET(type))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pattern)
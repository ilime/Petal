'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, Header, Button, Icon } from 'semantic-ui-react'

import { selectPattern, recentPattern, redheartPattern } from '../../actions/fm/types'
import { playlistGET } from '../../actions/fm/apis'

class Pattern extends Component {
  handleSwitchPattern = (e, { name }) => {
    const { pattern } = this.props

    if (name === 'select' && pattern !== 'select') {
      this.props.switchToSelect()
      this.props.getPlaylist('new')
    }

    if (name === 'recent' && pattern !== 'recent') {
      this.props.switchToRecent()
    }

    if (name === 'redheart' && pattern !== 'redheart') {
      this.props.switchToRedheart()
    }

    this.props.handleClose()
  }

  render() {
    const { pattern } = this.props

    return (
      <Modal
        open={this.props.open}
        basic
        size='small'
      >
        <Header icon='signal' content='播放模式控制' />
        <Modal.Content>
          <Button.Group attached='top' vertical fluid>
            <Button name='select' inverted active={pattern === 'select'} onClick={this.handleSwitchPattern}>豆瓣精选</Button>
            <Button name='recent' inverted active={pattern === 'recent'} onClick={this.handleSwitchPattern}>最近播放</Button>
            <Button name='redheart' inverted active={pattern === 'redheart'} onClick={this.handleSwitchPattern}>红心歌曲</Button>
          </Button.Group>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.props.handleClose} inverted>
            <Icon name='checkmark' /> 关闭
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

Pattern.PropTypes = {
  pattern: PropTypes.string.isRequired,
  getPlaylist: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    pattern: state.fmReducer.pattern
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
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
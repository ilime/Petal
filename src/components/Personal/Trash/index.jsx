'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Item, Icon } from 'semantic-ui-react'

import { actionLog } from '../../../actions/fm/apis'
import './index.scss'

class Trash extends Component {
  handleTrashRemove = (e, sid) => {
    e.preventDefault()
    this.props.handleActionLog(sid, 'z', 'i')
    e.target.parentNode.parentNode.remove()
  }

  render() {
    const { trash } = this.props

    return (
      <Item.Group>
        {trash.length > 0 && trash.map((song, index) => {
          return <Item key={index} className='trashItem'>
            <Item.Image size='tiny' src={song.picture} />

            <Item.Content>
              <Item.Header as='a'>{song.title}</Item.Header>
              <Item.Description>
                {song.singers.reduce((prev, singer) => {
                  return prev + '/' + singer.name
                }, '').slice(1)}
              </Item.Description>
              <Item.Extra>
                {song.albumtitle + ' - ' + song.public_time}
              </Item.Extra>
            </Item.Content>
            <div className='trashControl'>
              <Icon title='移除' name='trash' color='grey' link onClick={e => this.handleTrashRemove(e, song.sid)} />
            </div>
          </Item>
        })}
      </Item.Group>
    )
  }
}

Trash.PropTypes = {
  trash: PropTypes.array.isRequired,
  handleActionLog: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    trash: state.fmReducer.trash.songs
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleActionLog: (sid, type, play_source) => dispatch(actionLog(sid, type, play_source))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trash)

'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Item, Icon } from 'semantic-ui-react'

import { recentIndexSet } from '../../actions/fm/types'
import { redheartIndexSet } from '../../actions/fm/types'
import { actionLog } from '../../actions/fm/apis'

class SongList extends Component {
  handleRecentPlay = index => {
    const { handleRecentIndexSet } = this.props
    handleRecentIndexSet(index)
  }

  handleRedheartPlay = index => {
    const { handleRedheartIndexSet } = this.props
    handleRedheartIndexSet(index)
  }

  handleTrashRemove = (e, sid) => {
    e.preventDefault()
    this.props.handleActionLog(sid, 'z', 'i')
    e.target.parentNode.parentNode.remove()
  }

  render() {
    const { songArray, type } = this.props

    return (
      <Item.Group>
        {songArray.length > 0 && songArray.map((song, index) => {
          return <Item key={index} className='songlistItem'>
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
            <div className='itemControl'>
              {type === 'recent' && <div>
                <Icon name='play' color='grey' link onClick={() => this.handleRecentPlay(index)} />
              </div>}
              {type === 'redheart' && <div>
                <Icon name='play' color='grey' link onClick={() => this.handleRedheartPlay(index)} />
              </div>}
              {type === 'trash' && <div>
                <Icon title='移除'
                  name='trash'
                  color='grey'
                  link
                  onClick={e => this.handleTrashRemove(e, song.sid)} />
              </div>}
            </div>
          </Item>
        })}
      </Item.Group>
    )
  }
}

SongList.PropTypes = {
  handleRecentIndexSet: PropTypes.func.isRequired,
  handleRedheartIndexSet: PropTypes.func.isRequired,
  handleActionLog: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    handleRecentIndexSet: index => dispatch(recentIndexSet(index)),
    handleRedheartIndexSet: index => dispatch(redheartIndexSet(index)),
    handleActionLog: (sid, type, play_source) => dispatch(actionLog(sid, type, play_source))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SongList)

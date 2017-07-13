import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Item, Icon } from 'semantic-ui-react'
import { recentIndexSet, redheartIndexSet, trashRemove } from '../../actions/fm/types'
import { actionLog } from '../../actions/fm/apis'
import { renderProcessSend } from '../../helper/electron'

class SongList extends Component {
  handleRecentPlay = index => {
    const { handleRecentIndexSet } = this.props
    handleRecentIndexSet(index)
    renderProcessSend('patternSwitch', 'recent')
  }

  handleRedheartPlay = index => {
    const { handleRedheartIndexSet } = this.props
    handleRedheartIndexSet(index)
    renderProcessSend('patternSwitch', 'redheart')
  }

  handleTrashRemove = (e, index, sid) => {
    e.preventDefault()
    this.props.handleActionLog(sid, 'z', 'i')
    this.props.handleStateTrashRemove(index)
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
                  onClick={e => this.handleTrashRemove(e, index, song.sid)} />
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
  handleStateTrashRemove: PropTypes.func.isRequired,
  handleActionLog: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    handleRecentIndexSet: index => dispatch(recentIndexSet(index)),
    handleRedheartIndexSet: index => dispatch(redheartIndexSet(index)),
    handleStateTrashRemove: index => dispatch(trashRemove(index)),
    handleActionLog: (sid, type, play_source) => dispatch(actionLog(sid, type, play_source))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SongList)

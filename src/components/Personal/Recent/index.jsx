'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Item, Icon } from 'semantic-ui-react'

import { recentIndexSet } from '../../../actions/fm/types'
import './index.scss'

class Recent extends Component {
  handleRecentPlay = index => {
    const { handleRecentIndexSet } = this.props
    handleRecentIndexSet(index)
  }

  render() {
    const { recent } = this.props

    return (
      <Item.Group>
        {recent.length > 0 && recent.map((song, index) => {
          return <Item key={index} className='recentItem'>
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
            <div className='recentControl'>
              <Icon name='play' color='grey' link onClick={() => this.handleRecentPlay(index)} />
            </div>
          </Item>
        })}
      </Item.Group>
    )
  }
}

Recent.PropTypes = {
  recent: PropTypes.array.isRequired,
  handleRecentIndexSet: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    recent: state.fmReducer.recent.songs
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleRecentIndexSet: index => dispatch(recentIndexSet(index))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recent)
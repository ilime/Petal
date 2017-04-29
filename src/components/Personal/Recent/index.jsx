'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Item } from 'semantic-ui-react'

class Recent extends Component {
  render() {
    const { recent } = this.props

    return (
      <Item.Group>
        {recent.length > 0 && recent.map((song, index) => {
          return <Item key={index}>
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
          </Item>
        })}
      </Item.Group>
    )
  }
}

Recent.PropTypes = {
  recent: PropTypes.array.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    recent: state.fmReducer.recent.songs
  }
}

export default connect(
  mapStateToProps,
  null
)(Recent)
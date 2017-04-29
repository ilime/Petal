'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Item } from 'semantic-ui-react'

class Trash extends Component {
  render() {
    const { trash } = this.props

    return (
      <Item.Group>
        {trash.length > 0 && trash.map((song, index) => {
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

Trash.PropTypes = {
  trash: PropTypes.array.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    trash: state.fmReducer.trash.songs
  }
}

export default connect(
  mapStateToProps,
  null
)(Trash)

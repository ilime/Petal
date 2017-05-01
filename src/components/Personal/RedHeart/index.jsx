'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Item, Icon } from 'semantic-ui-react'

import { redheartIndexSet } from '../../../actions/fm/types'
import './index.scss'

class RedHeart extends Component {
  handleRedheartPlay = index => {
    const { handleRedheartIndexSet } = this.props
    handleRedheartIndexSet(index)
  }

  render() {
    const { redheart } = this.props

    return (
      <Item.Group>
        {redheart.length > 0 && redheart.map((song, index) => {
          return <Item key={index} className='redheartItem'>
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
            <div className='redheartControl'>
              <Icon name='play' color='grey' link onClick={() => this.handleRedheartPlay(index)} />
            </div>
          </Item>
        })}
      </Item.Group>
    )
  }
}

RedHeart.PropTypes = {
  redheart: PropTypes.array.isRequired,
  handleRedheartIndexSet: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    redheart: state.fmReducer.redheart
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleRedheartIndexSet: index => dispatch(redheartIndexSet(index))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedHeart)
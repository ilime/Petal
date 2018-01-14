import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Item, Header } from 'semantic-ui-react'

const typeRender = {
  'recent': '最近收听',
  'redheart': '红心',
  'trash': '垃圾桶'
}

const tipRender = {
  'recent': '你还没有收听过歌曲哦～',
  'redheart': '这里没有你喜欢的歌曲吗？',
  'trash': '这里没有你不喜欢的歌曲！'
}

class SongList extends Component {
  render() {
    const { songArray, type } = this.props
    const title = typeRender[type]

    return (
      <article className="petal-personal-songlist">
        <Header as="h2">{title}</Header>
        {songArray.length === 0 ?
          <p>{tipRender[type]}</p>
          : < Item.Group divided unstackable>
            {songArray.map((song, index) => {
              return <Item key={index}>
                <Item.Image size='tiny' src={song.picture} />
                <Item.Content>
                  <Item.Header>{song.title}</Item.Header>
                  <Item.Meta>{song.artist}</Item.Meta>
                  <Item.Extra>{`${song.albumtitle} - ${song.public_time}`}</Item.Extra>
                </Item.Content>
              </Item>
            })}
          </Item.Group>}
      </article>
    )
  }
}

SongList.propTypes = {
  songArray: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
}

export default connect(
  null,
  null
)(SongList)

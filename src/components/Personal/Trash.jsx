'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SongList from './SongList.jsx'

class Trash extends Component {
  render() {
    return (
      <SongList songArray={this.props.trash} type='trash' />
    )
  }
}

Trash.PropTypes = {
  trash: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    trash: state.fmReducer.trash.songs
  }
}

export default connect(
  mapStateToProps,
  null
)(Trash)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SongList from './SongList.jsx'

class Recent extends Component {
  render() {
    return (
      <SongList songArray={this.props.recent} type='recent' />
    )
  }
}

Recent.PropTypes = {
  recent: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    recent: state.fmReducer.recent.songs
  }
}

export default connect(
  mapStateToProps,
  null
)(Recent)
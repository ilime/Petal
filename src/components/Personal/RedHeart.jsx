import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SongList from './SongList.jsx'

class RedHeart extends Component {
  render() {
    return (
      <SongList songArray={this.props.redheart} type='redheart' />
    )
  }
}

RedHeart.PropTypes = {
  redheart: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    redheart: state.fmReducer.redheart
  }
}

export default connect(
  mapStateToProps,
  null
)(RedHeart)
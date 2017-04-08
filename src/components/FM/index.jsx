'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'

import { playlistGET } from '../../actions/fm/apis'

class FM extends Component {

  componentDidMount() {
    this.props.getPlaylist('new')
  }

  render() {

    return (
      <div>
        <Header size='huge' textAlign='center'>Petal FM</Header>
      </div>
    )
  }
}

FM.PropTypes = {
  playlist: PropTypes.object.isRequired,
  getPlaylist: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    playlist: state.fmReducer.playlist
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPlaylist: (type, sid = '') => dispatch(playlistGET(type, sid))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FM)
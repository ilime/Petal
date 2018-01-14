import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SongList from './SongList'

class Trash extends Component {
  componentDidMount() {
    document.querySelector('.fm-region').style.display = 'none'
  }

  componentWillUnmount() {
    if (this.props.history.location.pathname === '/') {
      document.querySelector('.fm-region').style.display = 'flex'
    }
  }

  render() {
    return (
      <SongList songArray={this.props.trash} type='trash' />
    )
  }
}

Trash.propTypes = {
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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SongList from './SongList'

class Recent extends Component {
  componentDidMount() {
    document.querySelector('.fm-region').style.display = 'none'
  }

  componentWillUnmount() {
    if (this.props.history.location.pathname === '/') {
      document.querySelector('.fm-region').style.display = 'flex'
    }
  }

  render() {
    return <SongList songArray={this.props.recent} type="recent" />
  }
}

Recent.propTypes = {
  recent: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    recent: state.fmReducer.recent.songs
  }
}

export default connect(mapStateToProps, null)(Recent)

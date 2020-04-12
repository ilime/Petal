import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SongList from './SongList'

class RedHeart extends Component {
  componentDidMount() {
    document.querySelector('.fm-region').style.display = 'none'
  }

  componentWillUnmount() {
    if (this.props.history.location.pathname === '/') {
      document.querySelector('.fm-region').style.display = 'flex'
    }
  }

  render() {
    return <SongList songArray={this.props.redheart} type="redheart" />
  }
}

RedHeart.propTypes = {
  redheart: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  redheart: state.fmReducer.redheart,
})

export default connect(mapStateToProps, null)(RedHeart)

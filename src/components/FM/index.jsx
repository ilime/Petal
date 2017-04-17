'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Image, Dimmer, Loader } from 'semantic-ui-react'

import Cover from './Cover/index.jsx'
import Audio from './Audio/index.jsx'
import Info from './Info/index.jsx'

import { playlistGET } from '../../actions/fm/apis'

import './index.scss'

class FM extends Component {
  componentDidMount() {
    this.props.getPlaylist('new')
  }

  render() {
    const { isFetching } = this.props
    return (
      <Dimmer.Dimmable dimmed className='fmRegion'>
        <Dimmer active={isFetching} inverted>
          <Loader>加载中</Loader>
        </Dimmer>
        <article>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Cover />
                <Audio />
              </Grid.Column>
              <Grid.Column>
                <Info />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </article>
      </Dimmer.Dimmable>
    )
  }
}

FM.propTypes = {
  getPlaylist: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    isFetching: state.fmReducer.isFetching
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
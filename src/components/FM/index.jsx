'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid, Image} from 'semantic-ui-react'

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
    return (
      <article className='fmRegion'>
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
    )
  }
}

FM.PropTypes = {
  getPlaylist: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    getPlaylist: (type, sid = '') => dispatch(playlistGET(type, sid))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(FM)
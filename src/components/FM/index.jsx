import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dimmer, Loader, Container } from 'semantic-ui-react'
import Cover from './Cover'
import Audio from './Audio'
import Extra from './Extra'

class FM extends Component {
  state = {
    audio: undefined
  }

  handleAudioSpan = audio => {
    this.setState({
      audio
    })
  }

  render() {
    const { isFetching } = this.props
    return (
      <Container className="fm-region">
        <Dimmer.Dimmable>
          <Dimmer className="fm-dimmer" active={isFetching} inverted>
            <Loader>加载中</Loader>
          </Dimmer>
          <Cover audio={this.state.audio} />
          <Audio handleAudioSpan={this.handleAudioSpan} />
          <Extra audio={this.state.audio} />
        </Dimmer.Dimmable>
      </Container>
    )
  }
}

FM.propTypes = {
  isFetching: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isFetching: state.fmReducer.isFetching
})

export default connect(
  mapStateToProps,
  null
)(FM)

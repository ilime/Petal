import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dimmer, Loader } from 'semantic-ui-react'
import Cover from './Cover'
import Audio from './Audio'

class FM extends Component {
  render() {
    const { isFetching } = this.props
    return (
      <article className="fm-region">
        <Dimmer.Dimmable dimmed>
          <Dimmer className="fm-dimmer" active={isFetching} inverted>
            <Loader>加载中</Loader>
          </Dimmer>
          <Cover />
          <Audio />
        </Dimmer.Dimmable>
      </article>
    )
  }
}

FM.propTypes = {
  isFetching: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    isFetching: state.fmReducer.isFetching
  }
}

export default connect(mapStateToProps, null)(FM)

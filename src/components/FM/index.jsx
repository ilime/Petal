import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Dimmer, Loader } from 'semantic-ui-react'
import Cover from './Cover'
import Audio from './Audio'
import Info from './Info'

class FM extends Component {
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
  isFetching: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
  return {
    isFetching: state.fmReducer.isFetching
  }
}

export default connect(
  mapStateToProps,
  null
)(FM)
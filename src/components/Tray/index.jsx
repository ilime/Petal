import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { rendererProcessSend } from '../../helper/electron'

class StoreValueTwin extends Component {
  render() {
    this.props.onChange(this.props.value)
    return <></>
  }
}

StoreValueTwin.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func
}

// Fake component just to subscribe state from redux store
class TrayTwin extends Component {
  render() {
    const { compactStatusBar } = this.props

    return (
      <div>
        <StoreValueTwin
          name="compactStatusBar"
          value={compactStatusBar}
          onChange={val => rendererProcessSend('trayCompactStatusBar', val)}
        />
      </div>
    )
  }
}

TrayTwin.propTypes = {
  compactStatusBar: PropTypes.bool
}

const mapStateToProps = state => ({
  compactStatusBar: state.settingReducer.compactStatusBar
})

export default connect(mapStateToProps, null)(TrayTwin)

'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Icon } from 'semantic-ui-react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { remote } from 'electron'

import FM from '../FM/index.jsx'
import Login from '../Login/index.jsx'
import Sidebar from '../Sidebar/index.jsx'
import Pattern from '../Pattern/index.jsx'
import Setting from '../Setting/index.jsx'
import Personal from '../Personal/index.jsx'
import Read from '../Read/index.jsx'
import Music from '../Music/index.jsx'
import Movie from '../Movie/index.jsx'
import { authLoad } from '../../actions/auth/apis'

import '../../static/app.scss'

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pattern: false,
      settingOpen: false
    }
  }

  componentDidMount() { this.props.handleAuthLoad() }

  handleAppMinimize = () => { remote.getCurrentWindow().minimize() }

  handleAppQuit = () => { remote.app.quit() }

  handlePatternOpen = () => { this.setState({ patternOpen: true }) }

  handlePatternClose = () => { this.setState({ patternOpen: false }) }

  handleSettingOpen = () => { this.setState({ settingOpen: true }) }

  handleSettingClose = () => { this.setState({ settingOpen: false }) }

  render() {
    return (
      <Router>
        <Grid>
          <Grid.Row className='outside'>
            <Grid.Column as='nav' width={2} id='sidebarColumn'>
              <Sidebar />
            </Grid.Column>
            <Grid.Column as='main' width={14}>
              <div className='titleBar' title='点住我可以拖动哦～'></div>
              <FM />
              <Route path='/login' component={Login} />
              <Route path='/personal' component={Personal} />
              <Route path='/read' component={Read} />
              <Route path='/movie' component={Movie} />
              <Route path='/music' component={Music} />
            </Grid.Column>
            <aside>
              <div className='petalControl'>
                <div className='miniButton' onClick={this.handleAppMinimize}>
                  <span>－</span>
                </div>
                <div className='quitButton' onClick={this.handleAppQuit}>
                  <span>×</span>
                </div>
              </div>
              <Icon className='petalPattern'
                name='options'
                size='large'
                color='grey'
                link
                onClick={this.handlePatternOpen} />
              <Icon className='petalSetting'
                name='setting'
                size='large'
                color='grey'
                link
                onClick={this.handleSettingOpen} />
            </aside>
            <Pattern
              open={this.state.patternOpen}
              handleClose={this.handlePatternClose} />
            <Setting
              open={this.state.settingOpen}
              handleClose={this.handleSettingClose} />
          </Grid.Row>
        </Grid>
      </Router>
    )
  }
}

Container.PropTypes = {
  handleAuthLoad: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    handleAuthLoad: () => dispatch(authLoad())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Container)
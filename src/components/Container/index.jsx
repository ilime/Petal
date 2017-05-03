'use strict'

import React, { Component } from 'react'
import { Grid, Icon } from 'semantic-ui-react'
import { HashRouter as Router, Route } from 'react-router-dom'

import FM from '../FM/index.jsx'
import Login from '../Login/index.jsx'
import Sidebar from '../Sidebar/index.jsx'
import Pattern from '../Pattern/index.jsx'
import Setting from '../Setting/index.jsx'
import Personal from '../Personal/index.jsx'
import './index.scss'
const { remote } = window.require('electron')

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pattern: false,
      settingOpen: false
    }
  }

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
              <FM />
              <Route path='/login' component={Login} />
              <Route path='/personal' component={Personal} />
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

export default Container
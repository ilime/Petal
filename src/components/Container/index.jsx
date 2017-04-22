'use strict'

import React, { Component } from 'react'
import { Grid, Icon } from 'semantic-ui-react'
import { HashRouter as Router, Route } from 'react-router-dom'

import FM from '../FM/index.jsx'
import Login from '../Login/index.jsx'
import Sidebar from '../Sidebar/index.jsx'
import Setting from '../Setting/index.jsx'
import './index.scss'
const { remote } = window.require('electron')

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      settingOpen: false
    }
  }

  handleAppMinimize = () => {
    remote.getCurrentWindow().minimize()
  }

  handleAppQuit = () => {
    remote.app.quit()
  }

  handleSettingOpen = () => {
    this.setState({ settingOpen: true })
  }

  handleSettingClose = () => {
    this.setState({ settingOpen: false })
  }

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
              <Icon className='petalSetting'
                name='setting'
                size='large'
                color='grey'
                link
                onClick={this.handleSettingOpen} />
            </aside>
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
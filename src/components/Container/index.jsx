'use strict'

import React, { Component } from 'react'
import { Grid, Icon } from 'semantic-ui-react'

import PetalRoutes from '../../routes'
import FM from '../FM/index.jsx'
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
      <Grid>
        <Grid.Row className='outside'>
          <Grid.Column as='nav' width={2} id='sidebarColumn'>
            <Sidebar />
          </Grid.Column>
          <Grid.Column as='main' width={14}>
            <FM />
            {PetalRoutes}
          </Grid.Column>
          <aside>
            <div className='petalControl'>
              <div className='miniButton' onClick={this.handleAppMinimize}></div>
              <div className='quitButton' onClick={this.handleAppQuit}></div>
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
    )
  }
}

export default Container
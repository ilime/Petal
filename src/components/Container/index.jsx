import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Icon, Label } from 'semantic-ui-react'
import { HashRouter as Router, Route } from 'react-router-dom'

import Loading from '../Loading/index.jsx'
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
import { openInDefaultBrowser, appMinimize, appQuit } from '../../helper/electron'
import checkUpdate from '../../helper/updateCheck'

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      pattern: false,
      settingOpen: false,
      checkUpdateDisplay: 0,
    }
  }

  handlePatternOpen = () => { this.setState({ patternOpen: true }) }

  handlePatternClose = () => { this.setState({ patternOpen: false }) }

  handleSettingOpen = () => { this.setState({ settingOpen: true }) }

  handleSettingClose = () => { this.setState({ settingOpen: false }) }

  handleLoadingOver = () => {
    setTimeout(() => {
      this.setState({ loading: false })
      const { handleAuthLoad, mainVersion, secondaryVersion } = this.props
      handleAuthLoad()
      checkUpdate(mainVersion, secondaryVersion,
        display => this.setState({ checkUpdateDisplay: display }))
    }, 5000)
  }

  render() {
    const { loading, checkUpdateDisplay } = this.state
    return (
      <Router>
        {loading ? <Loading end={this.handleLoadingOver} /> :
          <Grid >
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
                  <div className='miniButton' onClick={appMinimize}>
                    <span>－</span>
                  </div>
                  <div className='quitButton' onClick={appQuit}>
                    <span>×</span>
                  </div>
                </div>
                {checkUpdateDisplay === 1 &&
                  <Label
                    as='a'
                    className='checkUpdate'
                    content='新的版本更新:)'
                    color='green'
                    size='mini'
                    onClick={openInDefaultBrowser('https://github.com/3shld/Petal/releases')} />}
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
          </Grid>}
      </Router>
    )
  }
}

Container.PropTypes = {
  handleAuthLoad: PropTypes.func.isRequired,
  mainVersion: PropTypes.number.isRequired,
  secondaryVersion: PropTypes.number.isRequired
}

const mapStateToProps = state => {
  return {
    mainVersion: state.settingReducer.mainVersion,
    secondaryVersion: state.settingReducer.secondaryVersion
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleAuthLoad: () => dispatch(authLoad())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)
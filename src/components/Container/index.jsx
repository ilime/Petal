import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Label } from 'semantic-ui-react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Loading from '../Loading'
import FM from '../FM'
import Sidebar from '../Sidebar'
import Setting from '../Setting'
import Login from '../Login'
import RedHeart from '../Personal/RedHeart'
import Recent from '../Personal/Recent'
import Trash from '../Personal/Trash'
import Pattern from '../Pattern/index'
import Personal from '../Personal/index'
import Sheet from '../Sheet/index'
import About from '../About/index'
import { settingLoad } from '../../actions/setting/apis'
import { authLoad } from '../../actions/auth/apis'
import {
  openInDefaultBrowser,
  rendererProcessSend
} from '../../helper/electron'
import checkUpdate from '../../helper/updateCheck'
import '../../styles/app.scss'
import { appMinimize, appQuit, appMaximize } from '../../helper/electron'
class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      checkUpdateDisplay: false
    }
  }

  componentWillMount() {
    this.props.handleSettingLoad()
  }

  componentDidMount() {
    window.onbeforeunload = () => {
      rendererProcessSend('reInitWindowSize')
    }
  }

  handleLoadingOver = () => {
    const { handleAuthLoad, mainVersion, secondaryVersion } = this.props

    setTimeout(() => {
      this.setState({ loading: false })
      handleAuthLoad()
      checkUpdate(mainVersion, secondaryVersion, display =>
        this.setState({ checkUpdateDisplay: display })
      )
      rendererProcessSend('mainWindowReady')
    }, 5000)
  }

  render() {
    const { loading, checkUpdateDisplay } = this.state
    if (loading) {
      return (
        <Router>
          <Loading end={this.handleLoadingOver} />
        </Router>
      )
    } else {
      return (
        <Router>
          <main className="petal-container">

            <article className="petal-container-titlebar">
              <div className="titlebar">
                <div className="titlebar-stoplight">
                  <div className="titlebar-close" onClick={appQuit} title="关闭">
                    <svg x="0px" y="0px" viewBox="0 0 6.4 6.4">
                      <polygon fill="#4d0000" points="6.4,0.8 5.6,0 3.2,2.4 0.8,0 0,0.8 2.4,3.2 0,5.6 0.8,6.4 3.2,4 5.6,6.4 6.4,5.6 4,3.2"></polygon>
                    </svg>
                  </div>
                  <div className="titlebar-minimize" onClick={appMinimize} title="最小化">
                    <svg x="0px" y="0px" viewBox="0 0 8 1.1">
                      <rect fill="#995700" width="8" height="1.1"></rect>
                    </svg>
                  </div>
                  <div className="titlebar-fullscreen" onClick={appMaximize} title="最大化">
                    <svg className="fullscreen-svg" x="0px" y="0px" viewBox="0 0 6 5.9">
                      <path fill="#006400" d="M5.4,0h-4L6,4.5V0.6C5.7,0.6,5.3,0.3,5.4,0z"></path>
                      <path fill="#006400" d="M0.6,5.9h4L0,1.4l0,3.9C0.3,5.3,0.6,5.6,0.6,5.9z"></path>
                    </svg>
                    <svg className="maximize-svg" x="0px" y="0px" viewBox="0 0 7.9 7.9">
                      <polygon fill="#006400" points="7.9,4.5 7.9,3.4 4.5,3.4 4.5,0 3.4,0 3.4,3.4 0,3.4 0,4.5 3.4,4.5 3.4,7.9 4.5,7.9 4.5,4.5"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
              {/*
                <section className="petal-app-control">
                <div>
                  <span className="quit" onClick={appQuit} title="关闭" />
                </div>
                <div>
                  <span className="hide" onClick={appMinimize} title="最小化" />
                </div>
              </section>
              */}
                <div className="more-options">
                {checkUpdateDisplay && (
                  <Label
                    as="a"
                    className="checkupdate"
                    content="新的版本更新♪(^∇^*)"
                    color="green"
                    size="mini"
                    onClick={openInDefaultBrowser(
                      'https://github.com/ilime/Petal/releases'
                    )}
                  />
                )}
              </div>
            </article>
            <article className="petal-container-window">
              <article className="petal-sidebar-container">
                <Sidebar />
              </article>
              <article className="petal-routes-container">
                <FM />
                <Route path="/setting" component={Setting} />
                <Route path="/login" component={Login} />
                <Route path="/redHeartList" component={RedHeart} />
                <Route path="/recentList" component={Recent} />
                <Route path="/trashList" component={Trash} />
                <Route path="/pattern" component={Pattern} />
                <Route path="/personal" component={Personal} />
                <Route path="/sheet" component={Sheet} />
                <Route path="/about" component={About} />
              </article>
            </article>
          </main>
        </Router>
      )
    }
  }
}

Container.propTypes = {
  handleAuthLoad: PropTypes.func.isRequired,
  mainVersion: PropTypes.number.isRequired,
  secondaryVersion: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  mainVersion: state.settingReducer.mainVersion,
  secondaryVersion: state.settingReducer.secondaryVersion
})

const mapDispatchToProps = dispatch => ({
  handleAuthLoad: () => dispatch(authLoad()),
  handleSettingLoad: () => dispatch(settingLoad())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)

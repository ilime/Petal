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
            <article className="petal-sidebar-container">
              <Sidebar />
            </article>
            <article className="petal-routes-container">
              <section className="titlebar">
                <div className="more-options">
                  {checkUpdateDisplay && (
                    <Label
                      as="a"
                      className="checkupdate"
                      content="新的版本更新:)"
                      color="green"
                      size="mini"
                      onClick={openInDefaultBrowser(
                        'https://github.com/ilime/Petal/releases'
                      )}
                    />
                  )}
                </div>
              </section>
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

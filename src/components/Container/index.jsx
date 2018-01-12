import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon, Label } from 'semantic-ui-react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Loading from '../Loading'
import FM from '../FM'
import Login from '../Login'
import Sidebar from '../Sidebar'
import Personal from '../Personal'
import { authLoad } from '../../actions/auth/apis'
import { openInDefaultBrowser, rendererProcessSend } from '../../helper/electron'
import checkUpdate from '../../helper/updateCheck'
import '../../static/app.scss'

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      checkUpdateDisplay: 0
    }
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
      rendererProcessSend('resizeWindowAfterLoading')
      handleAuthLoad()
      checkUpdate(mainVersion, secondaryVersion, display => this.setState({ checkUpdateDisplay: display }))
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
                  {checkUpdateDisplay === 1 &&
                    <Label
                      as="a"
                      className="checkupdate"
                      content='新的版本更新:)'
                      color="green"
                      size="mini"
                      onClick={openInDefaultBrowser('https://github.com/ilime/Petal/releases')} />}
                  <Icon name="cube" color="grey" />
                </div>
              </section>
              <FM />
              <Route path='/login' component={Login} />
              <Route path='/personal' component={Personal} />
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

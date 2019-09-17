import { Button, Header, Item } from 'semantic-ui-react'
import { Link, Route } from 'react-router-dom'
import React, { Component } from 'react'

import Downloads from './Downloads'
import PropTypes from 'prop-types'
import Shares from './Shares'
import { authRemove } from '../../actions/auth/apis'
import { connect } from 'react-redux'

class Personal extends Component {
  componentDidMount() {
    document.querySelector('.fm-region').style.display = 'none'
  }

  componentWillUnmount() {
    if (this.props.history.location.pathname === '/') {
      document.querySelector('.fm-region').style.display = 'flex'
    }
  }

  handleAuthRemoveWrapper = () => {
    this.props.handleAuthRemove(() => this.props.history.push('/'))
  }

  render() {
    const { userInfo } = this.props

    return (
      <article className="petal-personal">
        <Header as="h2">档案</Header>
        <div className="main-view">
          <Item.Group unstackable>
            <Item>
              <Item.Image className="avatar-icon" src={userInfo.icon} />
              <Item.Content>
                <Item.Header as="a">{userInfo.name}</Item.Header>
                <Item.Meta>
                  <p>已听 {userInfo.played_num} 首</p>
                  <p>红心 {userInfo.liked_num} 首</p>
                  <p>垃圾桶 {userInfo.banned_num} 首</p>
                </Item.Meta>
              </Item.Content>
            </Item>
          </Item.Group>
          <div className="operations">
            <Link to="/personal/downloads">
              <Button basic size="small">
                下载管理
              </Button>
            </Link>
            <Link to="/personal/shares">
              <Button basic size="small">
                分享管理
              </Button>
            </Link>
          </div>
          <Button fluid negative onClick={this.handleAuthRemoveWrapper}>
            退出登录
          </Button>
        </div>
        <Route path="/personal/downloads" component={Downloads} />
        <Route path="/personal/shares" component={Shares} />
      </article>
    )
  }
}

Personal.propTypes = {
  userInfo: PropTypes.object.isRequired,
  handleAuthRemove: PropTypes.func
}

const mapStateToProps = state => ({
  userInfo: state.authReducer.userInfo
})

const mapDispatchToProps = dispatch => ({
  handleAuthRemove: callback => authRemove(dispatch, callback)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Personal)

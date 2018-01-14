import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Header, Item, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { authRemove } from '../../actions/auth/apis'

class Personal extends Component {
  constructor(props) {
    super(props)
  }

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
        <Header as='h2'>档案</Header>
        <Item.Group unstackable>
          <Item>
            <Item.Image className="avatar-icon" size='tiny' src={userInfo.icon} />
            <Item.Content>
              <Item.Header as='a'>{userInfo.name}</Item.Header>
              <Item.Meta>
                <p>已听 {userInfo.played_num} 首</p>
                <p>红心 {userInfo.liked_num} 首</p>
                <p>垃圾桶 {userInfo.banned_num} 首</p>
              </Item.Meta>
            </Item.Content>
          </Item>
        </Item.Group>
        <Button fluid negative onClick={this.handleAuthRemoveWrapper}>退出登录</Button>
      </article>
    )
  }
}

Personal.propTypes = {
  userInfo: PropTypes.object.isRequired,
  handleAuthRemove: PropTypes.func
}

const mapStateToProps = state => {
  return {
    userInfo: state.authReducer.userInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleAuthRemove: callback => authRemove(dispatch, callback)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Personal)

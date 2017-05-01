'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, Header, Button, Icon } from 'semantic-ui-react'

import { authRemove } from '../../actions/auth/apis'
import './index.scss'

class Setting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'setting'
    }
  }

  handleAuthRemove = () => {
    this.props.handleAuthRemove()
    this.props.handleClose()
  }

  changeFocus = (e, name) => {
    e.stopPropagation()
    this.setState({ activeItem: name })
  }

  stopProp = e => { e.stopPropagation() }

  render() {
    const { activeItem } = this.state
    const Tab = ({ name, active, onClick, activeClass }) => (
      <li className={active ? (activeClass ? activeClass : 'active') : ''} onClick={onClick}>{name}</li>
    )

    return (
      <div className='mask'
        onClick={this.props.handleClose}
        style={{ 'display': this.props.open ? 'block' : 'none' }}>
        <div className='layer'>
          <nav className='layer-nav'>
            <ul>
              <Tab name='设置' active={activeItem === 'setting'} onClick={e => this.changeFocus(e, 'setting')} />
              <Tab name='关于' active={activeItem === 'about'} onClick={e => this.changeFocus(e, 'about')} />
            </ul>
          </nav>
          <div className="layer-content">
            <div className={activeItem === 'setting' ? 'active' : ''} onClick={this.stopProp}>1</div>
            <div className={activeItem === 'about' ? 'active' : ''} onClick={this.stopProp}>2</div>
          </div>
        </div>
      </div>
    )
  }
}

Setting.PropTypes = {
  _id: PropTypes.number.isRequired,
  handleAuthRemove: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    _id: state.authReducer._id
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleAuthRemove: () => authRemove(dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting)
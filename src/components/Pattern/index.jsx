import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon, Header, Button, Image } from 'semantic-ui-react'
import { selectPattern, recentPattern, redheartPattern } from '../../actions/fm/actions'
import { playlistGET } from '../../actions/fm/apis'
import { rendererProcessSend } from '../../helper/electron'

class Pattern extends Component {
  constructor(props) {
    super(props)
    this._patterns = new Map([
      ['select', () => {
        props.switchToSelect()
        props.getPlaylist('new')
      }],
      ['recent', () => {
        props.switchToRecent()
      }],
      ['redheart', () => {
        props.switchToRedheart()
      }]
    ])
  }

  componentDidMount() {
    document.querySelector('.fm-region').style.display = 'none'
  }

  componentWillUnmount() {
    if (this.props.history.location.pathname === '/') {
      document.querySelector('.fm-region').style.display = 'flex'
    }
  }

  /**
   * Handle switch pattern
   * 
   * 1. select
   * 2. recent
   * 3. redheart
   * 
   * @memberof Pattern
   */
  handleSwitchPattern = name => {
    const { pattern } = this.props

    if (pattern !== name) {
      this._patterns.get(name)()
      rendererProcessSend('touchBarResetPause')
      rendererProcessSend('patternSwitch', name)
    }
    this.props.history.push('/')
  }

  render() {
    const { _id, avatar, pattern } = this.props

    return (
      <article className="petal-pattern">
        <Header as="h2">兆赫</Header>
        <div className="default-MHz">
          <Button basic className={pattern === 'select' ? 'selected' : ''} onClick={() => this.handleSwitchPattern('select')}><Icon name='leaf' /> 豆瓣精选 MHz</Button>
          {_id === 1 && <Button basic className={pattern === 'redheart' ? 'selected' : ''} onClick={() => this.handleSwitchPattern('redheart')}><Icon name='heart' /> 红心</Button>}
          {_id === 1 && <Button basic className={pattern === 'recent' ? 'selected' : ''} onClick={() => this.handleSwitchPattern('recent')}><Icon name='history' /> 最近收听</Button>}
          {_id === 1 && <Button basic><Image src={avatar} avatar /> 我的私人 MHz</Button>}
        </div>
      </article >
    )
  }
}

Pattern.propTypes = {
  _id: PropTypes.number.isRequired,
  avatar: PropTypes.string,
  pattern: PropTypes.string.isRequired,
  getPlaylist: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    _id: state.authReducer._id,
    avatar: state.authReducer.userInfo.icon,
    pattern: state.fmReducer.pattern
  }
}

const mapDispatchToProps = dispatch => {
  return {
    switchToSelect: () => dispatch(selectPattern),
    switchToRecent: () => dispatch(recentPattern),
    switchToRedheart: () => dispatch(redheartPattern),
    getPlaylist: type => dispatch(playlistGET(type))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pattern)

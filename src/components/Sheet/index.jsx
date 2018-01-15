import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Header, Item, Image } from 'semantic-ui-react'
import { dailyPattern } from '../../actions/fm/actions'
import { rendererProcessSend } from '../../helper/electron'

class Sheet extends Component {
  componentDidMount() {
    document.querySelector('.fm-region').style.display = 'none'
  }

  componentWillUnmount() {
    if (this.props.history.location.pathname === '/') {
      document.querySelector('.fm-region').style.display = 'flex'
    }
  }

  handleDailyPlay = () => {
    if (this.props.pattern !== 'daily') {
      rendererProcessSend('touchBarResetPause')
      rendererProcessSend('patternSwitch', 'daily')
    }
    this.props.switchToDailyPattern()
    this.props.history.push('/')
  }

  render() {
    const { _id, daily } = this.props

    return (
      <article className="petal-sheet">
        <Header as="h2">歌单</Header>
        <Item.Group divided>
          {_id === 1 && <Item>
            <Item.Image src={daily.songs[0].picture} label={{ as: 'a', corner: 'right', icon: 'play', onClick: this.handleDailyPlay }} />
            <Item.Content className="daily-content">
              <Item.Header>{daily.title}</Item.Header>
              <Item.Meta><Image avatar src={daily.creator.picture} /> {daily.creator.name}</Item.Meta>
              <Item.Description>{daily.description}</Item.Description>
            </Item.Content>
          </Item>}
        </Item.Group>
      </article>
    )
  }
}

Sheet.propTypes = {
  _id: PropTypes.number.isRequired,
  pattern: PropTypes.string,
  daily: PropTypes.object,
  // switchToSheetPattern: PropTypes.func,
  // handleSheetSet: PropTypes.func
}

const mapStateToProps = state => {
  return {
    _id: state.authReducer._id,
    pattern: state.fmReducer.pattern,
    daily: state.fmReducer.daily
  }
}

const mapDispatchToProps = dispatch => {
  return {
    switchToDailyPattern: () => dispatch(dailyPattern),
    // switchToSheetPattern: () => dispatch(sheetPattern),
    // handleSheetSet: list => dispatch(sheetSet(list))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sheet)

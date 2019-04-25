import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Header, Item, Image } from 'semantic-ui-react'
import { songLyricGET } from '../../actions/fm/apis'
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

  handleLyricUpdated = () => {
    if (this.props.lyricGlobalDisplay) {
      this.props.handleSongLyricGET()
    }
  }

  handleDailyPlay = () => {
    if (this.props.pattern !== 'daily') {
      rendererProcessSend('touchBarResetPause')
      rendererProcessSend('patternSwitch', 'daily')
    }
    this.props.switchToDailyPattern()
    this.handleLyricUpdated()
    this.props.history.push('/')
  }

  render() {
    const { _id, daily } = this.props

    return (
      <article className="petal-sheet">
        <Header as="h2">歌单</Header>
        <Item.Group divided>
          {_id === 1 && (
            <Item>
              <Item.Image
                className="daily-image"
                src={daily.songs[0].picture}
                label={{
                  as: 'a',
                  corner: 'right',
                  icon: 'play',
                  onClick: this.handleDailyPlay
                }}
              />
              <Item.Content>
                <Item.Header>{daily.title}</Item.Header>
                <Item.Meta>由{daily.creator.name}创建</Item.Meta>
                <Item.Description>{daily.description}</Item.Description>
              </Item.Content>
            </Item>
          )}
        </Item.Group>
      </article>
    )
  }
}

Sheet.propTypes = {
  _id: PropTypes.number.isRequired,
  pattern: PropTypes.string,
  daily: PropTypes.object,
  lyricGlobalDisplay: PropTypes.bool,
  handleSongLyricGET: PropTypes.func
  // switchToSheetPattern: PropTypes.func,
  // handleSheetSet: PropTypes.func
}

const mapStateToProps = state => {
  return {
    _id: state.authReducer._id,
    pattern: state.fmReducer.pattern,
    daily: state.fmReducer.daily,
    lyricGlobalDisplay: state.fmReducer.lyricDisplay
  }
}

const mapDispatchToProps = dispatch => {
  return {
    switchToDailyPattern: () => dispatch(dailyPattern),
    handleSongLyricGET: () => dispatch(songLyricGET())
    // switchToSheetPattern: () => dispatch(sheetPattern),
    // handleSheetSet: list => dispatch(sheetSet(list))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sheet)

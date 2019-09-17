import { Button, Confirm, Header, Icon, Item } from 'semantic-ui-react'
import React, { Component } from 'react'

import db from '../../helper/db'

class Shares extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      link: undefined,
      shares: []
    }
  }

  componentDidMount() {
    document.querySelector('.petal-personal .main-view').style.display = 'none'
    this.loadShares()
  }

  componentWillUnmount() {
    document.querySelector('.petal-personal .main-view').style.display = 'block'
  }

  handleReturnPrev = () => {
    this.props.history.push('/personal')
  }

  loadShares = () => {
    db.find({ usedFor: 'share' }, (err, docs) => {
      this.setState({
        shares: docs
      })
    })
  }

  removeShare = link => {
    db.remove({ shareLink: link }, {}, (err, numRemoved) => {
      console.log('Removed: ', numRemoved)
      this.loadShares()
    })
  }

  show = link => this.setState({ open: true, link })
  handleConfirm = () => {
    this.setState({ open: false })
    this.removeShare(this.state.link)
  }
  handleCancel = () => this.setState({ open: false })

  render() {
    return (
      <article className="petal-personal-shares">
        <Header as="h3">所有分享</Header>
        <Icon
          name="close"
          className="close-page"
          onClick={this.handleReturnPrev}
        />
        <Item.Group divided unstackable  relaxed={true}>
          {this.state.shares.length > 0 &&
            this.state.shares.map(album => {
              return (
                <Item key={album.albumtitle}>
                  <Item.Image
                    className="album-picture"
                    size="tiny"
                    src={album.sharePicture}
                  />
                  <Item.Content>
                    <Item.Header as="h4">{album.albumtitle}</Item.Header>
                    <Item.Description>{album.shareLink}</Item.Description>
                    <Item.Extra>
                      <Button
                        basic
                        size="tiny"
                        icon="trash"
                        onClick={() => this.show(album.shareLink)}
                      />
                    </Item.Extra>
                  </Item.Content>
                </Item>
              )
            })}
        </Item.Group>
        <Confirm
          open={this.state.open}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          content="确认从分享中移除此专辑？"
          cancelButton={<Button size="tiny" negative>取消</Button>}
          confirmButton={<Button size="tiny" positive>确认</Button>}
          size="mini"
        />
      </article>
    )
  }
}

export default Shares

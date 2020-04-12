import { Button, Confirm, Header, Icon, List } from 'semantic-ui-react'
import React, { Component } from 'react'

import db from '../../helper/db'
import { removeFile } from '../../helper/utils'

class Downloads extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      path: undefined,
      downloads: [],
    }
  }

  componentDidMount() {
    document.querySelector('.petal-personal .main-view').style.display = 'none'
    this.loadDownloads()
  }

  componentWillUnmount() {
    document.querySelector('.petal-personal .main-view').style.display = 'block'
  }

  handleReturnPrev = () => {
    this.props.history.push('/personal')
  }

  loadDownloads = () => {
    db.find({ usedFor: 'download' }, (err, docs) => {
      this.setState({
        downloads: docs,
      })
    })
  }

  removeDownload = (path) => {
    db.remove({ path }, {}, (err, numRemoved) => {
      console.log('Removed: ', numRemoved)
      removeFile(path)
      this.loadDownloads()
    })
  }

  show = (path) => this.setState({ open: true, path })
  handleConfirm = () => {
    this.setState({ open: false })
    this.removeDownload(this.state.path)
  }
  handleCancel = () => this.setState({ open: false })

  render() {
    return (
      <article className="petal-personal-downloads">
        <Header as="h3">所有下载</Header>
        <Icon name="close" className="close-page" onClick={this.handleReturnPrev} />
        <List ordered verticalAlign="middle" relaxed={true}>
          {this.state.downloads.length > 0 &&
            this.state.downloads.map((song) => (
              <List.Item key={song.title}>
                <List.Content floated="right">
                  <Button basic size="tiny" icon="trash" onClick={() => this.show(song.path)} />
                </List.Content>
                <List.Content>
                  <List.Header>{song.title}</List.Header>
                  <List.Description>{song.artist}</List.Description>
                </List.Content>
              </List.Item>
            ))}
        </List>
        <Confirm
          open={this.state.open}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          content="确认从下载中移除此歌曲？"
          cancelButton={
            <Button size="tiny" negative>
              取消
            </Button>
          }
          confirmButton={
            <Button size="tiny" positive>
              确认
            </Button>
          }
          size="mini"
        />
      </article>
    )
  }
}

export default Downloads

import React, { Component } from 'react'
import { Header, Button } from 'semantic-ui-react'

class Shares extends Component {
  componentDidMount() {
    document.querySelector('.petal-personal .main-view').style.display = 'none'
  }

  componentWillUnmount() {
    document.querySelector('.petal-personal .main-view').style.display = 'block'
  }

  handleReturnPrev = () => {
    this.props.history.push('/personal')
  }

  render() {
    return (
      <article className="petal-personal-shares">
        <Header as="h3">所有分享</Header>
        <Button
          className="close-page"
          floated="right"
          circular
          icon="close"
          onClick={this.handleReturnPrev}
        />
      </article>
    )
  }
}

export default Shares

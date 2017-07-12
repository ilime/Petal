import React, { Component } from 'react'

class Music extends Component {
  componentDidMount() {
    document.querySelector('.fmRegion').style.display = 'none'
  }

  componentWillUnmount() {
    if (this.props.history.location.pathname === '/') {
      document.querySelector('.fmRegion').style.display = 'block'
    }
  }

  render() {
    return (
      <article className='comingSoon'>
        <h1>Coming Soon</h1>
      </article>
    )
  }
}

export default Music
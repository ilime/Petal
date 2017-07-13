import React, { Component } from 'react'
import Main from './Main'
import About from './About'

class Setting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'setting'
    }
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
        style={{ 'display': this.props.open ? 'block' : 'none' }}>
        <div className='layer'>
          <nav className='layer-nav'>
            <ul>
              <Tab name='设置' active={activeItem === 'setting'} onClick={e => this.changeFocus(e, 'setting')} />
              <Tab name='关于' active={activeItem === 'about'} onClick={e => this.changeFocus(e, 'about')} />
            </ul>
          </nav>
          <article className="layer-content">
            <section className={activeItem === 'setting' ? 'active' : ''} onClick={this.stopProp}>
              <Main handleClose={this.props.handleClose} />
            </section>
            <section className={activeItem === 'about' ? 'active' : ''} onClick={this.stopProp}>
              <About />
            </section>
          </article>
        </div>
      </div>
    )
  }
}

export default Setting
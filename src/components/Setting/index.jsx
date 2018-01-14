import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import Main from './Main'
import About from './About'

const panes = [
  { menuItem: '设置', render: () => <Tab.Pane attached={false}><Main /></Tab.Pane> },
  { menuItem: '关于', render: () => <Tab.Pane attached={false}><About /></Tab.Pane> },
]

class Setting extends Component {
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

  render() {
    return (
      <article className="petal-setting">
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </article>
    )
  }
}

export default Setting

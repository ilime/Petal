import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { NavLink } from 'react-router-dom'
import { Sidebar } from '../src/components/Sidebar/index.jsx'

describe('<Sidebar />', () => {
  const wrapper = shallow(<Sidebar />)
  const toArray = ['/', '/read', '/movie', '/music', '/login']

  test('navlink worked as expectly', () => {
    let index = 0
    wrapper.find(NavLink).forEach(l => {
      expect(l.props().to).toBe(toArray[index++])
    })
  })
})
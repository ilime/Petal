import React from 'react'
import { shallow } from 'enzyme'
import { NavLink, Link } from 'react-router-dom'
import { Sidebar } from '../src/components/Sidebar/index.jsx'

describe('<Sidebar />', () => {
  const wrapper = shallow(<Sidebar _id={0} />)
  const toArray = ['/', '/login']

  test('navlink worked as expectly', () => {
    let index = 0
    wrapper.find(NavLink).forEach(l => {
      expect(l.props().to).toBe(toArray[index++])
    })
  })

  test('navlink active class', () => {
    expect(wrapper.find(NavLink).first().props().activeClassName).toBe('selected')
  })

  test('login navlink change', () => {
    let wrapperWithId = shallow(<Sidebar _id={1} />)
    expect(wrapperWithId.find(Link).props().to).toMatch('/personal')
  })
})

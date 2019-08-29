import React from 'react'
import { shallow } from 'enzyme'
import { Menu } from 'semantic-ui-react'
import { Sidebar } from '../components/Sidebar/index.jsx'

describe('<Sidebar />', () => {
  window.require = jest.fn()

  const wrapper = shallow(<Sidebar _id={0} />)
  const withoutAuthRoutes = ['/', '/pattern', '/setting', '/about', '/login']
  const authRoutes = [
    '/',
    '/pattern',
    '/sheet',
    '/redHeartList',
    '/recentList',
    '/trashList',
    '/setting',
    '/about',
    '/personal'
  ]

  test('navlink worked as expectly', () => {
    let index = 0
    wrapper.find(Menu.Item).forEach(l => {
      expect(l.props().to).toBe(withoutAuthRoutes[index++])
    })
  })

  test('navlink active class', () => {
    expect(
      wrapper
        .find(Menu.Item)
        .first()
        .props().activeClassName
    ).toBe('active')
  })

  test('after login, navlink change', () => {
    let wrapperWithId = shallow(<Sidebar _id={1} />)
    let index = 0
    wrapperWithId.find(Menu.Item).forEach(l => {
      expect(l.props().to).toMatch(authRoutes[index++])
    })
  })
})

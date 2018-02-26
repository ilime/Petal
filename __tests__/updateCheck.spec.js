import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import checkUpdate from '../src/helper/updateCheck'

const mock = new MockAdapter(axios)

mock
  .onGet('https://api.github.com/repos/ilime/Petal/releases/latest')
  .reply(200, {
    tag_name: 'v2.0.0'
  })

describe('need update', () => {
  test('yes', () => {
    checkUpdate(1, 0).then(data => expect(data).toBeTruthy())
  })

  test('yes', () => {
    checkUpdate(1, 3).then(data => expect(data).toBeTruthy())
  })

  test('no', () => {
    checkUpdate(2, 0).then(data => expect(data).toBeFalsy())
  })

  test('no', () => {
    checkUpdate(2, 1).then(data => expect(data).toBeFalsy())
  })

  test('no', () => {
    checkUpdate(3, 0).then(data => expect(data).toBeFalsy())
  })

  test('no', () => {
    checkUpdate(3, 1).then(data => expect(data).toBeFalsy())
  })
})

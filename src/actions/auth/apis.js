'use strict'

import axios from 'axios'
import moment from 'moment'

import {
  authLoginRequest,
  authLoginResponse,
  authLoginFail,
  authTokenLoad,
  authLogout
} from './types'

import {
  selectPattern,
  recentEmpty,
  redHeartEmpty,
  trashEmpty
} from '../fm/types'
import {
  playlistGET,
  recentListGET,
  redHeartListGET,
  trashListGET,
  userInfoGET
} from '../fm/apis'
import {
  settingLoad
} from '../setting/apis'
import oToFd from '../../helper/objToFormD'
import db from '../../helper/db'

const AUTH_URL = 'https://www.douban.com/service/auth2/token' // Auth Url

// Fixed params for logining
const authFixedParams = {
  alt: 'json',
  apikey: '02646d3fb69a52ff072d47bf23cef8fd',
  client_id: '02646d3fb69a52ff072d47bf23cef8fd',
  client_secret: 'cde5d61429abcd7c',
  device_id: '8ff78b4d03654c0dbc63d318fc7a065289a90af2',
  douban_udid: '826390ea40bf43b0ee04d44a233b2511fcd76a8b',
  grant_type: 'password',
  redirect_uri: 'http://www.douban.com/mobile/fm',
  udid: '8ff78b4d03654c0dbc63d318fc7a065289a90af2'
}

/**
 * Deal with logining request, need username and password, POST method
 * usernameAndPassword => {
 *   'username': '',
 *   'password': '' 
 * }
 * 
 * The callback function will execute after db store userToken
 * for example, handle redirect
 * 
 * @param {Object} usernameAndPassword - username and password
 * @param {Function} callback - callback function defined
 * @returns {Function} - a thunk func which return Axios login request
 */
export const authPost = (usernameAndPassword, callback) => {
  return dispatch => {
    dispatch(authLoginRequest())
    return axios({
      method: 'POST',
      url: AUTH_URL,
      data: oToFd(Object.assign(authFixedParams, usernameAndPassword)),
    }).then(response => {
      const userToken = response.data
      dispatch(authLoginResponse(userToken))
      dispatch(userInfoGET())
      dispatch(recentListGET())
      dispatch(redHeartListGET())
      dispatch(trashListGET())
      dispatch(playlistGET('new'))
      db.insert({
        _id: 1,
        userToken,
        time: [moment().year(), moment().month() + 1, moment().date()]
      }, (err, doc) => {
        console.log(doc)
      })
      if (typeof callback === 'function') {
        callback()
      }
    }).catch(() => {
      dispatch(authLoginFail('请检查账号或密码是否正确'))
    })
  }
}

/**
 * Deal with loading user info from db file
 * 
 * @returns {Function} - a thunk function
 */
export const authLoad = () => {
  return dispatch => {
    dispatch(settingLoad())
    db.findOne({
      _id: 1
    }, (err, doc) => {
      if (doc !== null) {
        let now = [moment().year(), moment().month() + 1, moment().date()],
          fromNow = moment(now).diff(doc.time, 'days')

        // remove user info when already logined 80 days
        console.log('token storage time ' + fromNow + ' day(s)')
        if (fromNow === 80) {
          db.remove({
            _id: 1
          })
          dispatch(playlistGET('new'))
        } else {
          dispatch(authTokenLoad(doc))
          dispatch(userInfoGET())
          dispatch(recentListGET())
          dispatch(redHeartListGET())
          dispatch(trashListGET())
          dispatch(playlistGET('new'))
        }
      } else {
        dispatch(playlistGET('new'))
      }
    })
  }
}

/**
 * Deal with Loging out
 * 
 * @param {any} dispatch - dispatch function
 * @param {any} callback - callback function defined
 */
export const authRemove = (dispatch, callback) => {
  db.remove({
    _id: 1
  }, (err, numRemoved) => {
    console.log('token remove: num(' + numRemoved + ')')
    if (typeof callback === 'function') {
      callback()
    }
    dispatch(authLogout())
    dispatch(recentEmpty())
    dispatch(redHeartEmpty())
    dispatch(trashEmpty())
    dispatch(selectPattern)
    dispatch(playlistGET('new'))
  })
}
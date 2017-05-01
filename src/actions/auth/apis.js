'use strict'

import axios from 'axios'

import {
  authLoginRequest, authLoginResponse,
  authTokenLoad, authLogout
} from './types'

import { recentEmpty, redHeartEmpty, trashEmpty } from '../fm/types'
import { playlistGET, recentListGET, redHeartListGET, trashListGET } from '../fm/apis'
import oToFd from '../../helper/objToFormD'
import db from '../../helper/db'

const AUTH_URL = 'https://www.douban.com/service/auth2/token'

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

export const authPost = (usernameAndPassword) => {
  return (dispatch, getState) => {
    dispatch(authLoginRequest())
    return axios({
      method: 'POST',
      url: AUTH_URL,
      data: oToFd(Object.assign(authFixedParams, usernameAndPassword)),
    }).then(response => {
      const userToken = response.data
      dispatch(authLoginResponse(userToken))
      dispatch(recentListGET())
      dispatch(redHeartListGET())
      dispatch(trashListGET())
      dispatch(playlistGET('new'))
      db.insert({
        _id: 1,
        userToken
      }, (err, doc) => {
        console.log(doc)
      })
    }).catch(console.log)
  }
}

export const authLoad = () => {
  return (dispatch, getState) => {
    db.findOne({ _id: 1 }, (err, doc) => {
      if (doc !== null) {
        dispatch(authTokenLoad(doc))
        dispatch(recentListGET())
        dispatch(redHeartListGET())
        dispatch(trashListGET())
        dispatch(playlistGET('new'))
      } else {
        dispatch(playlistGET('new'))
      }
    })
  }
}

export const authRemove = dispatch => {
  db.remove({ _id: 1 }, (err, doc) => {
    dispatch(authLogout())
    dispatch(recentEmpty())
    dispatch(redHeartEmpty())
    dispatch(trashEmpty())
    dispatch(playlistGET('new'))
  })
}
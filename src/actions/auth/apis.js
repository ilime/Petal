import axios from 'axios'

import * as actions from './actions'
import { selectPattern, recentEmpty, redHeartEmpty, trashEmpty, dailyEmpty } from '../fm/actions'
import {
  playlistGET,
  recentListGET,
  redHeartListGET,
  trashListGET,
  userInfoGET,
  appChannelGET,
  dailyListGET,
} from '../fm/apis'
import oToFd from '../../helper/objToFormD'
import db from '../../helper/db'
import { rendererProcessSend } from '../../helper/electron'

const AUTH_URL = 'https://www.douban.com/service/auth2/token?udid=cf9aed3a0bc54032661c6f84d220b1f28d3722ec' // Auth Url

// Fixed params for logining
const authFixedParams = {
  client_id: '02f7751a55066bcb08e65f4eff134361',
  client_secret: '63cf04ebd7b0ff3b',
  grant_type: 'password',
  redirect_uri: 'http://douban.fm',
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
  return (dispatch) => {
    dispatch(actions.authLoginRequest())
    return axios({
      method: 'POST',
      url: AUTH_URL,
      data: oToFd(Object.assign(authFixedParams, usernameAndPassword)),
    })
      .then((response) => {
        const data = response.data
        const userToken = {
          access_token: data.access_token,
          douban_user_name: data.douban_user_name,
        }
        dispatch(actions.authLoginResponse(userToken))
        dispatch(selectPattern())
        rendererProcessSend('FMResetPause')
        rendererProcessSend('patternSwitch', 'select')
        dispatch(playlistGET('new'))

        dispatch(appChannelGET())
        dispatch(userInfoGET())

        dispatch(dailyListGET())
        dispatch(recentListGET())
        dispatch(redHeartListGET())
        dispatch(trashListGET())
        db.insert(
          {
            _id: 1,
            userToken,
            time: new Date().getTime(),
          },
          (err, doc) => {
            console.log(doc)
          }
        )
        if (typeof callback === 'function') {
          callback()
        }
      })
      .catch(() => {
        dispatch(actions.authLoginFail('请检查账号或密码是否正确'))
      })
  }
}

/**
 * Deal with loading user info from db file
 *
 * @returns {Function} - a thunk function
 */
export const authLoad = () => {
  return (dispatch) => {
    db.findOne(
      {
        _id: 1,
      },
      (err, doc) => {
        if (doc !== null) {
          const now = new Date().getTime()
          const fromNow = now - doc.time
          const fromNowDisplay = fromNow / (1000 * 60 * 60 * 24)

          // remove user info when already logged 60 days
          console.log('token storage time ' + fromNowDisplay + ' day(s)')
          if (fromNow > 5184000000) {
            db.remove({
              _id: 1,
            })
            dispatch(playlistGET('new'))
            dispatch(appChannelGET())
          } else {
            dispatch(actions.authTokenLoad(doc))

            dispatch(playlistGET('new'))

            dispatch(appChannelGET())
            dispatch(userInfoGET())

            dispatch(dailyListGET())
            dispatch(recentListGET())
            dispatch(redHeartListGET())
            dispatch(trashListGET())
          }
        } else {
          dispatch(playlistGET('new'))
          dispatch(appChannelGET())
        }
      }
    )
    rendererProcessSend('resizeWindowAfterLoading')
    rendererProcessSend('patternSwitch', 'select')
  }
}

/**
 * Deal with Loging out
 *
 * @param {any} dispatch - dispatch function
 * @param {any} callback - callback function defined
 */
export const authRemove = (dispatch, callback) => {
  db.remove(
    {
      _id: 1,
    },
    (err, numRemoved) => {
      console.log('token remove: num(' + numRemoved + ')')
      if (typeof callback === 'function') {
        callback()
      }
      dispatch(actions.authLogout())
      dispatch(selectPattern())
      rendererProcessSend('FMResetPause')
      rendererProcessSend('patternSwitch', 'select')
      dispatch(playlistGET('new'))

      dispatch(appChannelGET())
      dispatch(dailyEmpty())
      dispatch(recentEmpty())
      dispatch(redHeartEmpty())
      dispatch(trashEmpty())
    }
  )
}

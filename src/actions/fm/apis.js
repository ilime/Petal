import axios from 'axios'
import moment from 'moment'

import * as actions from './actions'
import { userInfo } from '../auth/actions'

import oToFd from '../../helper/objToFormD'

const FM_ROOT_URL = 'https://api.douban.com/v2/fm' // Root Url

// Fixed params for fm's operations
const fixedParams = {
  apikey: '02f7751a55066bcb08e65f4eff134361',
  version: 651,
  audio_patch_version: 4,
  app_name: 'radio_android',
  user_accept_play_third_party: 0,
  client: 's%3Amobile%7Cv%3A4.6.11%7Cy%3Aandroid+7.1.1%7Cf%3A651%7Cm%3AXiaomi%7Cd%3Acf9aed3a0bc54032661c6f84d220b1f28d3722ec%7Ce%3Axiaomi_mi_6',
  udid: 'cf9aed3a0bc54032661c6f84d220b1f28d3722ec',
  push_device_id: '3ec7f0336d3a0e6db6b07b9f9a2c1f304f3ef154'
}

/**
 * Douban.Fm playlist types
 * 
 * 1. new => new playlist, used when play pattern switch, app init and so on
 * 2. playing => when current playlist finished, continue get playlist
 * 3. skip => skip current playlist
 * 4. trash => trash current song, log it into trash list
 * 5. rate => like current song, log it into redheart list
 * 6. unrate => unlike current song, remove it from redheart list
 * 7. end => use when song ended, log current song into recent list
 */
const playlistTypes = {
  new: actions.playlistNewRequest,
  playing: actions.playlistPlayingRequest,
  skip: actions.playlistSkipRequest,
  trash: actions.playlistTrashRequest,
  rate: actions.redHeartRate,
  unrate: actions.redHeartUnRate,
  end: actions.playlistEndRequest
}

// Playlist url without type and sid
const playlistOriginUrl = FM_ROOT_URL +
  '/playlist?' +
  Object.entries(fixedParams)
    .reduce((previous, [key, value]) => {
      return previous + key + '=' + value + '&'
    }, '') +
  'pt=0.0&format=null&kbps=128&pb=128&from='

/**
 * get lyric through the song's sid and album's ssid
 * 
 * @param {string} sid 
 * @param {string} ssid 
 * @returns {Axios} - Axios instance
 */
// export const songLyricGET = (sid, ssid) => {
//   return axios.get(FM_ROOT_URL +
//     '/lyric?' +
//     'sid=' + sid +
//     '&ssid=' + ssid
//   )
// }

/**
 * Core function, get playlist
 * 
 * @param {string} type - playlist type
 * @returns - a thunk function which handle playlist operation
 */
export const playlistGET = type => {
  return (dispatch, getState) => {
    // loading before get playlist songs
    if (type !== 'rate' && type !== 'unrate' && type !== 'end') {
      dispatch(actions.playlistLoading())
    }
    dispatch(playlistTypes[type]()) // dispatch action according playlistTypes
    axios(Object.assign({
      method: 'GET',
      url: playlistOriginUrl +
            '&channel=' + getState()
        .fmReducer.channelId +
            '&type=' + getState()
        .fmReducer.type +
            '&sid=' + (type !== 'new' ? getState()
        .fmReducer.sid : '')
    },
      // is login
    getState()
      .authReducer._id === 1 && {
      headers: {
        'Authorization': 'Bearer ' + getState()
          .authReducer.userToken.access_token
      }
    }
    ))
      .then(response => {
        if (type === 'end' || type === 'rate' || type === 'unrate') { return }
        let playlist = response.data,
          song = playlist.song[0],
          sid = song.sid,
          ssid = song.ssid
        // if type is rate or unrate, the next similar song will add into current songs array
        dispatch(actions.playlistResponse(sid, ssid, song))
      })
      .catch(console.log)
  }
}

// app channel
const appChannelOriginUrl = FM_ROOT_URL +
  '/app_channels?' +
  Object.entries(fixedParams)
    .reduce((previous, [key, value]) => {
      return previous + key + '=' + value + '&'
    }, '')

export const appChannelGET = () => {
  return (dispatch, getState) => {
    return axios(
      Object.assign({
        method: 'GET',
        url: appChannelOriginUrl
      }, getState()
        .authReducer._id === 1 && {
        headers: {
          'Authorization': 'Bearer ' + getState()
            .authReducer.userToken.access_token
        }
      })
    )
      .then(response => {
        let data = response.data.groups
        dispatch(actions.appChannel(data.slice(1, data.length - 1)))
      })
      .catch(console.log)
  }
}

const dailyOriginUrl = FM_ROOT_URL +
  '/songlist/user_daily/?' +
  Object.entries(fixedParams)
    .reduce((previous, [key, value]) => {
      return previous + key + '=' + value + '&'
    }, '') +
  'kbps=128'

export const dailyListGET = () => {
  return (dispatch, getState) => {
    return axios(
      Object.assign({
        method: 'GET',
        url: dailyOriginUrl
      }, getState()
        .authReducer._id === 1 && {
        headers: {
          'Authorization': 'Bearer ' + getState()
            .authReducer.userToken.access_token
        }
      })
    )
      .then(response => {
        dispatch(actions.dailyList(response.data))
      })
      .catch(console.log)
  }
}

// Recent list url
const recentOriginUrl = FM_ROOT_URL +
  '/recent_played_tracks?' +
  Object.entries(fixedParams)
    .reduce((previous, [key, value]) => {
      return previous + key + '=' + value + '&'
    }, '') +
  'limit=100&kbps=128'

export const recentListGET = () => {
  return (dispatch, getState) => {
    return axios(
      Object.assign({
        method: 'GET',
        url: recentOriginUrl
      }, getState()
        .authReducer._id === 1 && {
        headers: {
          'Authorization': 'Bearer ' + getState()
            .authReducer.userToken.access_token
        }
      })
    )
      .then(response => {
        dispatch(actions.recentList(response.data))
      })
      .catch(console.log)
  }
}

// Redheart list url
const redHeartSidsOriginUrl = FM_ROOT_URL +
  '/redheart/basic?' +
  Object.entries(fixedParams)
    .reduce((previous, [key, value]) => {
      return previous + key + '=' + value + '&'
    }, '')

export const redHeartListGET = () => {
  return (dispatch, getState) => {
    return axios(
      Object.assign({
        method: 'GET',
        url: redHeartSidsOriginUrl,
      }, getState()
        .authReducer._id === 1 && {
        headers: {
          'Authorization': 'Bearer ' + getState()
            .authReducer.userToken.access_token
        }
      })
    )
      .then(response => {
        let songs = response.data.songs
        let songsChain = songs.reduce((prev, song) => {
          return prev + song.sid + '|'
        }, '')
          .slice(0, -1)
        return axios(
          Object.assign({
            method: 'POST',
            url: 'https://api.douban.com/v2/fm/songs?udid=cf9aed3a0bc54032661c6f84d220b1f28d3722ec',
            data: oToFd(Object.assign(JSON.parse(JSON.stringify(fixedParams)), { sids: songsChain, kbps: 128 }))
          }, getState()
            .authReducer._id === 1 && {
            headers: {
              'Authorization': 'Bearer ' + getState()
                .authReducer.userToken.access_token
            }
          }))
      })
      .then(response => {
        dispatch(actions.redHeartList(response.data))
      })
      .catch(console.log)
  }
}

// Trash list url
const trashOriginUrl = FM_ROOT_URL +
  '/banned_songs?' +
  Object.entries(fixedParams)
    .reduce((previous, [key, value]) => {
      return previous + key + '=' + value + '&'
    }, '') +
  'limit=20&start=0&kbps=128'

export const trashListGET = () => {
  return (dispatch, getState) => {
    return axios(
      Object.assign({
        method: 'GET',
        url: trashOriginUrl
      }, getState()
        .authReducer._id === 1 && {
        headers: {
          'Authorization': 'Bearer ' + getState()
            .authReducer.userToken.access_token
        }
      })
    )
      .then(response => {
        dispatch(actions.trashList(response.data))
      })
      .catch(console.log)
  }
}

const PLAY_LOG_URL = 'https://api.douban.com/v2/fm/play_log?udid=cf9aed3a0bc54032661c6f84d220b1f28d3722ec' // handle play log, used in recent or redheart list

/**
 * 
 * type: r, play_source: h => redheart list rate
 * type: u, play_source: h => redheart list unrate
 * type: p, play_source: h => redheart list playing
 * type: s, play_source: h => redheart list skip
 * type: j, play_source: h => redheart list forward
 * type: k, play_source: h => redheart list backward
 * 
 * play_source: y => recent list
 * play_source: d => daily list
 * play_source: n => sheet list
 * 
 * @param {*} sid 
 * @param {*} type 
 * @param {*} play_source 
 */
export const playLog = (sid, type, play_source) => {
  return (dispatch, getState) => {
    return axios(
      Object.assign({
        method: 'POST',
        url: PLAY_LOG_URL,
        data: oToFd(Object.assign(JSON.parse(JSON.stringify(fixedParams)), {
          records: '[{"time":"' +
              moment()
                .format('YYYY-MM-DD HH:m:s') +
              '","play_mode":"o","sid":"' +
              sid +
              '","type":"' +
              type +
              '","play_source":"' +
              play_source +
              '","pid":"0"}]'
        }))
      }, getState()
        .authReducer._id === 1 && {
        headers: {
          'Authorization': 'Bearer ' + getState()
            .authReducer.userToken.access_token
        }
      }))
  }
}

export const removeTrashSong = (sid, callback) => {
  return (dispatch, getState) => {
    return axios(
      Object.assign({
        method: 'POST',
        url: 'https://api.douban.com/v2/fm/unban_song?udid=cf9aed3a0bc54032661c6f84d220b1f28d3722ec',
        data: oToFd(Object.assign(JSON.parse(JSON.stringify(fixedParams)), { sid }))
      }, getState()
        .authReducer._id === 1 && {
        headers: {
          'Authorization': 'Bearer ' + getState()
            .authReducer.userToken.access_token
        }
      }))
      .then(() => {
        if (typeof callback === 'function') {
          callback()
        }
      })
  }
}

const userInfoOriginUrl = FM_ROOT_URL +
  '/user_info?' +
  Object.entries(fixedParams)
    .reduce((previous, [key, value]) => {
      return previous + key + '=' + value + '&'
    }, '') +
  'avatar_size=large'

export const userInfoGET = () => {
  return (dispatch, getState) => {
    return axios(
      Object.assign({
        method: 'GET',
        url: userInfoOriginUrl
      }, getState()
        .authReducer._id === 1 && {
        headers: {
          'Authorization': 'Bearer ' + getState()
            .authReducer.userToken.access_token
        }
      })
    )
      .then(response => {
        dispatch(userInfo(response.data))
      })
      .catch(console.log)
  }
}

'use strict'

import axios from 'axios'
import moment from 'moment'

import {
  playlistLoading, playlistNewRequest,
  playlistResponse, songLyricResponse,
  playlistNextSong, playlistPlayingRequest,
  playlistSkipRequest, playlistTrashRequest,
  redHeartRate, redHeartUnRate,
  redHeartRateNextSongAppend, redHeartUnRateNextSongAppend,
  playlistEndRequest, recentList,
  redHeartList, trashList
} from './types'
import { userInfo } from '../auth/types'

import oToFd from '../../helper/objToFormD'

const FM_ROOT_URL = 'https://api.douban.com/v2/fm'

const fixedParams = {
  alt: 'json',
  apikey: '02646d3fb69a52ff072d47bf23cef8fd',
  app_name: 'radio_iphone',
  client: 's:mobile|y:iOS 10.3.1|f:116|d:8ff78b4d03654c0dbc63d318fc7a065289a90af2|e:iPhone6,2|m:appstore',
  douban_udid: '826390ea40bf43b0ee04d44a233b2511fcd76a8b',
  udid: '8ff78b4d03654c0dbc63d318fc7a065289a90af2',
  version: '116'
}

const playlistTypes = {
  new: playlistNewRequest,
  playing: playlistPlayingRequest,
  skip: playlistSkipRequest,
  trash: playlistTrashRequest,
  rate: redHeartRate,
  unrate: redHeartUnRate,
  end: playlistEndRequest
}

const playlistOriginUrl = FM_ROOT_URL
  + '/playlist?'
  + Object.entries(fixedParams)
    .reduce((previous, [key, value]) => {
      return previous + key + '=' + value + '&'
    }, '')
  + 'channel=-10&formats=acc&kbps=128&pt=0.0'

export const songLyricGET = (sid, ssid) => {
  return axios.get(FM_ROOT_URL
    + '/lyric?'
    + 'sid=' + sid
    + '&ssid=' + ssid
  )
}

export const playlistGET = type => {
  return (dispatch, getState) => {
    if (type !== 'rate' && type !== 'unrate' && type !== 'end') {
      dispatch(playlistLoading())
    }
    dispatch(playlistTypes[type]())
    axios(Object.assign(
      {
        method: 'GET',
        url: playlistOriginUrl
        + '&type=' + getState().fmReducer.type
        + '&sid=' + getState().fmReducer.sid
      },
      getState().authReducer._id === 1 &&
      { headers: { 'Authorization': 'Bearer ' + getState().authReducer.userToken.access_token } }
    )).then(response => {
      if (type === 'end') { return }
      let playlist = response.data,
        song = playlist.song,
        sid = song[0].sid,
        ssid = song[0].ssid
      delete playlist.song
      if (type === 'rate') {
        dispatch(redHeartRateNextSongAppend(song))
      } else if (type === 'unrate') {
        dispatch(redHeartUnRateNextSongAppend(song))
      } else {
        dispatch(playlistResponse(playlist, sid, ssid, song))
      }
      if (type !== 'rate' && type !== 'unrate' && type !== 'end') {
        return songLyricGET(sid, ssid)
      }
    }).then(response => {
      if (response) {
        dispatch(songLyricResponse(response.data))
      }
    }).catch(console.log)
  }
}

export const nextSong = () => {
  return (dispatch, getState) => {
    dispatch(playlistNextSong())
    songLyricGET(getState().fmReducer.sid, getState().fmReducer.ssid).then(
      response => {
        dispatch(songLyricResponse(response.data))
      }
    )
  }
}

const recentOriginUrl = FM_ROOT_URL
  + '/recent_played_tracks?'
  + Object.entries(fixedParams)
    .reduce((previous, [key, value]) => {
      return previous + key + '=' + value + '&'
    }, '')
  + 'limit=100&start=0&type=played'

export const recentListGET = () => {
  return (dispatch, getState) => {
    return axios(
      Object.assign({
        method: 'GET',
        url: recentOriginUrl
      }, getState().authReducer._id === 1 &&
        { headers: { 'Authorization': 'Bearer ' + getState().authReducer.userToken.access_token } })
    ).then(response => {
      dispatch(recentList(response.data))
    }).catch(console.log)
  }
}

const redHeartSidsOriginUrl = FM_ROOT_URL
  + '/redheart/basic?'
  + Object.entries(fixedParams)
    .reduce((previous, [key, value]) => {
      return previous + key + '=' + value + '&'
    }, '')
  + 'kbps=128'

export const redHeartListGET = () => {
  return (dispatch, getState) => {
    return axios(
      Object.assign({
        method: 'GET',
        url: redHeartSidsOriginUrl,
      }, getState().authReducer._id === 1 &&
        { headers: { 'Authorization': 'Bearer ' + getState().authReducer.userToken.access_token } })
    ).then(response => {
      let songs = response.data.songs
      let songsChain = songs.reduce((prev, song) => {
        return prev + song.sid + '|'
      }, '').slice(0, -1)
      return axios(
        Object.assign({
          method: 'POST',
          url: 'https://api.douban.com/v2/fm/songs',
          data: oToFd(Object.assign(fixedParams, { sids: songsChain }))
        }, getState().authReducer._id === 1 &&
          { headers: { 'Authorization': 'Bearer ' + getState().authReducer.userToken.access_token } }))
    }).then(response => {
      dispatch(redHeartList(response.data))
    }).catch(console.log)
  }
}

const trashOriginUrl = FM_ROOT_URL
  + '/banned_songs?'
  + Object.entries(fixedParams)
    .reduce((previous, [key, value]) => {
      return previous + key + '=' + value + '&'
    }, '')
  + 'limit=50&start=0'

export const trashListGET = () => {
  return (dispatch, getState) => {
    return axios(
      Object.assign({
        method: 'GET',
        url: trashOriginUrl
      }, getState().authReducer._id === 1 &&
        { headers: { 'Authorization': 'Bearer ' + getState().authReducer.userToken.access_token } })
    ).then(response => {
      dispatch(trashList(response.data))
    }).catch(console.log)
  }
}

const PLAY_LOG_URL = 'https://api.douban.com/v2/fm/play_log'

export const playLog = (sid, type, play_source) => {
  return (dispatch, getState) => {
    return axios(
      Object.assign({
        method: 'POST',
        url: PLAY_LOG_URL,
        data: oToFd(Object.assign(fixedParams, {
          records: '[{"time":"'
          + moment().format('YYYY-MM-DD HH:m:s')
          + '","play_mode":"o","v":"4.8.2","sid":"'
          + sid
          + '","type":"'
          + type
          + '","play_source":"'
          + play_source
          + '","pid":"0"}]'
        }))
      }, getState().authReducer._id === 1 &&
        { headers: { 'Authorization': 'Bearer ' + getState().authReducer.userToken.access_token } }))
  }
}

const ACTION_LOG_URL = 'https://api.douban.com/v2/fm/action_log'

export const actionLog = (sid, type, play_source) => {
  return (dispatch, getState) => {
    return axios(
      Object.assign({
        method: 'POST',
        url: ACTION_LOG_URL,
        data: oToFd(Object.assign(fixedParams, {
          records: '[{"time":"'
          + moment().format('YYYY-MM-DD HH:m:s')
          + '","play_mode":"o","v":"4.8.2","sid":"'
          + sid
          + '","type":"'
          + type
          + '","play_source":"'
          + play_source
          + '"}]'
        }))
      }, getState().authReducer._id === 1 &&
        { headers: { 'Authorization': 'Bearer ' + getState().authReducer.userToken.access_token } }))
  }
}

const userInfoOriginUrl = FM_ROOT_URL
  + '/user_info?'
  + Object.entries(fixedParams)
    .reduce((previous, [key, value]) => {
      return previous + key + '=' + value + '&'
    }, '')
  + 'avatar_size=large'

export const userInfoGET = () => {
  return (dispatch, getState) => {
    return axios(
      Object.assign({
        method: 'GET',
        url: userInfoOriginUrl
      }, getState().authReducer._id === 1 &&
        { headers: { 'Authorization': 'Bearer ' + getState().authReducer.userToken.access_token } })
    ).then(response => {
      dispatch(userInfo(response.data))
    }).catch(console.log)
  }
}
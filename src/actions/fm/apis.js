'use strict'

import axios from 'axios'

import {
  playlistLoading, playlistNewRequest,
  playlistResponse, songLyricResponse
} from './types'

const FM_ROOT_URL = 'https://api.douban.com/v2/fm'

const playlistFixedParams = {
  alt: 'json',
  apikey: '02646d3fb69a52ff072d47bf23cef8fd',
  app_name: 'radio_iphone',
  channel: '-10',
  client: 's%3Amobile%7Cy%3AiOS%2010.3%7Cf%3A116%7Cd%3A8ff78b4d03654c0dbc63d318fc7a065289a90af2%7Ce%3AiPhone6%2C2%7Cm%3Aappstore',
  formats: 'acc',
  kbps: '128',
  pt: '0.0',
  douban_udid: '826390ea40bf43b0ee04d44a233b2511fcd76a8b',
  udid: '8ff78b4d03654c0dbc63d318fc7a065289a90af2',
  version: '116'
}

const playlistTypes = {
  new: playlistNewRequest
}

const playlistOriginUrl = FM_ROOT_URL
  + '/playlist?'
  + Object.entries(playlistFixedParams)
    .reduce((previous, [key, value]) => {
      return previous + key + '=' + value + '&'
    }, '')

const songLyricGET = () => {
  return (dispatch, getState) => {
    return axios.get(FM_ROOT_URL
      + '/lyric?'
      + 'sid=' + getState().fmReducer.sid
      + '&ssid=' + getState().fmReducer.ssid
    ).then(response => {
      dispatch(songLyricResponse(response.data))
    }).catch(error => {
      console.log(error)
    })
  }
}

export const playlistGET = (type, sid) => {
  return (dispatch, getState) => {
    dispatch(playlistLoading())
    dispatch(playlistTypes[type](sid))
    return axios.get(playlistOriginUrl
      + 'type=' + getState().fmReducer.type
      + '&sid=' + getState().fmReducer.sid
    ).then(response => {
      let playlist = response.data,
        song = playlist.song,
        sid = song[0].sid,
        ssid = song[0].ssid
      delete playlist.song
      dispatch(playlistResponse(playlist, sid, ssid, song))
    }).then(() => {
      dispatch(songLyricGET())
    }).catch(error => {
      console.log(error)
    })
  }
}
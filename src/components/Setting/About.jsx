'use strict'

import React, { Component } from 'react'
import { Divider, Image } from 'semantic-ui-react'

import { openInDefaultBrowser } from '../../helper/electron'

export default class About extends Component {
  render() {
    return (
      <div className='petalAbout'>
        <Divider horizontal>关于我们</Divider>
        <Image src='./resources/petal.png' size='tiny' centered />
        <div className='aboutUs'>
          <p>Petal是一个豆瓣第三方客户端，以FM为主，计划集成豆瓣图书，电影，音乐等功能。</p>
          <p>不得将此应用用于任何非法用途，所有功能均使用豆瓣API构建，<strong>一切权益归豆瓣所有</strong>。</p>
          <p>Petal的维护者是
            <span onClick={openInDefaultBrowser('https://github.com/SandStorms')}>SandStorms</span>，
            如果有任何使用上的问题，请前往
            <span onClick={openInDefaultBrowser('https://github.com/SandStorms/Petal/issues')}>仓库下的issue</span>
            下提出
          </p>
          <div>Icons made by 
            <span onClick={openInDefaultBrowser('http://www.freepik.com')} title="Freepik"> Freepik </span>
            from <span onClick={openInDefaultBrowser('http://www.flaticon.com')} title="Flaticon">www.flaticon.com</span> is licensed by
            <span onClick={openInDefaultBrowser('http://creativecommons.org/licenses/by/3.0/')} title="Creative Commons BY 3.0"> CC 3.0 BY</span></div>
        </div>
       </div>
    )
  }
}
import React, { Component } from 'react'
import { Image } from 'semantic-ui-react'
import { openInDefaultBrowser } from '../../helper/electron'

export default class About extends Component {
  render() {
    return (
      <div className="petal-setting-about">
        <Image src='./resources/petal.svg' size='tiny' centered />
        <div className="content">
          <p><span onClick={openInDefaultBrowser('https://github.com/ilime/Petal')}>Petal</span>是一个豆瓣第三方客户端。</p>
          <p>不得将此应用用于任何非法用途，所有功能均使用豆瓣移动版API构建。</p>
          <p>Petal的维护者是<span onClick={openInDefaultBrowser('https://github.com/g1eny0ung')}>g1eny0ung</span>。</p>
          <p>如果有任何使用上的问题，请前往<span onClick={openInDefaultBrowser('https://github.com/ilime/Petal/issues')}>仓库下的issue</span>下提出。</p>
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react'
import { Header, Image } from 'semantic-ui-react'
import { openInDefaultBrowser } from '../../helper/electron'

export default class About extends Component {
  componentDidMount() {
    document.querySelector('.fm-region').style.display = 'none'
  }

  componentWillUnmount() {
    if (this.props.history.location.pathname === '/') {
      document.querySelector('.fm-region').style.display = 'flex'
    }
  }

  render() {
    return (
      <div className="petal-about">
        <Header as="h2">关于</Header>
        <Image src="./resources/petal.svg" size="tiny" centered />
        <div className="content">
          <p>
            <span onClick={openInDefaultBrowser('https://github.com/ilime/Petal')}>Petal</span> 是一个
            <span onClick={openInDefaultBrowser('https://douban.fm')}>豆瓣FM</span>
            第三方客户端。
          </p>
          <p>
            应用的所有功能均使用
            <span onClick={openInDefaultBrowser('https://douban.fm')}>豆瓣FM</span>的 Android/iOS APP 提供的 API 构建。
          </p>
          <p>
            Petal 的诞生离不开
            <span onClick={openInDefaultBrowser('https://douban.fm')}>豆瓣FM</span>。
          </p>
          <p>不得将此应用用于任何不正当用途。</p>
          <p>Petal 的维护者是：</p>
          <p>
            <span onClick={openInDefaultBrowser('https://github.com/g1eny0ung')}>g1eny0ung</span>
          </p>
          <p>
            <span onClick={openInDefaultBrowser('https://github.com/Rapiz1')}>Rapiz1</span>
          </p>
          <p>
            <span onClick={openInDefaultBrowser('https://github.com/lxs137')}>lxs137</span>
          </p>
          <p>
            如果有任何使用上的问题，请前往
            <span onClick={openInDefaultBrowser('https://github.com/ilime/Petal/issues')}>代码仓库的 issues</span>{' '}
            下提出。
          </p>
          <p>
            使用 <span onClick={openInDefaultBrowser('https://opensource.org/licenses/MIT')}>MIT</span> 许可证。
          </p>
          <p>Copyright (c) 2019 ilime。</p>
        </div>
      </div>
    )
  }
}

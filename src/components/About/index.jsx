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
            <span
              onClick={openInDefaultBrowser('https://github.com/ilime/Petal')}
            >
              Petal
            </span>是一个豆瓣FM第三方客户端。
          </p>
          <p>应用的所有功能均使用豆瓣FM移动版API构建。</p>
          <p>
            Petal的诞生离不开<span
              onClick={openInDefaultBrowser('https://douban.fm')}
            >
              豆瓣FM
            </span>。
          </p>
          <p>不得将此应用用于任何不正当用途。</p>
          <p>
            Petal的维护者是<span
              onClick={openInDefaultBrowser('https://github.com/g1eny0ung')}
            >
              g1eny0ung
            </span>。
          </p>
          <p>
            如果有任何使用上的问题，请前往<span
              onClick={openInDefaultBrowser(
                'https://github.com/ilime/Petal/issues'
              )}
            >
              仓库下的issues
            </span>下提出。
          </p>
          <p>
            使用<span
              onClick={openInDefaultBrowser(
                'https://opensource.org/licenses/MIT'
              )}
            >
              MIT
            </span>许可证。
          </p>
          <p>Copyright (c) 2019 ilime。</p>
        </div>
      </div>
    )
  }
}

<p align="center">
  <img src="assets/icons/128x128.png" alt="Petal" />
</p>
<h1 align="center">Petal</h1>
<p align="center">
  <a href="https://greenkeeper.io/">
    <img src="https://badges.greenkeeper.io/ilime/Petal.svg" alt="Greenkeeper badge">
  </a>
  <a href="https://travis-ci.org/ilime/Petal">
    <img src="https://travis-ci.org/ilime/Petal.svg?branch=dev" />
  </a>
  <img src="https://david-dm.org/ilime/Petal.svg" />
  <img alt="David" src="https://img.shields.io/david/dev/ilime/Petal.svg">
  <img alt="GitHub issues" src="https://img.shields.io/github/issues/ilime/Petal.svg">
  <img alt="GitHub Releases (by Release)" src="https://img.shields.io/github/downloads/ilime/Petal/total.svg">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" />
  </a>
  <a href="https://gitter.im/ilime/Petal?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge">
    <img src="https://badges.gitter.im/ilime/Petal.svg" alt="Gitter" />
  </a>
</p>
<p align="center">:hibiscus: <a href="https://douban.fm">Douban.FM</a> Client With Extra - - -</p>

## Progress
- [x] Fix: Linux 下窗口装饰显示不正确
- [x] Fix: i3wm 下可以正确最小化（隐藏）了
- [x] Feature: 可调整窗口大小，自适应布局
- [x] Improvement: 使用 [kapetan/titlebar](https://github.com/kapetan/titlebar) 的 OS X 样式标题栏
- [x] Improvement: 合并托盘菜单显示/隐藏
- [x] Feature: 支持 MPRIS 基本功能 ( Events: playpause, previous, next, raise, quit )
- [ ] Feature: 完善支持 MPRIS ( Method: seek, getPosition )
- [ ] Feature: 更好的响应式设计
- [ ] Feature: 更多的动画效果
## Screenshot

<p align="center">
  <img src="petal-screenshot.png" alt="petal-screenshot.png" width="400">
</p>

## Use it

Go to [release page](https://github.com/ilime/Petal/releases)

## How to develop

```sh
git clone git@github.com:ilime/Petal.git && cd Petal/
yarn && yarn start

// Open a new terminal
yarn build:electron:dev
yarn start:electron
```

## How to build

```sh
chmod +x build.sh
./build.sh
```

## How to contribute

Pull a request or open an issue to describe your changes or problems

## License

MIT &copy; [ilime](https://github.com/ilime)
## Credits
[kapetan/titlebar](https://github.com/kapetan/titlebar) 
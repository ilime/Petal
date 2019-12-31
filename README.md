<p align="center">
  <img src="assets/icons/512x512.png" width="128 height="128" alt="Petal Logo" />
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
  <img alt="GitHub release" src="https://img.shields.io/github/release/ilime/Petal">
  <img alt="GitHub Releases (by Release)" src="https://img.shields.io/github/downloads/ilime/Petal/total.svg">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" />
  </a>
  <a href="https://gitter.im/ilime/Petal?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge">
    <img src="https://badges.gitter.im/ilime/Petal.svg" alt="Gitter" />
  </a>
</p>
<p align="center">🌺 <a href="https://douban.fm">Douban.FM</a> Client With Extra - - -</p>
<p align="center">喜欢 Petal 的话，可以给它一个 star ✨，这样就能让更多的人知道它啦，十分感谢🙏。</p>

> 另外，因为我个人已经没有很多精力单独维护它了，所以，**Look For Maintainers**，如果你喜欢 豆瓣 FM 或者 Petal，并且有意愿了解和贡献 Petal，可以邮件到 g1enyy0ung@gmail.com，注明来意，我会帮助你了解整个项目。

## v3.0 计划

<https://github.com/ilime/Petal/releases/tag/v2.20.0>

## Current Maintainers

- [g1eny0ung](https://github.com/g1eny0ung)
- [Rapiz1](https://github.com/Rapiz1)
- [lxs137](https://github.com/lxs137)

如果你有任何问题，可以邮件联系我们。

## Screenshot

<p align="center">
  <img src="petal-screenshot.png" alt="Petal Screenshot" width="384">
</p>

## Use it

### Releases

Go to the [release page](https://github.com/ilime/Petal/releases) and download the latest app.

### Arch Linux

You can also install [petal-bin](https://aur.archlinux.org/packages/petal-bin/) from AUR.

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

For single platform:

```sh
# OSX
./build-platform.sh -m

# Win
./build-platform.sh -w

# Linux
./build-platform.sh -l
```

## How to contribute

Open an issue or pull a request to describe your problems or changes.

## Contributors

Very thankful to all the people below:

- [Rapiz1](https://github.com/Rapiz1)
- [lxs137](https://github.com/lxs137)

## License

MIT &copy; [ilime](https://github.com/ilime)

## Credits

[kapetan/titlebar](https://github.com/kapetan/titlebar)

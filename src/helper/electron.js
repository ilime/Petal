const electron = window.require('electron')
const { shell, remote, ipcRenderer, clipboard } = electron

/**
 * Open url in default broswer.
 *
 * @export
 * @param {any} url
 * @returns
 */
export function openInDefaultBrowser(url) {
  return () => {
    shell.openExternal(url)
  }
}

export function copyToClipboard(text) {
  clipboard.writeText(text)
}

export function appMinimize() {
  if (remote.process.env.XDG_CURRENT_DESKTOP !== 'i3') {
    remote.getCurrentWindow().minimize();
  }
  else {
    remote.getCurrentWindow().hide();
  }
}
export function appMaximize() {
  remote.getCurrentWindow().maximize()
}
export function appQuit() {
  // remote.app.quit()
  rendererProcessSend('appQuit')
}

export function isOnline(callback) {
  if (navigator.onLine) {
    callback()
  } else {
    setTimeout(
      () =>
        remote.dialog.showMessageBox(
          {
            type: 'info',
            title: '无网络连接',
            message: '检测不到可用网络，是否重新加载？',
            buttons: ['重新加载', '退出Petal'],
            defaultId: 0
          },
          function(index) {
            if (index === 0) {
              remote.getCurrentWindow().reload()
            } else {
              remote.app.quit()
            }
          }
        ),
      5000
    )
  }
}

export function onReceiveFromMainProcess(channel, f) {
  ipcRenderer.on(channel, () => {
    f()
  })
}

export function rendererProcessSend(channel, arg) {
  ipcRenderer.send(channel, arg)
}

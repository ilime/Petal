import { shell, remote, ipcRenderer, clipboard } from 'electron'
import db from './db'

remote.app.on('before-quit', () => {
  saveCurrentWindowPosition()
})

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
  remote.getCurrentWindow().minimize()
}

export function appQuit() {
  remote.app.quit()
}

function getCurrentWindowPostion() {
  return remote.getCurrentWindow().getPosition()
}

export function setWindowPostionFromDB() {
  db.findOne({ window: 'position' }, (err, doc) => {
    if (doc != null) {
      remote.getCurrentWindow().setPosition(doc.pos[0], doc.pos[1])
    }
  })
}

export function saveCurrentWindowPosition() {
  db.findOne({ window: 'position' }, (err, doc) => {
    if (doc !== null) {
      db.update(
        { window: 'position' },
        {
          $set: {
            pos: getCurrentWindowPostion()
          }
        }
      )
    } else {
      db.insert({
        window: 'position',
        pos: getCurrentWindowPostion()
      })
    }
  })
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

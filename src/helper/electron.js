'use strict'

import { shell, remote } from 'electron'

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

export function appMinimize() {
  remote.getCurrentWindow().minimize()
}

export function appQuit() {
  remote.app.quit()
}
const { remote } = window.require('electron')

const db = remote.getGlobal('db')

export default db

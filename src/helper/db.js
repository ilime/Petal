'use strict'

import Datastore from 'nedb'
const { remote } = window.require('electron')

const db = new Datastore({
  filename: remote.app.getPath('home') + '/.petal.db',
  autoload: true
})

export default db
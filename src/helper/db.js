'use strict'

import Datastore from 'nedb'

const db = new Datastore({
  filename: 'petal.db',
  autoload: true
})

export default db
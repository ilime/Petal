import Datastore from 'nedb'
import { app } from 'electron'

const db = new Datastore({
  filename: app.getPath('home') + '/.petal.db',
  autoload: true,
})

global.db = db

export default db

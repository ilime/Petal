import Datastore from 'nedb'
import { remote } from 'electron'

const db = new Datastore({
  filename: remote.app.getPath('home') + '/.petal.db',
  autoload: true
})

export default db

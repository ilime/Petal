import { remote } from 'electron'

const db = remote.getGlobal('db')

export default db

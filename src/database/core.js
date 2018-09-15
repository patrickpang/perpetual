import PouchDB from 'pouchdb-browser'
import { getSettings } from '../helpers/settings'

export function setup() {
  // In CouchDB: 1. enable CORS 2. bind to 0.0.0.0 3. SSL
  const { uri } = getSettings()

  const localDB = new PouchDB('cards')
  const remoteDB = new PouchDB(`${uri}/cards`)
  localDB.sync(remoteDB, {
    live: true,
    retry: true,
  })

  return localDB
}

export const db = setup()

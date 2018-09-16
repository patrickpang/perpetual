import PouchDB from 'pouchdb-browser'
import PouchDBFind from 'pouchdb-find'
import EventEmitter from 'eventemitter3'
import { getSettings } from '../helpers/settings'
import { createIndex } from './cards'

export function setup() {
  // In CouchDB: 1. enable CORS 2. bind to 0.0.0.0 3. SSL
  const { uri = 'http://localhost:5894' } = getSettings()

  PouchDB.plugin(PouchDBFind)
  const localDB = new PouchDB('cards')
  const remoteDB = new PouchDB(`${uri}/cards`)

  createIndex(localDB)

  localDB.sync(remoteDB, {
    live: true,
    retry: true,
  })

  localDB
    .changes({ since: 'now', live: true })
    .on('change', change => events.emit('change', change))

  return localDB
}

export const db = setup()

export const events = new EventEmitter()

import PouchDB from 'pouchdb-browser'

export function setup() {
  const localDB = new PouchDB('cards')
  const remoteDB = new PouchDB('http://localhost:5984/cards')
  localDB.sync(remoteDB, {
    live: true,
    retry: true,
  })

  return localDB
}

export const db = setup()

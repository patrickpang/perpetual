import PouchDB from 'pouchdb-browser'

export function setup() {
  // In CouchDB: enable CORS and bind to 0.0.0.0
  const address = window.localStorage.getItem('address') || 'localhost'

  const localDB = new PouchDB('cards')
  const remoteDB = new PouchDB(`http://${address}:5984/cards`)
  localDB.sync(remoteDB, {
    live: true,
    retry: true,
  })

  return localDB
}

export const db = setup()

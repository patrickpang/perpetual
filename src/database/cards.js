export const createIndex = db => {
  return Promise.all([
    db.createIndex({ index: { fields: ['date'] } }),
    db.createIndex({ index: { fields: ['mtime'] } }),
  ])
}

export const saveCard = async (db, card) => {
  return await db.put(card)
}

export const getCard = async (db, id) => {
  return await db.get(id)
}

export const deleteCard = async (db, _id, _rev) => {
  return await db.remove(_id, _rev)
}

export const recentCards = async db => {
  return await db
    .find({ selector: { mtime: { $gt: 0 } }, sort: [{ mtime: 'desc' }] })
    .then(result => result.docs)
}

export const findCards = async (db, { date }) => {
  return await db.find({ selector: { date } }).then(result => result.docs)
}

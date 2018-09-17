import { preprocessText, extractText } from '../helpers/text'

export const createIndex = db => {
  return Promise.all([
    db.createIndex({ index: { fields: ['date'] } }),
    db.createIndex({ index: { fields: ['mtime'] } }),
    db.search({ fields: ['title', 'text'], build: true }),
  ])
}

export const saveCard = async (db, card) => {
  const text = preprocessText(extractText(card))
  return await db.put({ ...card, text })
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

export const findCardsByDate = async (db, { date }) => {
  return await db.find({ selector: { date } }).then(result => result.docs)
}

export const searchCards = async (db, query) => {
  return await db
    .search({
      query,
      fields: ['title', 'text'],
      include_docs: true,
    })
    .then(result => result.rows.map(row => row.doc))
}

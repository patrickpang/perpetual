import { preprocessText, extractText } from '../helpers/text'

export const createIndex = db => {
  // extract text: recentCards(db).then(cards => cards.forEach(card => saveCard(db, card)))
  return Promise.all([
    db.createIndex({ index: { fields: ['date'] } }),
    db.createIndex({ index: { fields: ['mtime'] } }),
    db.search({ fields: ['titleText', 'text'], build: true }),
  ])
}

export const saveCard = async (db, card) => {
  const titleText = preprocessText(card.title)
  const text = preprocessText(extractText(card))
  return await db.put({ ...card, titleText, text })
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
      fields: ['titleText', 'text'],
      include_docs: true,
    })
    .then(result => result.rows.map(row => row.doc))
}

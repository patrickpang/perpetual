import { preprocessText, extractText } from '../helpers/text'
import { countBy } from 'lodash/fp'

export const createIndex = db => {
  // extract text: recentCards(db).then(cards => cards.forEach(card => saveCard(db, card)))
  return Promise.all([
    db.createIndex({ index: { fields: ['date'] } }),
    db.createIndex({ index: { fields: ['mtime'] } }),
    db.search({ fields: ['titleText', 'text', 'tags'], build: true }),
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

export const findCardsByDate = async (db, date) => {
  return await db.find({ selector: { date } }).then(result => result.docs)
}

export const countCardsInDateRange = async (db, startDate, endDate) => {
  return await db
    .find({ selector: { date: { $gte: startDate, $lte: endDate } }, fields: ['_id', 'date'] })
    .then(result => result.docs)
    .then(docs => countBy('date', docs))
}

export const searchCards = async (db, query) => {
  if (query.startsWith('#')) {
    const tags = query
      .trim()
      .toLowerCase()
      .split(' ')
      .map(tag => tag.slice(1))

    return await db.find({ selector: { tags: { $all: tags } } }).then(result => result.docs)
  } else {
    return await db
      .search({
        query: preprocessText(query),
        fields: ['titleText', 'text'],
        include_docs: true,
      })
      .then(result => result.rows.map(row => row.doc))
  }
}

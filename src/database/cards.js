export const saveCard = async (db, card) => {
  return await db.put(card)
}

export const getCard = async (db, id) => {
  return await db.get(id)
}

export const deleteCard = async (db, _id, _rev) => {
  return await db.remove(_id, _rev)
}

export const getCards = async db => {
  return await db.allDocs({ include_docs: true })
}

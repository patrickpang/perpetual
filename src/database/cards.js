export const saveCard = async (db, card) => {
  return await db.put(card)
}

export const getCard = async (db, id) => {
  return await db.get(id)
}

export const getCards = async db => {
  return await db.allDocs({ include_docs: true })
}

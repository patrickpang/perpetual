import React from 'react'
import Card from './Card'
import { css } from 'emotion'

const CardsGrid = ({ cards }) => (
  <div
    className={css`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      grid-gap: 32px;
    `}
  >
    {cards.map(card => (
      <Card card={card} key={card._id} />
    ))}
  </div>
)

export default CardsGrid

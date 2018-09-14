import React, { Component } from 'react'
import { css } from 'react-emotion'
import Actions from '../components/Actions'
import Card from '../components/Card'
import Main from '../components/Main'
import Nav from '../components/Nav'
import { getCards } from '../database/cards'
import { db } from '../database/core'

const CardsGrid = ({ cards }) => (
  <div
    className={css`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      grid-gap: 32px;
    `}
  >
    {cards.map(({ id, doc: card }) => (
      <Card
        card={card}
        key={id}
        preview={card.content && card.content.length > 0 ? card.content[0].content : null}
      />
    ))}
  </div>
)

class Search extends Component {
  state = { cards: [] }

  componentDidMount() {
    getCards(db).then(response => {
      console.log(response)
      this.setState({ cards: response.rows })
    })
  }

  render() {
    const { cards } = this.state
    return (
      <div>
        <Nav />
        <Main>
          <div>
            <h2>Search</h2>
            <CardsGrid cards={cards} />
          </div>
        </Main>
        <Actions />
      </div>
    )
  }
}

export default Search

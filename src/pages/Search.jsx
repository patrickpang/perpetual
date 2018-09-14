import React, { Component } from 'react'
import { css } from 'react-emotion'
import Actions from '../components/Actions'
import Card from '../components/Card'
import Layout from '../components/Layout'
import Nav from '../components/Nav'
import { getCards } from '../database/cards'
import { db } from '../database/core'
import Main from '../components/Main'

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
      this.setState({ cards: response.rows })
    })
  }

  render() {
    const { cards } = this.state
    return (
      <Layout>
        <Nav />

        <Main>
          <h2>Search</h2>
          <CardsGrid cards={cards} />
        </Main>

        <Actions />
      </Layout>
    )
  }
}

export default Search

import React, { Component } from 'react'
import { css } from 'react-emotion'
import Actions from '../components/Actions'
import Card from '../components/Card'
import Layout from '../components/Layout'
import Main from '../components/Main'
import Nav from '../components/Nav'
import { getCards } from '../database/cards'
import { db, events } from '../database/core'

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
    this.loadCards()
    events.on('change', this.loadCards)
  }

  componentWillUnmount() {
    events.removeListener('change', this.loadCards)
  }

  loadCards = () => {
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

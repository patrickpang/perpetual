import React, { Component } from 'react'
import Actions from '../components/Actions'
import Layout from '../components/Layout'
import Main from '../components/Main'
import Nav from '../components/Nav'
import { recentCards } from '../database/cards'
import { db, events } from '../database/core'
import CardsGrid from '../components/CardsGrid'

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
    recentCards(db).then(cards => {
      this.setState({ cards })
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

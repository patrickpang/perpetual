import React, { Component } from 'react'
import Actions from '../components/Actions'
import Layout from '../components/Layout'
import Main from '../components/Main'
import Nav from '../components/Nav'
import { recentCards } from '../database/cards'
import { db, events } from '../database/core'
import CardsGrid from '../components/CardsGrid'
import BasicInput from '../components/BasicInput'

class Search extends Component {
  state = { query: '', cards: [] }

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

  handleQueryChange = e => this.setState({ query: e.target.value })

  render() {
    const { query, cards } = this.state
    return (
      <Layout>
        <Nav />

        <Main>
          <h2>
            <BasicInput
              value={query}
              onChange={this.handleQueryChange}
              autoFocus={true}
              placeholder="Search"
            />
          </h2>
          <CardsGrid cards={cards} />
        </Main>

        <Actions />
      </Layout>
    )
  }
}

export default Search

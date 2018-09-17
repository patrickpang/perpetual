import React, { Component } from 'react'
import Actions from '../components/Actions'
import BasicInput from '../components/BasicInput'
import CardsGrid from '../components/CardsGrid'
import Layout from '../components/Layout'
import Main from '../components/Main'
import Nav from '../components/Nav'
import { recentCards, searchCards } from '../database/cards'
import { db, events } from '../database/core'
import { preprocessText } from '../helpers/text'

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

  searchCards = () => {
    const { query } = this.state
    console.log(preprocessText(query))
    searchCards(db, preprocessText(query)).then(cards => {
      this.setState({ cards })
    })
  }

  handleSubmit = e => {
    const { query } = this.state
    if (query.length > 0) {
      this.searchCards()
    } else {
      this.loadCards()
    }
    e.preventDefault()
  }

  render() {
    const { query, cards } = this.state
    return (
      <Layout>
        <Nav />

        <Main>
          <h2>
            <form onSubmit={this.handleSubmit}>
              <BasicInput
                value={query}
                onChange={e => this.setState({ query: e.target.value })}
                autoFocus={true}
                placeholder="Search"
              />
            </form>
          </h2>
          <CardsGrid cards={cards} />
        </Main>

        <Actions />
      </Layout>
    )
  }
}

export default Search

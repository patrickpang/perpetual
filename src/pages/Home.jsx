import { set } from 'lodash/fp'
import React, { Component } from 'react'
import Actions from '../components/Actions'
import CardsGrid from '../components/CardsGrid'
import Layout from '../components/Layout'
import Main from '../components/Main'
import Nav from '../components/Nav'
import { findCardsByDate, searchCards } from '../database/cards'
import { db } from '../database/core'
import { defaultDateFormat } from '../helpers/dates'

const views = ['#everyday']

class Home extends Component {
  state = { cards: { today: [], views: {} } }

  componentDidMount() {
    this.loadCards()
  }

  loadCards() {
    findCardsByDate(db, defaultDateFormat(new Date())).then(cards =>
      this.setState(state => set(['cards', 'today'], cards, state))
    )
    views.forEach(view =>
      searchCards(db, view).then(cards =>
        this.setState(state => set(['cards', 'views', view], cards, state))
      )
    )
  }

  render() {
    const { cards } = this.state

    return (
      <Layout>
        <Nav />

        <Main>
          <div>
            <h2>Today</h2>
            {cards.today && <CardsGrid cards={cards.today} />}
          </div>
          {views.map(view => (
            <div key={view}>
              <h2>{view}</h2>
              {cards.views[view] && <CardsGrid cards={cards.views[view]} />}
            </div>
          ))}
        </Main>

        <Actions />
      </Layout>
    )
  }
}

export default Home

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
import styled from 'react-emotion'

const views = ['#everyday', '#recent', '#someday']

const View = styled('div')`
  margin-bottom: 48px;
`

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
          <View>
            <h2>Today</h2>
            {cards.today && <CardsGrid cards={cards.today} />}
          </View>
          {views.map(view => (
            <View key={view}>
              <h2>{view}</h2>
              {cards.views[view] && <CardsGrid cards={cards.views[view]} />}
            </View>
          ))}
        </Main>

        <Actions />
      </Layout>
    )
  }
}

export default Home

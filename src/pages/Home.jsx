import { format } from 'date-fns/esm/fp'
import { set } from 'lodash/fp'
import React, { Component } from 'react'
import { css } from 'react-emotion'
import Actions from '../components/Actions'
import Card from '../components/Card'
import Layout from '../components/Layout'
import Main from '../components/Main'
import Nav from '../components/Nav'
import { findCardsByDate, searchCards } from '../database/cards'
import { db } from '../database/core'

const views = ['#everyday']

class Home extends Component {
  state = { cards: { today: [], views: {} } }

  componentDidMount() {
    this.loadCards()
  }

  loadCards() {
    findCardsByDate(db, format('yyyy-MM-dd', new Date())).then(cards =>
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
            {cards.today && <CardsRow cards={cards.today} />}
          </div>
          {views.map(view => (
            <div key={view}>
              <h2>{view}</h2>
              {cards.views[view] && <CardsRow cards={cards.views[view]} />}
            </div>
          ))}
        </Main>

        <Actions />
      </Layout>
    )
  }
}

const CardsRow = ({ cards }) => (
  <div
    className={css`
      display: flex;
      flex-direction: row;
      overflow-x: auto;
      padding: 16px 32px;
      margin: 0 -32px;

      &::-webkit-scrollbar {
        width: 0px;
        background: transparent;
      }
    `}
  >
    {cards.map(card => (
      <Card
        card={card}
        key={card._id}
        className={css`
          flex-shrink: 0;
          width: 200px;
          margin-right: 32px;
        `}
      />
    ))}
  </div>
)

export default Home

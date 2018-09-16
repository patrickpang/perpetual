import React, { Component } from 'react'
import Actions from '../components/Actions'
import Layout from '../components/Layout'
import Main from '../components/Main'
import Nav from '../components/Nav'
import { css } from 'react-emotion'
import { findCards } from '../database/cards'
import { db } from '../database/core'
import CardsGrid from '../components/CardsGrid'
import { format, startOfDay, startOfWeek, addDays, isEqual } from 'date-fns/esm/fp'
import { range } from 'lodash/fp'

const Day = ({ day, selected, onClick }) => (
  <div
    onClick={onClick}
    className={css`
      flex: 1;
      text-align: center;
      font-weight: ${selected ? 'bold' : 'normal'};
    `}
  >
    <div
      className={css`
        color: grey;
      `}
    >
      {format('EEEEE', day)}
    </div>
    <div
      className={css`
        padding-top: 8px;
      `}
    >
      {format('d', day)}
    </div>
  </div>
)

const daysInWeek = date => {
  const startDay = startOfWeek(date)
  return range(0, 7).map(offset => addDays(offset, startDay))
}

const Week = ({ selectedDate, onSelect }) => {
  const days = daysInWeek(selectedDate) // TODO: memoize?
  return (
    <div>
      <h2>{format('yyyy MMM', selectedDate)}</h2>
      <div
        className={css`
          display: flex;
          margin-bottom: 32px;
        `}
      >
        {days.map(day => (
          <Day
            key={day}
            day={day}
            selected={isEqual(selectedDate, day)}
            onClick={() => onSelect(day)}
          />
        ))}
      </div>
    </div>
  )
}

class Agenda extends Component {
  state = { selectedDate: startOfDay(new Date()), cards: [] }

  componentDidMount() {
    this.loadCards()
  }

  selectDate = date => this.setState({ selectedDate: date }, () => this.loadCards())

  loadCards = () => {
    const { selectedDate } = this.state
    findCards(db, { date: format('yyyy-MM-dd', selectedDate) }).then(cards =>
      this.setState({ cards })
    )
  }

  render() {
    const { selectedDate, cards } = this.state
    return (
      <Layout>
        <Nav />

        <Main>
          <Week selectedDate={selectedDate} onSelect={this.selectDate} />
          <CardsGrid cards={cards} />
        </Main>

        <Actions />
      </Layout>
    )
  }
}

export default Agenda

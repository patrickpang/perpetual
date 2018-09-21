import {
  addDays,
  addWeeks,
  endOfWeek,
  format,
  isEqual,
  startOfDay,
  startOfWeek,
  subWeeks,
} from 'date-fns/esm/fp'
import { range } from 'lodash/fp'
import React, { Component } from 'react'
import { css } from 'react-emotion'
import { Swipeable } from 'react-touch'
import Actions from '../components/Actions'
import BasicButton from '../components/BasicButton'
import CardsGrid from '../components/CardsGrid'
import Layout from '../components/Layout'
import Main from '../components/Main'
import Nav from '../components/Nav'
import Row from '../components/Row'
import { countCardsInDateRange, findCardsByDate } from '../database/cards'
import { db, events } from '../database/core'
import Badge from '../components/Badge'

const Day = ({ day, selected, count, onClick }) => (
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
        margin-bottom: 8px;
      `}
    >
      {format('EEEEE', day)}
    </div>
    <Badge number={count}>{format('d', day)}</Badge>
  </div>
)

const daysInWeek = date => {
  const startDay = startOfWeek(date)
  return range(0, 7).map(offset => addDays(offset, startDay))
}

const Week = ({ selectedDate, cardsCount, onDateChange, onRangeChange }) => {
  const days = daysInWeek(selectedDate) // TODO: memoize?
  return (
    <div>
      <Row
        className={css`
          justify-content: space-between;
        `}
      >
        <h2>{format('yyyy MMM', selectedDate)}</h2>
        <BasicButton
          onClick={() => {
            const newSelectedDate = new Date()
            onDateChange(startOfDay(newSelectedDate))
            onRangeChange(startOfWeek(newSelectedDate), endOfWeek(newSelectedDate))
          }}
        >
          <b>Today</b>
        </BasicButton>
      </Row>
      <Swipeable
        onSwipeRight={() => {
          const newSelectedDate = subWeeks(1, selectedDate)
          onDateChange(newSelectedDate)
          onRangeChange(startOfWeek(newSelectedDate), endOfWeek(newSelectedDate))
        }}
        onSwipeLeft={() => {
          const newSelectedDate = addWeeks(1, selectedDate)
          onDateChange(newSelectedDate)
          onRangeChange(startOfWeek(newSelectedDate), endOfWeek(newSelectedDate))
        }}
      >
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
              count={cardsCount[defaultDateFormat(day)]}
              onClick={() => onDateChange(day)}
            />
          ))}
        </div>
      </Swipeable>
    </div>
  )
}

class Agenda extends Component {
  state = { selectedDate: startOfDay(new Date()), cards: [], cardsCount: {} }

  componentDidMount() {
    this.reload()
    events.on('change', this.reload)
  }

  componentWillUnmount() {
    events.removeListener('change', this.reload)
  }

  selectDate = date => this.setState({ selectedDate: date }, () => this.loadCards())

  reload = () => {
    const { selectedDate } = this.state
    this.loadCards()
    this.loadCount(startOfWeek(selectedDate), endOfWeek(selectedDate))
  }

  loadCards = () => {
    const { selectedDate } = this.state
    findCardsByDate(db, defaultDateFormat(selectedDate)).then(cards => this.setState({ cards }))
  }

  loadCount = (startDate, endDate) => {
    countCardsInDateRange(db, defaultDateFormat(startDate), defaultDateFormat(endDate)).then(
      cardsCount => this.setState({ cardsCount })
    )
  }

  render() {
    const { selectedDate, cards, cardsCount } = this.state
    return (
      <Layout>
        <Nav />

        <Main>
          <Week
            selectedDate={selectedDate}
            cardsCount={cardsCount}
            onDateChange={this.selectDate}
            onRangeChange={this.loadCount}
          />
          <CardsGrid cards={cards} />
        </Main>

        <Actions />
      </Layout>
    )
  }
}

const defaultDateFormat = format('yyyy-MM-dd')

export default Agenda

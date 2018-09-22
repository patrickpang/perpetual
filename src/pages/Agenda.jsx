import {
  addWeeks,
  endOfWeek,
  format,
  isEqual,
  startOfDay,
  startOfWeek,
  subWeeks,
  startOfMonth,
  endOfMonth,
  subMonths,
  addMonths,
} from 'date-fns/esm/fp'
import React, { Component } from 'react'
import { css } from 'react-emotion'
import { Swipeable } from 'react-touch'
import Actions from '../components/Actions'
import Badge from '../components/Badge'
import BasicButton from '../components/BasicButton'
import CardsGrid from '../components/CardsGrid'
import Layout from '../components/Layout'
import Main from '../components/Main'
import Nav from '../components/Nav'
import Row from '../components/Row'
import { countCardsInDateRange, findCardsByDate } from '../database/cards'
import { db, events } from '../database/core'
import { daysInWeek, defaultDateFormat, daysInMonth } from '../helpers/dates'

const Weekdays = () => {
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  return (
    <div
      className={css`
        display: flex;
        margin-bottom: 16px;
        color: grey;
      `}
    >
      {weekdays.map((weekday, index) => (
        <div
          key={index}
          className={css`
            flex: 1;
            text-align: center;
          `}
        >
          {weekday}
        </div>
      ))}
    </div>
  )
}

const Day = ({ day, selected, count, onClick }) => (
  <div
    onClick={onClick}
    className={css`
      flex: 1;
      text-align: center;
      font-weight: ${selected ? 'bold' : 'normal'};
    `}
  >
    <Badge number={count}>{format('d', day)}</Badge>
  </div>
)

const Header = ({ selectedDate, onDateChange, onRangeChange, onToggleMode }) => (
  <Row
    className={css`
      justify-content: space-between;
    `}
  >
    <h2 onClick={onToggleMode}>{format('yyyy MMM', selectedDate)}</h2>
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
)

const Week = ({ selectedDate, cardsCount, onDateChange, onRangeChange }) => {
  const days = daysInWeek(selectedDate)

  return (
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
  )
}

const Month = ({ selectedDate, cardsCount, onDateChange, onRangeChange }) => {
  const weeks = daysInMonth(selectedDate)

  return (
    <Swipeable
      onSwipeRight={() => {
        const newSelectedDate = subMonths(1, selectedDate)
        onDateChange(newSelectedDate)
        onRangeChange(startOfMonth(newSelectedDate), endOfMonth(newSelectedDate))
      }}
      onSwipeLeft={() => {
        const newSelectedDate = addMonths(1, selectedDate)
        onDateChange(newSelectedDate)
        onRangeChange(startOfMonth(newSelectedDate), endOfMonth(newSelectedDate))
      }}
    >
      <div
        className={css`
          margin-bottom: 32px;
        `}
      >
        {weeks.map(days => (
          <div
            key={days[0]}
            className={css`
              display: flex;
              margin-bottom: 16px;
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
        ))}
      </div>
    </Swipeable>
  )
}

class Agenda extends Component {
  state = { selectedDate: startOfDay(new Date()), cards: [], cardsCount: {}, mode: 'week' }

  componentDidMount() {
    this.reload()
    events.on('change', this.reload)
  }

  componentWillUnmount() {
    events.removeListener('change', this.reload)
  }

  selectDate = date => this.setState({ selectedDate: date }, () => this.loadCards())

  reload = () => {
    const { selectedDate, mode } = this.state
    this.loadCards()
    switch (mode) {
      case 'week':
        this.loadCount(startOfWeek(selectedDate), endOfWeek(selectedDate))
        break
      case 'month':
        this.loadCount(startOfMonth(selectedDate), endOfMonth(selectedDate))
        break
      default:
        this.loadCount(startOfWeek(selectedDate), endOfWeek(selectedDate))
        break
    }
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

  toggleMode = () =>
    this.setState(
      ({ mode }) => ({
        mode: mode === 'week' ? 'month' : 'week',
      }),
      () => this.reload()
    )

  render() {
    const { selectedDate, cards, cardsCount, mode } = this.state
    return (
      <Layout>
        <Nav />

        <Main>
          <Header
            selectedDate={selectedDate}
            onDateChange={this.selectDate}
            onRangeChange={this.loadCount}
            onToggleMode={this.toggleMode}
          />
          <Weekdays />
          {mode === 'week' && (
            <Week
              selectedDate={selectedDate}
              cardsCount={cardsCount}
              onDateChange={this.selectDate}
              onRangeChange={this.loadCount}
            />
          )}
          {mode === 'month' && (
            <Month
              selectedDate={selectedDate}
              cardsCount={cardsCount}
              onDateChange={this.selectDate}
              onRangeChange={this.loadCount}
            />
          )}
          <CardsGrid cards={cards} />
        </Main>

        <Actions />
      </Layout>
    )
  }
}

export default Agenda

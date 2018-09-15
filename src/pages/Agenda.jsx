import React, { Component } from 'react'
import Actions from '../components/Actions'
import Layout from '../components/Layout'
import Main from '../components/Main'
import Nav from '../components/Nav'
import { css } from 'react-emotion'

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const Day = ({ weekday, day, selected, onClick }) => (
  <div
    onClick={onClick}
    className={css`
      text-align: center;
      font-weight: ${selected ? 'bold' : 'normal'};
    `}
  >
    <div
      className={css`
        color: grey;
      `}
    >
      {weekdays[weekday]}
    </div>
    <div
      className={css`
        padding-top: 8px;
      `}
    >
      {day}
    </div>
  </div>
)

const days = [9, 10, 11, 12, 13, 14, 15]

const Week = ({ selectedDate, onSelect }) => (
  <div
    className={css`
      display: flex;
      justify-content: space-between;
    `}
  >
    {days.map((day, index) => (
      <Day
        key={day}
        weekday={index}
        day={day}
        selected={day === selectedDate}
        onClick={() => onSelect(day)}
      />
    ))}
  </div>
)

class Agenda extends Component {
  state = { selectedDate: 11 }

  render() {
    const { selectedDate } = this.state
    return (
      <Layout>
        <Nav />

        <Main>
          <h2>2018 September</h2>
          <Week
            selectedDate={selectedDate}
            onSelect={date => this.setState({ selectedDate: date })}
          />
          <div>{selectedDate}</div>
        </Main>

        <Actions />
      </Layout>
    )
  }
}

export default Agenda

import React from 'react'
import Nav from '../components/Nav'
import Card from '../components/Card'
import { css } from 'react-emotion'
import Main from '../components/Main'
import Icon from '../components/Icon'
import Row from '../components/Row'
import { Link } from '@reach/router'

const views = ['#everyday']

const cards = [
  {
    id: 1,
    title: 'emotion',
    content:
      'Emotion is a performant and flexible CSS-in-JS library. Building on many other CSS-in-JS libraries, it allows you to style apps quickly with string or object styles. ',
  },
  {
    id: 2,
    title: 'pouchdb',
    content:
      'PouchDB is an open-source JavaScript database inspired by Apache CouchDB that is designed to run well within the browser. ',
  },
  {
    id: 3,
    title: 'react',
    content:
      'A JavaScript library for building user interfaces. Declarative. Component-Based. Learn Once, Write Anywhere.',
  },
]

const Home = () => (
  <div>
    <Nav />
    <Main>
      <div>
        <h2>Today</h2>
        <CardsRow cards={cards} />
      </div>
      {views.map(view => (
        <div key={view}>
          <h2>{view}</h2>
          <CardsRow cards={cards} />
        </div>
      ))}
    </Main>
    <Actions />
  </div>
)

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
        key={card.id}
        className={css`
          flex-shrink: 0;
          width: 200px;
          margin-right: 32px;
        `}
      />
    ))}
  </div>
)

const Actions = () => (
  <Link
    to="/note"
    className={css`
      position: fixed;
      bottom: 0;
      width: 100%;
      background: white;
      color: grey;
      padding: 16px 32px;
      cursor: pointer;
      color: inherit;
      text-decoration: none;
    `}
  >
    <Row>
      <Icon>add</Icon>
      <div
        className={css`
          margin-left: 8px;
        `}
      >
        write it down
      </div>
    </Row>
  </Link>
)

export default Home

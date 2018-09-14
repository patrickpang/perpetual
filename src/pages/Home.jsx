import React from 'react'
import { css } from 'react-emotion'
import Actions from '../components/Actions'
import Card from '../components/Card'
import Main from '../components/Main'
import Nav from '../components/Nav'

const views = ['#everyday']

const cards = [
  {
    id: 1,
    title: 'emotion',
    theme: 'green',
    preview:
      'Emotion is a performant and flexible CSS-in-JS library. Building on many other CSS-in-JS libraries, it allows you to style apps quickly with string or object styles. ',
  },
  {
    id: 2,
    title: 'pouchdb',
    theme: 'splendid',
    preview:
      'PouchDB is an open-source JavaScript database inspired by Apache CouchDB that is designed to run well within the browser. ',
  },
  {
    id: 3,
    title: 'react',
    theme: 'fresh',
    preview:
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
        preview={card.preview}
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

export default Home

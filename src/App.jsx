import { Router } from '@reach/router'
import React, { Component } from 'react'
import Home from './pages/Home'
import Note from './pages/Note'
import Search from './pages/Search'
import Settings from './pages/Settings'
import Agenda from './pages/Agenda'

class App extends Component {
  render() {
    return (
      <Router>
        <Home path="/" />
        <Note path="/note" />
        <Note path="/note/:id" />
        <Search path="/search" />
        <Agenda path="/agenda" />
        <Settings path="/settings" />
        <Home default />
      </Router>
    )
  }
}

export default App

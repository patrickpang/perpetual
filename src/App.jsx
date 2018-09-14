import { Router } from '@reach/router'
import React, { Component } from 'react'
import Home from './pages/Home'
import Note from './pages/Note'
import Search from './pages/Search'
import Settings from './pages/Settings'

class App extends Component {
  render() {
    return (
      <Router>
        <Home path="/" />
        <Note path="/note" />
        <Note path="/note/:id" />
        <Search path="/search" />
        <Settings path="/settings" />
        <Home default />
      </Router>
    )
  }
}

export default App

import { Router } from '@reach/router'
import React, { Component } from 'react'
import Home from './pages/Home'
import Note from './pages/Note'

class App extends Component {
  render() {
    return (
      <Router>
        <Home path="/" />
        <Note path="/note" />
        <Home default />
      </Router>
    )
  }
}

export default App

import React, { Component } from 'react'
import { css } from 'react-emotion'
import Input from '../components/Input'
import Main from '../components/Main'

class Settings extends Component {
  state = { address: window.localStorage.getItem('address') || 'localhost' }

  componentWillUnmount() {
    const { address } = this.state
    window.localStorage.setItem('address', address || 'localhost')
  }

  render() {
    const { address } = this.state
    return (
      <Main>
        <h2>Settings</h2>
        <div
          className={css`
            padding: 16px;
            background: whiteSmoke;
          `}
        >
          <label htmlFor="address">
            <b>Address</b>
          </label>
          <Input
            id="address"
            value={address}
            onChange={e => this.setState({ address: e.target.value })}
            placeholder="Address"
            className={css`
              margin-top: 16px;
            `}
          />
        </div>
      </Main>
    )
  }
}

export default Settings

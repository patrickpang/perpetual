import React, { Component } from 'react'
import { css } from 'react-emotion'
import BasicInput from '../components/BasicInput'
import Main from '../components/Main'
import { getSettings, saveSettings } from '../helpers/settings'

const Field = ({ id, value, onChange }) => (
  <div
    className={css`
      padding: 16px;
      margin-bottom: 16px;
      background: whiteSmoke;
    `}
  >
    <label htmlFor={id}>
      <b>{id}</b>
    </label>
    <BasicInput
      id={id}
      value={value}
      onChange={onChange}
      placeholder={id}
      className={css`
        margin-top: 16px;
      `}
    />
  </div>
)

class Settings extends Component {
  state = { uri: 'localhost' }

  componentDidMount() {
    const { uri } = getSettings()
    this.setState({ uri })
  }

  componentWillUnmount() {
    const { uri } = this.state
    saveSettings({ uri })
  }

  render() {
    const { uri } = this.state
    return (
      <Main>
        <h2>Settings</h2>

        <Field id="uri" value={uri} onChange={e => this.setState({ uri: e.target.value })} />
      </Main>
    )
  }
}

export default Settings

import React from 'react'
import { css } from 'react-emotion'
import { bottomBarStyle } from '../helpers/layout'
import Row from '../components/Row'
import Icon from '../components/Icon'
import themes from '../helpers/theme'

const Note = ({ id }) => (
  <div>
    <div
      className={css`
        background: linear-gradient(45deg, ${themes['green'].join(',')});
        color: white;
        padding: 32px;
      `}
    >
      <input
        type="text"
        autoFocus={true}
        placeholder="what's on your mind?"
        className={css`
          outline: none;
          border: none;
          width: 100%;
          box-sizing: border-box;
          background: none;
          color: inherit;

          &::placeholder {
            color: inherit;
          }
        `}
      />
    </div>
    <textarea
      placeholder="write down some more details"
      className={css`
        outline: none;
        border: none;
        resize: none;
        padding: 32px;
        width: 100%;
        box-sizing: border-box;

        height: 70vh;
      `}
    />

    <Actions />
  </div>
)

const Actions = () => (
  <div className={bottomBarStyle}>
    <Row>
      <div
        className={css`
          flex: 1;
        `}
      >
        <Icon>delete</Icon>
      </div>
      <Icon>offline_pin</Icon>
    </Row>
  </div>
)

export default Note

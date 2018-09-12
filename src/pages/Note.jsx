import React from 'react'
import { css } from 'react-emotion'
import Main from '../components/Main'

const Note = ({ id }) => (
  <Main>
    <div>
      <input
        type="text"
        autoFocus={true}
        placeholder="what's on your mind?"
        className={css`
          outline: none;
          border: none;
          padding: 16px;
          width: 100%;
          box-sizing: border-box;
        `}
      />
    </div>
    <textarea
      placeholder="write down some more details"
      className={css`
        outline: none;
        border: none;
        resize: none;
        padding: 16px;
        width: 100%;
        box-sizing: border-box;
      `}
    />
  </Main>
)

export default Note

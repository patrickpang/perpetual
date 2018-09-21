import React from 'react'
import { css } from 'react-emotion'

const Badge = ({ number, children }) => (
  <div
    className={css`
      position: relative;
    `}
  >
    {children}
    {number && (
      <span
        className={css`
          position: absolute;
          font-size: 80%;
          margin-left: 4px;
        `}
      >
        {number}
      </span>
    )}
  </div>
)

export default Badge

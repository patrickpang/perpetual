import React from 'react'
import { css } from 'react-emotion'

const cardStyle = css`
  background: linear-gradient(45deg, #00b09b, #96c93d);
  color: white;

  border-radius: 12px;
  box-shadow: 0px 0px 16px lightgrey;
  padding: 24px;
`

const Card = ({ card: { id, title, content }, className }) => (
  <div className={className ? cardStyle + ' ' + className : cardStyle}>
    <b>{title}</b>
    <p>{content}</p>
  </div>
)

export default Card

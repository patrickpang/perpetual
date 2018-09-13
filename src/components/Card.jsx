import React from 'react'
import { css } from 'react-emotion'
import themes from '../helpers/theme'

const cardStyle = theme => css`
  background: linear-gradient(45deg, ${themes[theme].join(',')});
  color: white;

  border-radius: 12px;
  box-shadow: 0px 0px 16px lightgrey;
  padding: 24px;
`

const Card = ({ card: { id, title, content, theme }, className }) => (
  <div className={className ? cardStyle(theme) + ' ' + className : cardStyle(theme)}>
    <b>{title}</b>
    <p>{content}</p>
  </div>
)

export default Card

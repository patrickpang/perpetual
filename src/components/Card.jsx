import React from 'react'
import { css } from 'react-emotion'
import { themes } from '../helpers/theme'
import { Link } from '@reach/router'

const cardStyle = theme => css`
  background: linear-gradient(45deg, ${themes[theme].join(',')});
  color: white;
  text-decoration: none;

  border-radius: 12px;
  box-shadow: 0px 0px 16px lightgrey;
  padding: 24px;
`

const Card = ({ card: { _id, title, theme }, preview, className }) => (
  <Link
    to={`/note/${_id}`}
    className={className ? cardStyle(theme) + ' ' + className : cardStyle(theme)}
  >
    <b>{title}</b>
    <p>{preview}</p>
  </Link>
)

export default Card

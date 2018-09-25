import React from 'react'
import { css } from 'react-emotion'
import { themes } from '../helpers/theme'
import { navigate } from '@reach/router'

const cardStyle = theme => css`
  background: linear-gradient(45deg, ${themes[theme].join(',')});
  color: white;
  cursor: pointer;

  border-radius: 12px;
  box-shadow: 0px 0px 16px lightgrey;
  padding: 24px;
`

const defaultOnClick = id => navigate(`/note/${id}`)

const Card = ({ card: { _id, title, theme, content }, className, onClick = defaultOnClick }) => (
  <div
    onClick={() => onClick(_id)}
    className={className ? cardStyle(theme) + ' ' + className : cardStyle(theme)}
  >
    <b>{title}</b>
    <p>{content && content.length > 0 ? content[0].content : null}</p>
  </div>
)

export default Card

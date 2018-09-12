import React from 'react'
import { Link } from '@reach/router'
import { css } from 'react-emotion'
import Icon from './Icon'
import { primary, secondary } from '../helpers/styles'
import Row from './Row'

const Nav = () => (
  <div
    className={css`
      position: fixed;
      top: 0;
      width: 100%;
      background: white;
    `}
  >
    <Row
      className={css`
        padding: 16px 32px;
      `}
    >
      <NavButton to="/agenda" icon="view_agenda" align="left" />
      <NavButton to="/" icon="highlight" />
      <NavButton to="/search" icon="search" align="right" />
    </Row>
  </div>
)

const NavButton = ({ to, icon, align = 'center' }) => (
  <Link
    to={to}
    getProps={({ isCurrent }) => ({
      style: { color: isCurrent ? primary : secondary },
    })}
    className={css`
      flex: 1;
      display: block;
      color: inherit;
      text-decoration: none;
      text-align: ${align};
    `}
  >
    <Icon
      className={css`
        font-size: 28px;
      `}
    >
      {icon}
    </Icon>
  </Link>
)

export default Nav

import { Link } from '@reach/router'
import React from 'react'
import { css } from 'react-emotion'
import { bottomBarStyle } from '../helpers/layout'
import Icon from './Icon'
import Row from './Row'

const Actions = () => (
  <Link to="/note" className={bottomBarStyle}>
    <Row>
      <Icon>add</Icon>
      <div
        className={css`
          margin-left: 8px;
        `}
      >
        write it down
      </div>
    </Row>
  </Link>
)

export default Actions

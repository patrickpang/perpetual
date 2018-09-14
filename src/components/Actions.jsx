import { Link } from '@reach/router'
import React from 'react'
import { css } from 'react-emotion'
import { bottomBarStyle } from '../helpers/layout'
import Icon from './Icon'
import Row from './Row'

const Actions = () => (
  <Row className={bottomBarStyle}>
    <Link
      to="/note"
      className={css`
        flex: 1;
        color: inherit;
        text-decoration: none;
      `}
    >
      <Row>
        <Icon>add</Icon>
        <div
          className={css`
            margin: 0 16px;
          `}
        >
          write it down
        </div>{' '}
      </Row>
    </Link>
    <Icon>cloud_queue</Icon>
    {/* <Icon>cloud_off</Icon> */}
  </Row>
)

export default Actions

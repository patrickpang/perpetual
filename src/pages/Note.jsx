import React, { Component, createRef } from 'react'
import { css } from 'react-emotion'
import { bottomBarStyle } from '../helpers/layout'
import Row from '../components/Row'
import Icon from '../components/Icon'
import themes from '../helpers/theme'
import Input from '../components/Input'

const blocks = [
  {
    id: 1,
    content: 'HKU',
    children: [
      {
        id: 2,
        content: 'CS',
        children: [
          { id: 4, content: 'COMP3230', children: [] },
          { id: 5, content: 'COMP3278', children: [] },
          { id: 6, content: 'COMP3117', children: [] },
          { id: 7, content: 'COMP3297', children: [] },
        ],
      },
      { id: 3, content: 'BBA', children: [{ id: 6, content: 'MKTG2501', children: [] }] },
    ],
  },
]

class Outliner extends Component {
  render() {
    const { blocks } = this.props
    return (
      <div>
        {blocks.map(block => (
          <div
            key={block.id}
            className={css`
              margin: 16px 0 0 16px;
            `}
          >
            <Block block={block} />
            {block.children.length > 0 && <Outliner blocks={block.children} />}
          </div>
        ))}
      </div>
    )
  }
}

class Block extends Component {
  state = { editing: false }

  render() {
    const { id, content } = this.props.block
    const { editing } = this.state

    return (
      <div onClick={() => this.setState({ editing: true })}>
        {editing ? (
          <Input
            value={content}
            onBlur={() => this.setState({ editing: false })}
            autoFocus={true}
          />
        ) : (
          <div>{content}</div>
        )}
      </div>
    )
  }
}

const Note = ({ id }) => (
  <div>
    <div
      className={css`
        background: linear-gradient(45deg, ${themes['green'].join(',')});
        color: white;
        padding: 32px;
      `}
    >
      <Input type="text" autoFocus={true} placeholder="what's on your mind?" />
    </div>

    <div
      className={css`
        padding: 16px;
      `}
    >
      <Outliner blocks={blocks} />
    </div>

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

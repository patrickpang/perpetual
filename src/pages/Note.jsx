import React, { Component } from 'react'
import { css } from 'react-emotion'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { bottomBarStyle } from '../helpers/layout'
import Row from '../components/Row'
import Icon from '../components/Icon'
import themes from '../helpers/theme'
import Input from '../components/Input'

// https://codesandbox.io/s/k260nyxq9v

const blocks = [
  { id: 4, type: 'text', content: 'COMP3230' },
  { id: 5, type: 'text', content: 'COMP3278' },
  { id: 6, type: 'text', content: 'COMP3117' },
  { id: 7, type: 'text', content: 'COMP3297' },
  { id: 8, type: 'text', content: 'MKTG2501' },
]

class BlocksList extends Component {
  render() {
    const { blocks } = this.props
    return (
      <Droppable droppableId="blocks">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={css`
              padding: 16px;
            `}
          >
            {blocks.map((block, index) => (
              <TextBlock key={block.id} index={index} block={block} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    )
  }
}

class TextBlock extends Component {
  state = { editing: false }

  render() {
    const {
      index,
      block: { id, content },
    } = this.props
    const { editing } = this.state

    return (
      <Draggable draggableId={`block-${id}`} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => this.setState({ editing: true })}
            className={css`
              padding: 16px;
            `}
          >
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
        )}
      </Draggable>
    )
  }
}

class Note extends Component {
  onDragEnd = result => {
    if (!result.destination) {
      return
    }
    console.log(result)
  }

  render() {
    const { id } = this.props

    return (
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

        <DragDropContext onDragEnd={this.onDragEnd}>
          <BlocksList blocks={blocks} />
        </DragDropContext>

        <Actions />
      </div>
    )
  }
}

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

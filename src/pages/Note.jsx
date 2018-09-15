import React, { Component } from 'react'
import { css } from 'react-emotion'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import uuid from 'uuid/v4'
import hash from 'object-hash'

import { bottomBarStyle } from '../helpers/layout'
import Row from '../components/Row'
import Icon from '../components/Icon'
import { themes, randomTheme } from '../helpers/theme'
import Input from '../components/Input'
import { saveCard, getCard, deleteCard } from '../database/cards'
import { db } from '../database/core'
import Layout from '../components/Layout'
import Main from '../components/Main'
import BasicButton from '../components/BasicButton'

class Note extends Component {
  state = { title: '', content: [], theme: randomTheme(), _rev: null, checksum: null }

  async componentDidMount() {
    const { id } = this.props
    if (id) {
      const { title, content, theme, _rev } = await getCard(db, id)
      this.setState({ title, content, theme, _rev, checksum: hash({ title, content, theme }) })
    }
  }

  async componentWillUnmount() {
    const { id } = this.props
    const { title, content, theme, _rev, checksum } = this.state
    if (title.length > 0) {
      if (checksum !== hash({ title, content, theme })) {
        await saveCard(db, {
          _id: id || uuid(),
          _rev,
          title,
          content,
          theme,
          mtime: new Date().getTime(),
        })
      }
    } else if (id && _rev) {
      await deleteCard(db, id, _rev)
    }
  }

  changeTheme = () => this.setState({ theme: randomTheme() })

  onDragEnd = result => {
    if (!result.destination) {
      return
    }

    const { content } = this.state
    this.setState({
      content: move(content, result.source.index, result.destination.index),
    })
  }

  render() {
    const { title, content, theme } = this.state

    return (
      <Layout>
        <Row
          className={css`
            background: linear-gradient(45deg, ${themes[theme].join(',')});
            color: white;
            padding: 32px;
          `}
        >
          <Input
            type="text"
            value={title}
            onChange={e => this.setState({ title: e.target.value })}
            autoFocus={true}
            placeholder="what's on your mind?"
          />
          <BasicButton
            onClick={this.changeTheme}
            className={css`
              padding: 8px;
            `}
          >
            <Icon>color_lens</Icon>
          </BasicButton>
        </Row>

        <Main>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <BlocksList blocks={content} onContentChange={content => this.setState({ content })} />
          </DragDropContext>
        </Main>

        <Actions />
      </Layout>
    )
  }
}

const BlocksList = ({ blocks, onContentChange }) => {
  const mergeBlocks = (blocks, { id, content }) =>
    blocks
      .map(block => (block.id === id ? (content.length > 0 ? { ...block, content } : null) : block))
      .filter(block => block)

  return (
    <Droppable droppableId="blocks">
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {blocks.map((block, index) => (
            <TextBlock
              key={block.id}
              index={index}
              block={block}
              onBlockChange={block => onContentChange(mergeBlocks(blocks, block))}
            />
          ))}
          <NewBlock onNewBlock={block => onContentChange([...blocks, block])} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

class TextBlock extends Component {
  state = { editing: false, content: this.props.block.content }

  handleSubmit = e => {
    const { content } = this.state
    const {
      block: { id },
      onBlockChange,
    } = this.props

    onBlockChange({ id, content })
    this.setState({ editing: false })
    e.preventDefault()
  }

  render() {
    const {
      index,
      block: { id },
    } = this.props
    const { editing, content } = this.state

    return (
      <Draggable draggableId={`block-${id}`} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => this.setState({ editing: true })}
            className={css`
              padding: 16px 0;
            `}
          >
            {editing ? (
              <form onSubmit={this.handleSubmit}>
                <Input
                  value={content}
                  onChange={e => this.setState({ content: e.target.value })}
                  onBlur={this.handleSubmit}
                />
              </form>
            ) : (
              <div>{content}</div>
            )}
          </div>
        )}
      </Draggable>
    )
  }
}

class NewBlock extends Component {
  state = { content: '' }

  handleSubmit = e => {
    const { content } = this.state
    if (content.length > 0) {
      const { onNewBlock } = this.props
      onNewBlock({ id: uuid(), type: 'text', content })
      this.setState({ content: '' })
      e.preventDefault()
    }
  }

  render() {
    const { content } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          value={content}
          onChange={e => this.setState({ content: e.target.value })}
          onBlur={this.handleSubmit}
          placeholder="write it down"
          className={css`
            padding: 16px 0;

            &::placeholder {
              color: grey;
            }
          `}
        />
      </form>
    )
  }
}

const Actions = () => (
  <div className={bottomBarStyle}>
    <Row>
      <div
        className={css`
          width: 100%;
          box-sizing: border-box;
          display: flex;
          justify-content: space-around;
        `}
      >
        <Icon>undo</Icon>
        <Icon>redo</Icon>
      </div>
    </Row>
  </div>
)

const move = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export default Note

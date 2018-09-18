import React, { Component } from 'react'
import { css } from 'react-emotion'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import uuid from 'uuid/v4'
import hash from 'object-hash'

import { bottomBarStyle } from '../helpers/layout'
import Row from '../components/Row'
import Icon from '../components/Icon'
import { themes, randomTheme } from '../helpers/theme'
import BasicInput from '../components/BasicInput'
import { saveCard, getCard, deleteCard } from '../database/cards'
import { db, events } from '../database/core'
import Layout from '../components/Layout'
import Main from '../components/Main'
import BasicButton from '../components/BasicButton'

class Note extends Component {
  state = {
    title: '',
    content: [],
    tagStr: '',
    theme: randomTheme(),
    date: '',
    _rev: null,
    checksum: null,
  }

  async componentDidMount() {
    const { id } = this.props
    if (id) {
      this.loadCard()
      events.on('change', this.handleDocsChange)
    }
  }

  async componentWillUnmount() {
    const { id } = this.props
    const { title, content, theme, date, tagStr, _rev, checksum } = this.state
    if (title.length > 0) {
      if (checksum !== hash({ title, content, theme, date, tagStr })) {
        await saveCard(db, {
          _id: id || uuid(),
          _rev,
          title,
          content,
          theme,
          mtime: new Date().getTime(),
          ...(date.length > 0 ? { date } : {}),
          ...(tagStr.length > 0
            ? {
                tags: tagStr
                  .trim()
                  .toLowerCase()
                  .split(' '),
              }
            : {}),
        })
      }
    } else if (id && _rev) {
      await deleteCard(db, id, _rev)
    }
    events.removeListener('change', this.handleDocsChange)
  }

  handleDocsChange = change => {
    const { id } = this.props
    if (change.id === id) {
      if (change.deleted) {
        // TODO: prompt
      } else {
        this.loadCard()
      }
    }
  }

  loadCard = () => {
    const { id } = this.props
    getCard(db, id).then(({ title, content, theme, date = '', tags = [], _rev }) => {
      const tagStr = tags.join(' ')
      this.setState({
        title,
        content,
        theme,
        date,
        tagStr,
        _rev,
        checksum: hash({ title, content, theme, date, tagStr }),
      })
    })
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
    const { title, content, theme, date, tagStr } = this.state

    return (
      <Layout>
        <div
          className={css`
            background: linear-gradient(45deg, ${themes[theme].join(',')});
            color: white;
            padding: 32px;
          `}
        >
          <Row>
            <BasicInput
              type="text"
              value={title}
              onChange={e => this.setState({ title: e.target.value })}
              autoFocus={true}
              placeholder="what's on your mind?"
              className={css`
                font-size: 120%;
              `}
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

          <Row
            className={css`
              margin-top: 8px;
            `}
          >
            <Icon>today</Icon>
            <BasicInput
              type="date"
              value={date}
              onChange={e => this.setState({ date: e.target.value })}
              className={css`
                margin-left: 8px;
                margin-right: 8px;
              `}
            />
          </Row>

          <Row
            className={css`
              margin-top: 8px;
            `}
          >
            <Icon>label</Icon>
            <BasicInput
              type="text"
              placeholder="tags"
              className={css`
                margin-left: 8px;
                margin-right: 8px;
              `}
              value={tagStr}
              onChange={e => this.setState({ tagStr: e.target.value })}
            />
          </Row>
        </div>

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
              key={`${block.id} ${block.content}`} // assume block.content is string
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
                <BasicInput
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
    }
    e.preventDefault()
  }

  render() {
    const { content } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <BasicInput
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

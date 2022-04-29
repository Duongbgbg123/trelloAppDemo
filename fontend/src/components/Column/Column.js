import React, { useEffect, useRef, useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import './Column.scss';
import Card from '../Card/Card';
import { mapOrder } from '../../ulities/sort';
import { Container, Draggable } from 'react-smooth-dnd';
import ConfirmModal from '../../Common/ConfirmModal';
import {
  MODAL_ACTION_CLOSE,
  MODAL_ACTION_CONFIRM,
} from '../../ulities/constants';

function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props;
  // console.log(column);
  const cards = mapOrder(column.cards, column.cardOrder, 'id');
  // console.log(cards);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [titleColumn, setTitleColumn] = useState('');
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [isShowNewCard, setIsShowNewCard] = useState(false);
  const [valueTextArea, setValueTextArea] = useState('');

  const textAreaRef = useRef(null);
  const inputRef = useRef();

  useEffect(() => {
    if (isShowNewCard === true && textAreaRef && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [isShowNewCard]);

  const toggleModal = () => {
    setIsShowModalDelete(!isShowModalDelete);
  };
  useEffect(() => {
    if (column && column.title);
    setTitleColumn(column.title);
  }, [column]);
  const onModalAction = (type) => {
    if (type === MODAL_ACTION_CLOSE) {
    }
    if (type === MODAL_ACTION_CONFIRM) {
      //remove a column
      const newColumn = {
        ...column,
        _destroy: true,
      };
      onUpdateColumn(newColumn);
    }
    toggleModal();
  };
  const selectAllText = (e) => {
    setIsFirstClick(false);
    if (isFirstClick) {
      e.target.select();
    } else {
      inputRef.current.setSelectionRange(
        titleColumn.length,
        titleColumn.length
      );
    }
    // e.target.focus();
  };

  const handleClicksOutside = () => {
    //do something
    setIsFirstClick(true);
    const newColumn = {
      ...column,
      title: titleColumn,
      _destroy: false,
    };
    onUpdateColumn(newColumn);
  };

  const handleAddNewCard = () => {
    if (!valueTextArea) {
      textAreaRef.current.focus();
      return;
    }
    const newCard = {
      id: uuidv4(),
      boardId: column.boardId,
      columnId: column.id,
      title: valueTextArea,
      image: null,
    };
    let newColumn = { ...column };
    newColumn.cards = [...newColumn.cards, newCard];
    newColumn.cardOrder = newColumn.cards.map((card) => card.id);
    // console.log(newColumn);
    onUpdateColumn(newColumn);
    setValueTextArea('');
    setIsShowNewCard(false);
  };

  return (
    <>
      <div className="column">
        <header className="column-drag-handle">
          <div className="column-title">
            <Form.Control
              size={'sm'}
              type="text"
              value={titleColumn}
              className="customize-input-column"
              onClick={selectAllText}
              onChange={(e) => setTitleColumn(e.target.value)}
              spellCheck="false"
              onBlur={handleClicksOutside}
              onMouseDown={(e) => e.preventDefault()}
              ref={inputRef}
            />
          </div>
          <div className="column-dropdown">
            <Dropdown>
              <Dropdown.Toggle
                variant=""
                id="dropdown-basic"
                size="sm"
              ></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Add Card</Dropdown.Item>
                <Dropdown.Item onClick={toggleModal}>
                  Remove this column...
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </header>
        <div className="task-list">
          <Container
            groupName="col"
            onDrop={(dropResult) => onCardDrop(dropResult, column.id)}
            getChildPayload={(index) => cards[index]}
            dragClass="card-ghost"
            dropClass="card-ghost-drop"
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: 'card-drop-preview',
            }}
            dropPlaceholderAnimationDuration={200}
          >
            {cards &&
              cards.length > 0 &&
              cards.map((card, index) => {
                return (
                  <Draggable key={card.id}>
                    <Card card={card} />
                  </Draggable>
                );
              })}
          </Container>
          {isShowNewCard === true && (
            <div className="add-new-card">
              <textarea
                rows="2"
                type="text"
                className="form-control"
                placeholder=""
                ref={textAreaRef}
                value={valueTextArea}
                onChange={(e) => setValueTextArea(e.target.value)}
              ></textarea>
              <div className="group-btn">
                <button className="btn btn-success" onClick={handleAddNewCard}>
                  Add List
                </button>
                <i className="fa fa-times icon"></i>
              </div>
            </div>
          )}
        </div>
        {isShowNewCard === false && (
          <footer>
            <div
              className="footer-action"
              onClick={() => setIsShowNewCard(true)}
            >
              <i className="fa fa-plus icon"></i>
              Add another card
            </div>
          </footer>
        )}
      </div>
      <ConfirmModal
        show={isShowModalDelete}
        title="Remove A Column"
        content={`Are you sure to remove this column : <b>${column.title}<b>`}
        onAction={onModalAction}
      />
    </>
  );
}

export default Column;

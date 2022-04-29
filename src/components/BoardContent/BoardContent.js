import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import './BoardContent.scss';
import Column from '../Column/Column';
import { initData } from '../../actions/initData';
import { mapOrder } from '../../ulities/sort';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from '../../ulities/dragDrop';
function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [isShowAddList, setIsShowAddList] = useState(false);
  const [valueInput, setValueInput] = useState('');
  const inputRef = useRef(null);
  useEffect(() => {
    if (isShowAddList === true && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShowAddList]);

  useEffect(() => {
    const boardInitData = initData.boards.find((item) => item.id === 'board-1');
    if (boardInitData) {
      setBoard(initData);

      setColumns(
        mapOrder(boardInitData.columns, boardInitData.columnOrder, 'id')
      );
    }
  }, []);

  if (_.isEmpty(board)) {
    return (
      <>
        <div className="board-not-found">Board Not Found</div>
      </>
    );
  }

  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);
    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((column) => column.id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
  };

  const onCardDrop = (dropResult, columnId) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      console.log('onCardDrop : ', dropResult, columnId);

      let NewColumns = [...columns];
      let currentColumn = NewColumns.find((column) => column.id === columnId);
      console.log('current column', currentColumn);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((card) => card.id);
      setColumns(NewColumns);
    }
  };

  const handleAddList = () => {
    if (!valueInput) {
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
        return;
      }
    }
    //update board columns
    const _columns = _.cloneDeep(columns);
    // console.log(_column);
    _columns.push({
      id: uuidv4(),
      boardId: board.id,
      title: valueInput,
      cards: [],
    });
    setColumns(_columns);
    setValueInput('');

    // setIsShowAddList(false);
    inputRef.current.focus();
  };

  const onUpdateColumn = (newColumn) => {
    const columnIdUpdate = newColumn.id;
    let ncols = [...columns]; //originnal
    let index = ncols.findIndex((item) => (item.id = columnIdUpdate));
    if (newColumn._destroy) {
      //remove column
      ncols.splice(index, 1);
    } else {
      ncols[index] = newColumn;
    }
    setColumns(ncols);
  };
  // console.log(columns);
  return (
    <>
      <div className="board-columns">
        <Container
          orientation="horizontal"
          getChildPayload={(index) => columns[index]}
          onDrop={onColumnDrop}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'columns-drop-preview',
          }}
        >
          {columns &&
            columns.length > 0 &&
            columns.map((column, index) => {
              return (
                <Draggable key={column.id}>
                  <Column
                    column={column}
                    onCardDrop={onCardDrop}
                    onUpdateColumn={onUpdateColumn}
                  />
                </Draggable>
              );
            })}
        </Container>

        {isShowAddList === false ? (
          <div
            className="add-new-column"
            onClick={() => setIsShowAddList(!isShowAddList)}
          >
            <i className="fa fa-plus icon"></i> Add New Column
          </div>
        ) : (
          <div className="content-add-column">
            <input
              type="text"
              className="form-control"
              placeholder=""
              ref={inputRef}
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value)}
            />
            <div className="group-btn">
              <button className="btn btn-success" onClick={handleAddList}>
                Add List
              </button>
              <i
                className="fa fa-times icon"
                onClick={() => setIsShowAddList(!isShowAddList)}
              ></i>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default BoardContent;

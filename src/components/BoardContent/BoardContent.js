import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './BoardContent.scss';
import Column from '../Column/Column';
import { initData } from '../../actions/initData';
import { mapOrder } from '../../ulities/sort';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from '../../ulities/dragDrop';
function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

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
                  <Column column={column} onCardDrop={onCardDrop} />
                </Draggable>
              );
            })}
          <div className="add-new-column">
            <i className="fa fa-plus icon"></i> Add New Column
          </div>
        </Container>
      </div>
    </>
  );
}

export default BoardContent;

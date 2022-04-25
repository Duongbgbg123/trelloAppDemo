import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './BoardContent.scss';
import Column from '../Column/Column';
import { initData } from '../../actions/initData';
import { mapOrder } from '../../ulities/sort';
import { Container, Draggable } from 'react-smooth-dnd';
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
    console.log('dropResult', dropResult);
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
                  <Column column={column} />
                </Draggable>
              );
            })}
        </Container>
      </div>
    </>
  );
}

export default BoardContent;

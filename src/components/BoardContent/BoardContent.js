import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './BoardContent.scss';
import Column from '../Column/Column';
import { initData } from '../../actions/initData';
import { mapOrder } from '../../ulities/sort';
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

  return (
    <>
      <div className="board-columns">
        {columns &&
          columns.length > 0 &&
          columns.map((column, index) => {
            return <Column key={column.id} column={column} />;
          })}
      </div>
    </>
  );
}

export default BoardContent;

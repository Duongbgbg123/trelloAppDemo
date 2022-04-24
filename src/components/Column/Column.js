import React from 'react';
import './Column.scss';
import Task from '../Task/Task';
function Column() {
  return (
    <>
      <div className="column">
        <header>BrainStorm</header>
        <ul className="task-list">
          <Task />
          <Task />

          <Task />
        </ul>
        <footer>Add another card</footer>
      </div>
    </>
  );
}

export default Column;

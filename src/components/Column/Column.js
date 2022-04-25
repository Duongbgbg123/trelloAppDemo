import React from 'react';
import './Column.scss';
import Card from '../Card/Card';
import { mapOrder } from '../../ulities/sort';
function Column(props) {
  const { column } = props;
  // console.log(column);
  const cards = mapOrder(column.cards, column.cardOrder, 'id');
  // console.log(cards);
  return (
    <>
      <div className="column">
        <header>{column.title}</header>
        <ul className="task-list">
          {cards &&
            cards.length > 0 &&
            cards.map((card, index) => {
              return <Card key={card.id} card={card} />;
            })}
        </ul>
        <footer>Add another card</footer>
      </div>
    </>
  );
}

export default Column;

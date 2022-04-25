import React from 'react';
import './Card.scss';
function Card(props) {
  const { card } = props;
  return (
    <>
      <li className="task-item">
        {card.image && <img className="card-cover" src={card.image} alt="" />}
        {card.title}
      </li>
    </>
  );
}

export default Card;

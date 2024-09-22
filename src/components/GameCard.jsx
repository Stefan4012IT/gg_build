import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <img src={game.image} alt={game.name} className="game-card__image" />
      <div className="game-card__content">
        <h3 className="game-card__title">{game.name}</h3>
        <p className="game-card__description">{game.description}</p>
        <Link to={`/game/${game.id}`} className="game-card__details-button">
          Detalji
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
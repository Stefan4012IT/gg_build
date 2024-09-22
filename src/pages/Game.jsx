// src/pages/Game.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import GameHeader from '../components/GameHeader';
import Sidebar from '../components/Sidebar';
import TokenCard from '../components/TokenCard';
import gamesData from '../data/games';

const Game = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [filteredTokens, setFilteredTokens] = useState([]);

  useEffect(() => {
    const selectedGame = gamesData.find(game => game.id === parseInt(id));
    setGame(selectedGame);
    if (selectedGame) {
      setFilteredTokens(selectedGame.tokens);
    }
  }, [id]);

  const handleFilter = useCallback((min, max) => {
    if (game) {
      const tokens = game.tokens.filter(token => token.price >= min && token.price <= max);
      setFilteredTokens(tokens);
    }
  }, [game]);

  if (!game) {
    return <p>Loading...</p>;
  }

  return (
    <div className="game-page">
      <GameHeader
        headerImage={game.headerImage}
        profileImage={game.profileImage}
        gameName={game.name}
      />
      <div className="game-page__content">
        <Sidebar onFilter={handleFilter} />
        <div className="tokens-section">
          <h2>Tokeni</h2>
          <div className="tokens-grid">
            {filteredTokens.map(token => (
              <TokenCard key={token.id} token={token} game={game} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;

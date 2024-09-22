// src/pages/Home.jsx
import React, { useState } from 'react';
import GameCard from '../components/GameCard';
import gamesData from '../data/games';

const Home = () => {
  const [activeTab, setActiveTab] = useState('popular');

  const games = gamesData;

  // Filtriranje igara na osnovu aktivnog taba
  const filteredGames = activeTab === 'popular'
    ? games.filter(game => game.isPopular)
    : games;

  return (
    <div className="home-page">
      {/* Hero Slider */}
      <section className="hero-slider">
        <h1>Welcome to GG Build</h1>
        {/* Dodajte vaš hero slider ovde */}
      </section>

      {/* Tabs za filtriranje igara */}
      <section className="games-tabs">
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'popular' ? 'active' : ''}`}
            onClick={() => setActiveTab('popular')}
          >
            Popularne
          </button>
          <button
            className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            Sve Igre
          </button>
        </div>
      </section>

      {/* Lista igara */}
      <section className="games-list">
        {filteredGames.length > 0 ? (
          <div className="games-grid">
            {filteredGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <p>No games available.</p>
        )}
      </section>
    </div>
  );
};

export default Home;

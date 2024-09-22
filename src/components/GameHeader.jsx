import React from 'react';

const GameHeader = ({ headerImage, profileImage, gameName }) => {
  return (
    <header className="game-header">
      <img src={headerImage} alt={`${gameName} Header`} className="game-header__image" />
      <div className="game-header__info">
        <img src={profileImage} alt={`${gameName} Profile`} className="game-header__profile-image" />
        <h2 className="game-header__title">{gameName}</h2>
      </div>
    </header>
  );
};

export default GameHeader;
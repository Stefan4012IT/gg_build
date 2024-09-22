import React from 'react';

const GameProfileImage = ({ src, alt }) => {
  return (
    <div className="game-profile-image">
      <img src={src} alt={alt} />
    </div>
  );
};

export default GameProfileImage;
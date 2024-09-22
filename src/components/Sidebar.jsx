// src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react';

const Sidebar = ({ onFilter }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(30);

  useEffect(() => {
    onFilter(minPrice, maxPrice);
  }, [minPrice, maxPrice, onFilter]);

  return (
    <aside className="sidebar">
      <h3>Filtriraj po ceni (€)</h3>
      <div className="slider-container">
        <label htmlFor="minPrice">Min: {minPrice}</label>
        <input
          type="range"
          id="minPrice"
          min="0"
          max="30"
          step="0.5"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
        />
      </div>
      <div className="slider-container">
        <label htmlFor="maxPrice">Max: {maxPrice}</label>
        <input
          type="range"
          id="maxPrice"
          min="0"
          max="30"
          step="0.5"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </div>
    </aside>
  );
};

export default Sidebar;

// src/components/TokenCard.jsx
import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

const TokenCard = ({ token, game }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  const handleIncrease = () => {
    if (quantity < token.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(game, token, quantity);
    setQuantity(1); // Resetovanje količine nakon dodavanja
    alert('Token je dodat u korpu!');
  };

  return (
    <div className="token-card">
      <img src={token.image} alt={`Token ${token.value}`} className="token-card__image" />
      <div className="token-card__content">
        <h4 className="token-card__value">{token.value} Tokena</h4>
        <p className="token-card__price">{token.price} €</p>
        <div className="token-card__quantity">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleDecrease}
            disabled={quantity <= 1}
          >
            -
          </Button>{' '}
          <span className="token-card__quantity-value">{quantity}</span>{' '}
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleIncrease}
            disabled={quantity >= token.stock}
          >
            +
          </Button>
        </div>
        <Button
          variant="primary"
          className="token-card__add-button"
          onClick={handleAddToCart}
          disabled={token.stock === 0}
        >
          Dodaj u korpu
        </Button>
        {token.stock === 0 && <p className="token-card__out-of-stock">Nema na stanju</p>}
      </div>
    </div>
  );
};

export default TokenCard;

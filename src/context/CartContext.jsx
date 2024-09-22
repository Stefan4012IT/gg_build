// src/context/CartContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Inicijalizacija korpe iz localStorage ili prazno ako ne postoji
  const [cartItems, setCartItems] = useState(() => {
    try {
      const items = localStorage.getItem('cartItems');
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage', error);
      return [];
    }
  });

  // Čuvanje korpe u localStorage svaki put kada se cartItems promene
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage', error);
    }
  }, [cartItems]);

  // Dodavanje tokena u korpu
  const addToCart = (game, token, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.token.id === token.id && item.game.id === game.id
      );

      if (existingItem) {
        // Ažuriranje količine ako token već postoji u korpi
        return prevItems.map(item =>
          item.token.id === token.id && item.game.id === game.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, token.stock) }
            : item
        );
      } else {
        // Dodavanje novog tokena u korpu
        return [...prevItems, { game, token, quantity }];
      }
    });
  };

  // Uklanjanje tokena iz korpe
  const removeFromCart = (gameId, tokenId) => {
    setCartItems(prevItems =>
      prevItems.filter(
        item => !(item.game.id === gameId && item.token.id === tokenId)
      )
    );
  };

  // Ažuriranje količine tokena u korpi
  const updateQuantity = (gameId, tokenId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.game.id === gameId && item.token.id === tokenId
          ? { ...item, quantity: Math.min(newQuantity, item.token.stock) }
          : item
      )
    );
  };

  // Čišćenje korpe nakon kupovine
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

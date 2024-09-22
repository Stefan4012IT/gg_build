import React, { useState } from 'react';
import './styles/main.scss';

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Header from './components/Header';
// import ProtectedRoute from './components/ProtectedRoute';
import CartModal from './components/CartModal';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
  const [showCart, setShowCart] = useState(false);

  const handleOpenCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
          <Header openCart={handleOpenCart} /> 
          <CartModal show={showCart} handleClose={handleCloseCart} />
            <Routes>

              <Route path="/" element={<Home />} />
              <Route
                path="/game/:id"
                element={
                    <Game />
                }
              />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

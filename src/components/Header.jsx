// src/components/Header.jsx
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { Button } from 'react-bootstrap';

const Header = ({ openCart }) => { // Prijem openCart kao prop
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleHamburgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <div className="header__logo">
          <Link to="/">
            <img src="/assets/logo.png" alt="GG Build Logo" />
          </Link>
        </div>

        {/* Navigacija za desktop */}
        <nav className="header__nav">
          <ul className="header__menu">
            {/* Dugme Korpa je sada ovde */}
            <li className="header__item">
              <Button variant="outline-primary" className="header__button" onClick={openCart}>
                Korpa <span className="header__cart-count">{totalItems}</span>
              </Button>
            </li>
            <li className="header__item">
              <Link to="/help-center" className="header__link">
                Help Centar
              </Link>
            </li>
            {user ? (
              <>
                <li className="header__item">
                  <span className="header__user-email">Pozdrav, {user.email}</span>
                </li>
                <li className="header__item">
                  <Button variant="outline-danger" className="header__button" onClick={logout}>
                    Odjavi se
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li className="header__item">
                  <Button variant="outline-primary" className="header__button" onClick={handleShowRegister}>
                    Sign In
                  </Button>
                </li>
                <li className="header__item">
                  <Button variant="primary" className="header__button" onClick={handleShowLogin}>
                    Log In
                  </Button>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Hamburger meni za mobilnu verziju */}
        <div
          className={`header__hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={handleHamburgerClick}
          aria-label="Toggle navigation"
          role="button"
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleHamburgerClick();
          }}
        >
          <span className="hamburger-line hamburger-line-top"></span>
          <span className="hamburger-line hamburger-line-middle"></span>
          <span className="hamburger-line hamburger-line-bottom"></span>
        </div>
      </div>

      {/* Mobilni meni */}
      <nav
        className={`header__mobile-nav ${
          isMenuOpen ? 'header__mobile-nav--open' : ''
        }`}
      >
        <ul className="header__mobile-menu">
          {/* Dodavanje dugmeta Korpa u mobilni meni */}
          <li className="header__mobile-item">
            <Button variant="outline-primary" className="header__mobile-button" onClick={openCart}>
              Korpa ({totalItems})
            </Button>
          </li>
          <li className="header__mobile-item">
            <Link
              to="/help-center"
              className="header__mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Help Centar
            </Link>
          </li>
          {user ? (
            <>
              <li className="header__mobile-item">
                <span className="header__user-email">Pozdrav, {user.email}</span>
              </li>
              <li className="header__mobile-item">
                <Button variant="outline-danger" className="header__mobile-button" onClick={logout}>
                  Odjavi se
                </Button>
              </li>
            </>
          ) : (
            <>
              <li className="header__mobile-item">
                <Button variant="outline-primary" className="header__mobile-button" onClick={handleShowRegister}>
                  Sign In
                </Button>
              </li>
              <li className="header__mobile-item">
                <Button variant="primary" className="header__mobile-button" onClick={handleShowLogin}>
                  Log In
                </Button>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Overlay koji se prikazuje kada je meni otvoren */}
      {isMenuOpen && (
        <div className="header__overlay" onClick={handleHamburgerClick}></div>
      )}

      {/* Register Modal */}
      <RegisterModal show={showRegister} handleClose={handleCloseRegister} />

      {/* Login Modal */}
      <LoginModal show={showLogin} handleClose={handleCloseLogin} />
    </header>
  );
};

export default Header;

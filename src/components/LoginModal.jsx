// src/components/LoginModal.jsx
import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const LoginModal = ({ show, handleClose }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Event listener za otvaranje Login modal-a iz CartModal
  useEffect(() => {
    const openLogin = () => {
      handleClose(); // Zatvoriti sve druge modale
      handleShow(); // Otvoriti Login modal
    };

    window.addEventListener('openLoginModal', openLogin);

    return () => {
      window.removeEventListener('openLoginModal', openLogin);
    };
  }, [handleClose]);

  const handleShow = () => {
    // Funkcija za otvaranje modal-a
    // Ova funkcija će biti korišćena od strane CartModal
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    handleClose();
    // Nakon prijave, možete emitovati događaj za otvaranje korpe
    window.dispatchEvent(new Event('openCartModal'));
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="loginEmail">
            <Form.Label>Email adresa</Form.Label>
            <Form.Control
              type="email"
              placeholder="Unesite email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="loginPassword">
            <Form.Label>Lozinka</Form.Label>
            <Form.Control
              type="password"
              placeholder="Unesite lozinku"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Prijavi se
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;

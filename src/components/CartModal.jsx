// src/components/CartModal.jsx
import React, { useContext } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext'; // Uvoz AuthContext-a
import { useNavigate } from 'react-router-dom'; // Za preusmeravanje

const CartModal = ({ show, handleClose }) => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Ukupan iznos u korpi
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.token.price * item.quantity,
    0
  ).toFixed(2);

  const handlePurchase = () => {
    if (!cartItems.length) {
      alert('Korpa je prazna.');
      return;
    }

    if (!user) {
      alert('Morate biti ulogovani da biste izvršili kupovinu.');
      handleClose();
      navigate('/login'); // Preusmeravanje na login stranicu
      return;
    }

    // Procesuiranje kupovine (ovde možete dodati backend API poziv)
    alert('Kupovina je uspešno procesuirana!');
    clearCart();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Vaša Korpa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.length === 0 ? (
          <p>Vaša korpa je prazna.</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Igra</th>
                <th>Token</th>
                <th>Količina</th>
                <th>Cena po jedinici (€)</th>
                <th>Ukupno (€)</th>
                <th>Akcije</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={`${item.game.id}-${item.token.id}`}>
                  <td>{item.game.name}</td>
                  <td>{item.token.value} Tokena</td>
                  <td>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() =>
                        updateQuantity(item.game.id, item.token.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>{' '}
                    {item.quantity}{' '}
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() =>
                        updateQuantity(item.game.id, item.token.id, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.token.stock}
                    >
                      +
                    </Button>
                  </td>
                  <td>{item.token.price} €</td>
                  <td>{(item.token.price * item.quantity).toFixed(2)} €</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromCart(item.game.id, item.token.id)}
                    >
                      Ukloni
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Modal.Body>
      {cartItems.length > 0 && (
        <Modal.Footer>
          <div className="cart-summary">
            <h5>Ukupan iznos: {totalAmount} €</h5>
            <Button variant="success" onClick={handlePurchase}>
              Procesuiraj Kupovinu
            </Button>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CartModal;

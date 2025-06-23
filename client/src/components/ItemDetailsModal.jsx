// src/components/ItemDetailsModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ItemDetailsModal = ({ item, show, handleClose }) => {
  if (!item) return null; // Ensure item is defined before rendering

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{item.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={item.imageUrl} alt={item.name} className="img-fluid mb-3" />
        <p>{item.description}</p>
        <h5 className="text-success">{item.price}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">Add to Cart</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ItemDetailsModal;

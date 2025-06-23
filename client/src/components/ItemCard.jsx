// src/components/ItemCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/item/${item.id}`);
  };

  return (
    <div
      className="card h-100"
      style={{ cursor: 'pointer', transition: 'transform 0.2s ease-in-out' }}
      onClick={handleClick}
    >
      <img src={item.imageUrl} className="card-img-top" alt={item.name} />
      <div className="card-body text-center">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.price}</p>
      </div>
    </div>
  );
};

export default ItemCard;

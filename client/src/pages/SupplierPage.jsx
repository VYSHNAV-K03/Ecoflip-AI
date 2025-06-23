// src/pages/SupplierPage.jsx
import React from 'react';

const SupplierPage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="container">
      <h2>Supplier Dashboard</h2>
      {user.isVerified ? (
        <p>Welcome to the supplier dashboard.</p>
      ) : (
        <p>Your supplier account is not verified. Please contact support.</p>
      )}
    </div>
  );
};

export default SupplierPage;

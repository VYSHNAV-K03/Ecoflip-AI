// src/pages/AdminPanel/ManageSuppliers.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import BackButton from '../../components/BackButton';

const ManageSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('/admin/suppliers');
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };
    fetchSuppliers();
  }, []);

  const handleVerify = async (supplierId) => {
    try {
      const response = await axios.post(`/admin/suppliers/verify/${supplierId}`);
      // Refresh supplier list
      const updatedSupplier = response.data.supplier;
      setSuppliers((prevSuppliers) =>
        prevSuppliers.map((supplier) =>
          supplier._id === supplierId ? updatedSupplier : supplier
        )
      );
    } catch (error) {
      console.error('Error verifying supplier:', error);
    }
  };

  return (
    <div className="manage-suppliers">
      <BackButton />
      <h2>Manage Suppliers</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier._id}>
                <td>{supplier.name}</td>
                <td>{supplier.email}</td>
                <td>{supplier.isVerified ? 'Verified' : 'Not Verified'}</td>
                <td>
                  <button
                    onClick={() => handleVerify(supplier._id)}
                    className={`btn ${supplier.isVerified ? 'btn-danger' : 'btn-success'}`}
                  >
                    {supplier.isVerified ? 'Unverify' : 'Verify'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSuppliers;

// src/pages/SupplierPanel/SupplierDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

const SupplierDashboard = () => {
  return (
    <div className="supplier-dashboard">
      <h2>Supplier Dashboard</h2>
      <div className="dashboard-links">
        <Link to="/supplier/products" className="btn btn-primary mx-2 my-2">
          Manage Products
        </Link>
        <Link to="/supplier/add-product" className="btn btn-primary mx-2 my-2">
          Add Product
        </Link>
        {/* <Link to="/supplier/bookings" className="btn btn-primary mx-2 my-2">
          Manage Bookings
        </Link>
        <Link to="/supplier/stock" className="btn btn-primary mx-2 my-2">
          Manage Stock
        </Link> */}
      </div>
    </div>
  );
};

export default SupplierDashboard;

// src/pages/ShopPage.jsx
import React from "react";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";
import ItemGrid from "../components/ItemGrid";

const ShopPage = () => {
  return (
    <div className="container-fluid p-3">
      <h2 className="fw-bold">Shop Products</h2>
      <p className="text-muted">
        Explore our range of products available for purchase.
      </p>

      <div className="row mt-3">
        <ItemGrid />
      </div>
    </div>
  );
};

export default ShopPage;

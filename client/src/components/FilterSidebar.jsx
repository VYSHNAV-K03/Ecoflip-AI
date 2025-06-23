// src/components/FilterSidebar.jsx
import React from 'react';

const FilterSidebar = () => {
  return (
    <div className="p-3 border rounded bg-light">
      <h5 className="fw-bold">Filters</h5>

      <div className="mt-3">
        <h6>Category</h6>
        <div>
          <input type="checkbox" id="category1" /> <label htmlFor="category1">Category 1</label><br />
          <input type="checkbox" id="category2" /> <label htmlFor="category2">Category 2</label><br />
          <input type="checkbox" id="category3" /> <label htmlFor="category3">Category 3</label>
        </div>
      </div>

      <div className="mt-3">
        <h6>Price Range</h6>
        <input type="range" className="form-range" min="0" max="1000" />
      </div>

      <div className="mt-3">
        <h6>Brand</h6>
        <div>
          <input type="checkbox" id="brand1" /> <label htmlFor="brand1">Brand 1</label><br />
          <input type="checkbox" id="brand2" /> <label htmlFor="brand2">Brand 2</label><br />
          <input type="checkbox" id="brand3" /> <label htmlFor="brand3">Brand 3</label>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;

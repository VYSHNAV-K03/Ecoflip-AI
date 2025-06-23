// src/components/SearchBar.jsx
import React from 'react';

const SearchBar = () => {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search for items..."
        style={{ padding: '10px', borderRadius: '5px' }}
      />
    </div>
  );
};

export default SearchBar;

import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import axios, { baseURL, base } from "../axios"; // Import the axios instance
import { Link } from "react-router-dom";

const ItemGrid = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/customers/products"); // Replace with your endpoint
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  console.log(products);

  // Handle search input change
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredProducts(
      products.filter((product) => product.name.toLowerCase().includes(query))
    );
  };

  // Render loading state
  if (loading) {
    return <div>Loading products...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="row justify-content-center mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="row justify-content-center">
        {filteredProducts
          .filter((product) => product.seller === false)
          .map((product) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product._id}>
              <Link
                to={`/item/${product._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="card h-100">
                  <img
                    src={
                      base + product.image[0] ||
                      "https://via.placeholder.com/150"
                    }
                    className="card-img-top img-fluid"
                    alt={product.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text text-primary">{`$${product.price}`}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ItemGrid;

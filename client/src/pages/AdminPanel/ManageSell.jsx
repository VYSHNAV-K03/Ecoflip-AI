import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const ManageSellProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // State for modal data
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [stockUpdates, setStockUpdates] = useState({}); // State for individual stock updates

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/customer/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    await axios.delete(`/customer/products/${productId}`);
    // Refresh product list
    const response = await axios.get('/customer/products');
    setProducts(response.data);
  };

  const handleShowDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleStockChange = (productId, newStock) => {
    setStockUpdates((prevState) => ({
      ...prevState,
      [productId]: newStock,
    }));
  };

  const handleUpdateStock = async (productId) => {
    const newStock = stockUpdates[productId];
    if (!newStock || isNaN(newStock)) {
      alert('Please enter a valid stock value.');
      return;
    }
    try {
      await axios.put(`/customer/products/${productId}/update-stock`, { stock: newStock });
      // Refresh product list
      const response = await axios.get('/customer/products');
      setProducts(response.data);
      setStockUpdates((prevState) => ({
        ...prevState,
        [productId]: '',
      }));
      alert('Stock updated successfully.');
    } catch (error) {
      console.error(error);
      alert('Failed to update stock.');
    }
  };

  console.log(products);
  

  return (
    <div className="manage-products">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate('/add_cus')}
      >
        Add Product
      </button>
      <h2>Manage Products</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>
                <span>{product.brand}</span>
               
              </td>
             
              <td>
                <button
                  className="btn btn-info me-2"
                  onClick={() => handleShowDetails(product)}
                >
                  View Details
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Product Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Name:</strong> {selectedProduct.name}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <p><strong>Price:</strong> ${selectedProduct.price}</p>
            {selectedProduct.discountPrice && (
              <p><strong>Discounted Price:</strong> ${selectedProduct.discountPrice}</p>
            )}
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Stock:</strong> {selectedProduct.stock}</p>
            <p><strong>Verified:</strong> {selectedProduct.isVerified ? 'Yes' : 'No'}</p>
            {selectedProduct.image && selectedProduct.image.length > 0 && (
              <div>
                <strong>Images:</strong>
                <div>
                  {selectedProduct.image.map((img, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5000/${img}`}
                      alt={`${selectedProduct.name}-${index}`}
                      style={{ width: '100%', marginBottom: '10px' }}
                    />
                  ))}
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ManageSellProduct;

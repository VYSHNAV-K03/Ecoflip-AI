import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ManageProductsSupplier = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // State for modal data
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [stockUpdates, setStockUpdates] = useState({}); // State for individual stock updates

  const navigate = useNavigate();

  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("/suppliers/products", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    await axios.delete(`/suppliers/products/${productId}`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    // Refresh product list
    const response = await axios.get("/suppliers/products", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
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
      alert("Please enter a valid stock value.");
      return;
    }
    try {
      await axios.put(
        `/suppliers/products/${productId}/update-stock`,
        {
          stock: newStock,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      // Refresh product list
      const response = await axios.get("/suppliers/products", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      setProducts(response.data);
      setStockUpdates((prevState) => ({
        ...prevState,
        [productId]: "",
      }));
      alert("Stock updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to update stock.");
    }
  };

  return (
    <div className="p-3 manage-products">
      <button
        className="btn btn-secondary mb-3 me-2"
        onClick={() => navigate("/admin")}
      >
        Back to Dashboard
      </button>

      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/supplier/add-product")}
      >
        Add products
      </button>
      <h2>Manage Products</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Material</th>
            <th>Stock</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.material}</td>
              <td>
                <span>{product.stock}</span>
                <input
                  type="number"
                  className="form-control mt-1"
                  style={{ width: "100px", display: "inline-block" }}
                  placeholder="Update stock"
                  value={stockUpdates[product._id] || ""}
                  onChange={(e) =>
                    handleStockChange(product._id, e.target.value)
                  }
                />
                <button
                  className="btn btn-primary btn-sm ms-2"
                  onClick={() => handleUpdateStock(product._id)}
                >
                  Update
                </button>
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
            <p>
              <strong>Name:</strong> {selectedProduct.name}
            </p>
            <p>
              <strong>Description:</strong> {selectedProduct.description}
            </p>
            <p>
              <strong>Price:</strong> ${selectedProduct.price}
            </p>
            {selectedProduct.discountPrice && (
              <p>
                <strong>Discounted Price:</strong> $
                {selectedProduct.discountPrice}
              </p>
            )}
            <p>
              <strong>Stock:</strong> {selectedProduct.stock}
            </p>

            {selectedProduct.image && selectedProduct.image.length > 0 && (
              <div>
                <strong>Images:</strong>
                <div>
                  {selectedProduct.image.map((img, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5000/${img}`}
                      alt={`${selectedProduct.name}-${index}`}
                      style={{ width: "100%", marginBottom: "10px" }}
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

export default ManageProductsSupplier;

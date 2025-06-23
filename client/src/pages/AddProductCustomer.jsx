import React, { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const AddProductCustomer = () => {
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [durationOfUse, setDurationOfUse] = useState("");
  const [reason, setReason] = useState("");
  const [image, setImage] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", category);
    formData.append("material", material);
    formData.append("estimatedDeliveryTime", durationOfUse);
    formData.append("description", reason);
    formData.append("seller", true);
    image.forEach((img) => formData.append("image", img));

    try {
      const response = await axios.post("/customer/products", formData);
      console.log("Product added successfully:", response.data);
      navigate("/sell");
    } catch (err) {
      if (err.response) {
        console.error(
          "Server responded with:",
          err.response.status,
          err.response.data
        );
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Axios error:", err.message);
      }
      alert("Failed to add product. Check console for details.");
    }
  };

  return (
    <div className="add-product">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/sell")}
      >
        Back to Dashboard
      </button>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="material" className="form-label">
            Material
          </label>
          <input
            type="text"
            className="form-control"
            id="material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="durationOfUse" className="form-label">
            Duration of Use
          </label>
          <input
            type="text"
            className="form-control"
            id="durationOfUse"
            value={durationOfUse}
            onChange={(e) => setDurationOfUse(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="reason" className="form-label">
            Reason
          </label>
          <textarea
            className="form-control"
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Images
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductCustomer;

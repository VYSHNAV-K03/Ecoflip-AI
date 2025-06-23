import React, { useState } from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState(""); // New field for discount price
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState(""); // New field for subcategory
  const [image, setImage] = useState([]); // Updated to allow multiple images
  const [video, setVideo] = useState(null); // Field for product video
  const [weight, setWeight] = useState(""); // Field for weight
  const [dimensions, setDimensions] = useState({
    length: "",
    width: "",
    height: "",
  }); // Field for dimensions
  const [colorOptions, setColorOptions] = useState(""); // Field for color options as comma-separated values
  const [material, setMaterial] = useState(""); // Field for material
  const [brand, setBrand] = useState(""); // Field for brand
  const [shippingCharges, setShippingCharges] = useState(""); // Field for shipping charges
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState(""); // Field for delivery time
  const [safetyWarnings, setSafetyWarnings] = useState(""); // Field for safety warnings
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discountPrice", discountPrice); // Add discount price to form data
    formData.append("stock", stock);
    formData.append("category", category);
    formData.append("subcategory", subcategory); // Add subcategory to form data
    image.forEach((img) => formData.append("image", img)); // Add multiple images
    formData.append("video", video);
    formData.append("weight", weight);
    formData.append("dimensions[length]", dimensions.length);
    formData.append("dimensions[width]", dimensions.width);
    formData.append("dimensions[height]", dimensions.height);
    formData.append("colorOptions", colorOptions);
    formData.append("material", material);
    formData.append("brand", brand);
    formData.append("shippingCharges", shippingCharges);
    formData.append("estimatedDeliveryTime", estimatedDeliveryTime);
    formData.append("safetyWarnings", safetyWarnings);

    try {
      await axios.post("/suppliers/products", formData, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      navigate("/admin/products");
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="add-product">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/admin/products")}
      >
        Back to Dashboard
      </button>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            Stock
          </label>
          <input
            type="number"
            className="form-control"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
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
          <label htmlFor="weight" className="form-label">
            Weight
          </label>
          <input
            type="text"
            className="form-control"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dimensions" className="form-label">
            Dimensions
          </label>
          <input
            type="number"
            className="form-control mb-1"
            placeholder="Length"
            value={dimensions.length}
            onChange={(e) =>
              setDimensions({ ...dimensions, length: e.target.value })
            }
          />
          <input
            type="number"
            className="form-control mb-1"
            placeholder="Width"
            value={dimensions.width}
            onChange={(e) =>
              setDimensions({ ...dimensions, width: e.target.value })
            }
          />
          <input
            type="number"
            className="form-control"
            placeholder="Height"
            value={dimensions.height}
            onChange={(e) =>
              setDimensions({ ...dimensions, height: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="colorOptions" className="form-label">
            Color Options (comma-separated)
          </label>
          <input
            type="text"
            className="form-control"
            id="colorOptions"
            value={colorOptions}
            onChange={(e) => setColorOptions(e.target.value)}
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
          <label htmlFor="shippingCharges" className="form-label">
            Shipping Charges
          </label>
          <input
            type="number"
            className="form-control"
            id="shippingCharges"
            value={shippingCharges}
            onChange={(e) => setShippingCharges(e.target.value)}
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

export default AddProduct;

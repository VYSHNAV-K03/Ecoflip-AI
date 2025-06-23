// routes/customerRoutes.js
const express = require("express");
const Product = require("../models/Product"); // Import the Product model
const router = express.Router();

// Get customer profile (Mock example)
router.get("/profile", (req, res) => {
  res.json({ id: 1, name: "John Doe", email: "johndoe@example.com" });
});

// Update customer profile (Mock example)
router.put("/profile", (req, res) => {
  const updatedProfile = req.body;
  res.json({ message: "Profile updated successfully", updatedProfile });
});

// Get all products or filter by category/subcategory
router.get("/products", async (req, res) => {
  try {
    const { category, subcategory, sortBy, sortOrder = "asc" } = req.query;

    // Build query object
    // let query = {};
    // if (category) query.category = category;
    // if (subcategory) query.subcategory = subcategory;
    // query.seller = false;

    // Fetch products based on query
    const products = await Product.find({}).sort({
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Get single product details by ID
router.get("/products/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching product details" });
  }
});

// Add product to favorites (Mock example)
router.post("/favorites", (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  // Here you could integrate logic to save the product ID to the customer's favorites in the database
  res.json({ message: `Product ${productId} added to favorites` });
});

// Get customer order history (Mock example)
router.get("/orders", (req, res) => {
  const orders = [
    { id: 1, product: "Product 1", date: "2024-12-01", status: "Delivered" },
    { id: 2, product: "Product 2", date: "2024-12-03", status: "In Transit" },
  ];
  res.json(orders);
});

module.exports = router;

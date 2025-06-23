const Product = require("../models/Product"); // Import Product model

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    // .populate('supplier', 'name email'); // Populate supplier name and email from User model
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

// Verify a product
const verifyProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { isVerified: true },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error verifying product" });
  }
};

// Unverify a product
const unverifyProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { isVerified: false },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error unverifying product" });
  }
};

module.exports = { getAllProducts, verifyProduct, unverifyProduct };

const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  verifyProduct,
  unverifyProduct,
} = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getSuppliers,
  verifySupplier,
  getUsers,
} = require("../controllers/supplierController");
const User = require("../models/User");
const Material = require("../models/Bookings");

// Route to get all suppliers
router.get("/suppliers", authMiddleware, getSuppliers);
router.get("/suppliers/users", authMiddleware, getUsers);

// Route to verify a supplier
router.post("/suppliers/verify/:id", authMiddleware, verifySupplier);

// Delete Supplier User
router.delete("/suppliers/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const supplier = await User.findById(id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    console.error("Error deleting supplier:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Get all products
router.get("/products", getAllProducts);

// Verify a product
router.put("/products/:id/verify", verifyProduct);

// Unverify a product
router.put("/products/:id/unverify", unverifyProduct);

// Get customer order history
router.get("/orders", async (req, res) => {
  try {
    const orders = await Material.find()
      .populate("userId")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching order history" });
  }
});

module.exports = router;

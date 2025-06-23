const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Configure file upload
const authMiddleware = require("../middlewares/authMiddleware");
const enrollmentModel = require("../models/enrollmentModel");
const Product = require("../models/Product");

router.post(
  "/products",
  authMiddleware,
  upload.fields([
    { name: "image", maxCount: 5 }, // Allow multiple images (adjust maxCount as needed)
    { name: "video", maxCount: 1 }, // Allow only one video
  ]),
  addProduct
);
router.get("/products", authMiddleware, getProducts);
// router.put('/products/:id', authMiddleware, updateProduct);
router.delete("/products/:id", authMiddleware, deleteProduct);

router.get("/bookings", authMiddleware, async (req, res) => {
  try {
    const supplierId = req.user.userId; // Get the supplier ID from the authenticated user

    // Find bookings where the supplier is linked to the product
    const bookings = await enrollmentModel
      .find()
      .populate({
        path: "itemId",
        match: { supplier: supplierId }, // Match products for the supplier
        select: "name price",
      })
      .populate({
        path: "userId",
        select: "name email", // Include name and email of the user
      })
      .sort({ createdAt: -1 });

    // Filter out bookings where the product doesn't match the supplier
    const filteredBookings = bookings.filter((booking) => booking.itemId);

    res.status(200).json(filteredBookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch bookings", error: error.message });
  }
});

router.put("/products/:id/update-stock", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  if (isNaN(stock) || stock < 0) {
    return res.status(400).json({ message: "Invalid stock value" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { stock },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Stock updated successfully", product: updatedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update stock", error: error.message });
  }
});

module.exports = router;

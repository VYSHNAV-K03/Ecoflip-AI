const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const supplierRoutes = require("./routes/supplierRoutes"); // Import supplier routes
const adminRoutes = require("./routes/adminRoutes"); // Import admin routes
const productRoutes = require("./routes/productRoutes"); // Import product routes
const path = require("path");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
// app.use('/api/admin', supplierRoutes); // Admin routes (for managing suppliers)
app.use("/api/admin", adminRoutes); // Admin routes

// Supplier-related routes
app.use("/api/suppliers", productRoutes); // Product management routes for suppliers
app.use("/api/customer", productRoutes); // Product management routes for suppliers

app.use("/api/customers", require("./routes/customerRoutes"));

app.use("/api/payments", require("./routes/paymentRoutes"));

app.use("/api/cart", require("./routes/cart"));

app.use("/api/review", require("./routes/reviews"));

app.use("/api/materials", require("./routes/materialRoutes"));


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

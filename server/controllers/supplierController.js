const User = require("../models/User");

// Get all suppliers
const getSuppliers = async (req, res) => {
  try {
    // Find users who are suppliers
    const suppliers = await User.find({ isSupplier: true });
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  console.log("helloo");

  try {
    // Find users who are suppliers
    const suppliers = await User.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify or unverify a supplier
const verifySupplier = async (req, res) => {
  const { id } = req.params;
  try {
    const supplier = await User.findById(id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    if (!supplier.isSupplier) {
      return res.status(400).json({ message: "User is not a supplier" });
    }

    // Toggle verification status
    supplier.isVerified = !supplier.isVerified;
    await supplier.save();

    res.status(200).json({
      message: "Supplier verification status updated",
      supplier,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { verifySupplier, getSuppliers, getUsers };

const express = require("express");
const Material = require("../models/Bookings");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add-materials", async (req, res) => {
  try {
    const { userId, materials } = req.body;

    const materialData = materials.map((item) => ({
      ...item,
      userId,
    }));

    await Material.insertMany(materialData);
    res.status(201).json({ message: "Materials submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/orders/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    const orders = await Material.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Server error. Unable to fetch orders." });
  }
});

router.get("/all-materials", async (req, res) => {
  try {
    const materials = await Material.find().populate(
      "userId",
      "name email place phone address"
    );
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/verify-material", authMiddleware, async (req, res) => {
  try {
    const { materialId, driverId, status, verifiedBy } = req.body;

    const material = await Material.findById(materialId);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    console.log(req.user.userId);

    material.status = status;
    material.verifiedBy = req.user.userId;

    await material.save();

    // If Verified, Add Points to User
    if (status === "Verified") {
      const user = await User.findById(material.userId);
      user.points += material.points;
      await user.save();
    }

    res.json({ message: `Material ${status.toLowerCase()} successfully!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

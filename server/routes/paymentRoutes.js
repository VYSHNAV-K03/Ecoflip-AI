const authMiddleware = require("../middlewares/authMiddleware");
const Cart = require("../models/Cart");
const enrollmentModel = require("../models/Orders");
const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/verify-payment", authMiddleware, async (req, res) => {
  console.log(req.body);

  const pointsUsed = req.body.pointsUsed || 0;

  console.log("Points used:", pointsUsed);

  try {
    // Step 1: Save enrollment details in the database
    const newEnrollment = new enrollmentModel({
      userId: req.user.userId, // Authenticated user ID
      itemId: req.body.itemId,
      amountPaid: req.body.amount,
      supplier: req.body.supplier,
      status: "Paid",
      createdAt: new Date(),
    });

    await newEnrollment.save();

    // Step 2: Remove item from cart
    await Cart.findOneAndDelete({
      userId: req.user.userId,
      productId: req.body.itemId, // assuming itemId in enrollment is the same as productId in cart
    });

    console.log(
      "Payment verified, enrollment saved, and cart item removed:",
      newEnrollment
    );

    // Step 3: Deduct used points from user's profile
    if (pointsUsed > 0) {
      const user = await User.findById(req.user.userId);

      console.log("User found:", user);

      if (!user) {
        throw new Error("User not found.");
      }

      // Ensure points don’t go negative
      user.points = Math.max(0, user.points - pointsUsed);

      await user.save();
    }
    console.log("Payment verified and enrollment saved:", newEnrollment);

    res.status(200).json({
      success: true,
      message: "Payment verified and booking successful.",
    });
  } catch (error) {
    console.error("Error during enrollment:", error);
    res
      .status(500)
      .json({ success: false, message: "Enrollment saving failed.", error });
  }
});

module.exports = router;

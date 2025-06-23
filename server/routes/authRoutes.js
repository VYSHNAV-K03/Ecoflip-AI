const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// backend/routes/authRoutes.js
const {
  registerUser,
  registerSupplier,
  loginUser,
} = require("../controllers/authController");
const User = require("../models/User");
require("dotenv").config();
const router = express.Router();

router.post("/register-user", registerUser); // Register a normal user
router.post("/register-driver", registerSupplier); // Register a buyer
router.post("/login", loginUser);

router.post("/getuser", async (req, res) => {
  console.log(req.body);

  const { userId } = req.body;
  try {
    const user = await User.findById(userId);

    console.log(user);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error. Unable to fetch user." });
  }
});

// Update User Profile
router.put("/user/profile", async (req, res) => {
  const { userId, name, email, phone, address } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully.", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Server error. Unable to update profile." });
  }
}); // Login for both users and suppliers

router.put("/user/profileedit/driver", async (req, res) => {
  const { userId, name, email, phone, address, licensenumber, place } =
    req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.licensenumber = licensenumber || user.licensenumber;
    user.place = place || user.place;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully.", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Server error. Unable to update profile." });
  }
}); // Login for both users and suppliers

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

console.log(transporter);

// Request password reset
router.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  console.log(email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: ${resetLink}`,
    });

    res
      .status(200)
      .json({ message: "Password reset link sent to your email." });
  } catch (err) {
    console.error("Error in password reset:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

// Reset password
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  console.log(token);
  console.log(newPassword);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password successfully updated." });
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).json({ error: "Invalid or expired token." });
  }
});

module.exports = router;

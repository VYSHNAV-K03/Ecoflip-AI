// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    place: { type: String },
    licensenumber: { type: String },
    phone: { type: String },
    address: { type: String},
    points: {
      type: Number,
      default: 0,
    },
    isAdmin: { type: Boolean, default: false },
    isSupplier: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

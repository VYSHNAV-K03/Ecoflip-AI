const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  paymentId: { type: String },
  amountPaid: { type: Number },
  currency: { type: String, default: "INR" },
  status: { type: String, enum: ["Paid", "Failed"], default: "Paid" },
  verification: {
    type: String,
    enum: ["Unverified", "Verified"],
    default: "Unverified",
  },
  createdAt: { type: Date, default: Date.now },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Booking", enrollmentSchema);

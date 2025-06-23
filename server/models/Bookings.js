const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  points: Number,
  quantity: Number,
  type: String,

  status: {
    type: String,
    enum: ["Pending", "Verified", "Rejected", "Accepted"],
    default: "Pending",
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

const Material = mongoose.model("Material", materialSchema);
module.exports = Material;

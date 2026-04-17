const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({
  guest: { type: mongoose.Schema.Types.ObjectId, ref: "Guest", required: true },
  turf: { type: mongoose.Schema.Types.ObjectId, ref: "Turf", required: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
  conflicts: [{ type: String }],
  slot: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  name: { type: String, required: true },
  isAllowed: { type: Boolean, default: false },
  status: { type: String, enum: ["pending", "paid"], default: "pending" },
  razorpayOrderId: { type: String },
  paymentId: { type: String },
  amount: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model("Membership", membershipSchema,"memberships");
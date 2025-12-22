const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({
  guest: { type: mongoose.Schema.Types.ObjectId, ref: "Guest", required: true },
  turf: { type: mongoose.Schema.Types.ObjectId, ref: "Turf", required: true },
  startDate: { type: String, required: true },
  slot: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  name: { type: String, required: true },
  isAllowed: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Membership", membershipSchema,"memberships");
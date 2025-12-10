const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: { type: String, required: true },
  otp: String,
  otpExpires: Date,
}, { timestamps: true });

module.exports = mongoose.model("Guest", guestSchema,"guests");

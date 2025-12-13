const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: { type: String, required: false },
  otp: String,
  otpExpires: Date,
  googleId: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Guest", guestSchema,"guests");

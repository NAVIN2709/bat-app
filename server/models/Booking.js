const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  guest: { type: mongoose.Schema.Types.ObjectId, ref: "Guest", required: true },
  turf: { type: mongoose.Schema.Types.ObjectId, ref: "Turf", required: true },
  date: { type: String, required: true },
  slot: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ["pending", "paid", "cancelled"], default: "pending" },
  paymentId: String,
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema,"bookings");

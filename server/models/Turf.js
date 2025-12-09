const mongoose = require("mongoose");

const turfSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  pricePerHour: { type: Number, required: true },
  slots: [String], // ["9:00","10:00"]
}, { timestamps: true });

module.exports = mongoose.model("Turf", turfSchema);

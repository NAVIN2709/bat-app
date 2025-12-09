const Booking = require("../models/Booking");
const Turf = require("../models/Turf");
const Guest = require("../models/Guest");
const sendEmail = require("../utils/sendEmail");

// Create booking
const createBooking = async (req, res) => {
  const { guestId, turfId, date, slot } = req.body;

  const turf = await Turf.findById(turfId);
  if (!turf) return res.status(404).json({ message: "Turf not found" });

  // Check if slot is available
  const existing = await Booking.findOne({ turf: turfId, date, slot, status: "paid" });
  if (existing) return res.status(400).json({ message: "Slot already booked" });

  const booking = await Booking.create({
    guest: guestId,
    turf: turfId,
    date,
    slot,
    totalPrice: turf.pricePerHour,
    status: "pending",
  });

  res.json({ message: "Booking created", bookingId: booking._id });
};

// Confirm booking after payment
const confirmBooking = async (req, res) => {
  const { bookingId, paymentId } = req.body;

  const booking = await Booking.findById(bookingId).populate("guest turf");
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  booking.status = "paid";
  booking.paymentId = paymentId;
  await booking.save();

  // Send confirmation email
  await sendEmail(
    booking.guest.email,
    "Booking Confirmed",
    `Your booking for ${booking.turf.name} on ${booking.date} at ${booking.slot} is confirmed.`
  );

  res.json({ message: "Booking confirmed", booking });
};

module.exports = { createBooking, confirmBooking };

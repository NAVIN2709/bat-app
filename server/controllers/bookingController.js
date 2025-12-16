const Booking = require("../models/Booking");
const Turf = require("../models/Turf");
const Guest = require("../models/Guest");
const apiKeyAuth = require("../middlewares/AuthMiddleware");
const { Resend } = require("resend");
const {
  bookingConfirmationEmail,
} = require("../utils/bookingConfirmationEmail");
const dotenv = require("dotenv");
dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

// Request OTP
const sendEmail = async (to, subject, html) => {
  return await resend.emails.send({
    from: "Your App <onboarding@resend.dev>",
    to,
    subject,
    html,
  });
};

// Create booking
const createBooking = async (req, res) => {
  const { guestId, turfId, date, slot, totalPrice, email, courtName,name } =
    req.body;

  const turf = await Turf.findById(turfId);
  if (!turf) return res.status(404).json({ message: "Turf not found" });

  // Check if slot is already booked
  const existing = await Booking.findOne({
    turf: turfId,
    date,
    slot,
    status: "paid",
  });

  if (existing) {
    return res.status(400).json({ message: "Slot already booked" });
  }

  const booking = await Booking.create({
    guest: guestId,
    turf: turfId,
    date,
    slot,
    totalPrice: totalPrice,
    status: "paid",
    isDone: false,
  });
  const bookingId = booking._id;

  await Turf.findByIdAndUpdate(
    turfId,
    {
      $push: {
        bookings: {
          date: date,
          slots: slot,
          bookingId: booking._id,
          doneBy: "guest",
        },
      },
    },
    { new: true }
  );

  await sendEmail(
    email,
    "Booking Confirmed",
    bookingConfirmationEmail({
      name,
      date,
      bookingId,
      slot,
      totalPrice,
      courtName,
    })
  );

  res.json({
    message: "Booking created",
    bookingId: booking._id,
  });
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

const getBooking = async (req, res) => {
  try {
    const { guestId } = req.params;

    if (!guestId) {
      return res.status(400).json({ message: "guestId is required" });
    }

    // Find all bookings for the user
    const bookings = await Booking.find({ guest: guestId })
      .populate("turf")
      .populate("guest")
      .sort({ date: -1 });

    res.json({
      message: "Bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//Get all Bookings ( admin )
const getAllBooking = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("turf")
      .populate("guest")
      .sort({ date: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching turfs:", error);
    res.status(500).json({ message: "Failed to fetch turfs" });
  }
};

const updateDone = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { isDone: true },
      { new: true }
    )
      .populate("turf")
      .populate("guest");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Failed to update booking" });
  }
};

module.exports = {
  createBooking,
  confirmBooking,
  getBooking,
  getAllBooking,
  updateDone,
};

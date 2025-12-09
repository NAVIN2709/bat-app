const Guest = require("../models/Guest");
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");

// Request OTP
const requestOTP = async (req, res) => {
  const { name, email, phone } = req.body;

  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry

  let guest = await Guest.findOne({ phone });
  if (!guest) guest = new Guest({ name, email, phone });
  guest.otp = otp;
  guest.otpExpires = otpExpires;
  await guest.save();

  // Send OTP via email (or SMS)
  if (email) await sendEmail(email, "Your OTP Code", `Your OTP is ${otp}`);
  // TODO: Integrate SMS API if phone OTP

  res.json({ message: "OTP sent" });
};

// Verify OTP
const verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;
  const guest = await Guest.findOne({ phone });

  if (!guest) return res.status(404).json({ message: "Guest not found" });
  if (guest.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
  if (guest.otpExpires < new Date()) return res.status(400).json({ message: "OTP expired" });

  guest.otp = null;
  guest.otpExpires = null;
  await guest.save();

  res.json({ message: "OTP verified", guestId: guest._id });
};

module.exports = { requestOTP, verifyOTP };

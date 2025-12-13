const Guest = require("../models/Guest");
const generateOTP = require("../utils/generateOTP");
const  { Resend } =  require("resend")
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

const requestOTP = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // 1️⃣ Check if guest exists by email
    let guest = await Guest.findOne({ email });

    // 2️⃣ Update or create guest
    if (guest) {
      guest.name = name || guest.name;
      guest.phone = phone || guest.phone;
    } else {
      guest = new Guest({ name, email, phone });
    }

    // 3️⃣ Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    // 4️⃣ Save OTP
    guest.otp = otp;
    guest.otpExpires = otpExpires;
    await guest.save();

    // 5️⃣ Send email using Resend
    await sendEmail(
      email,
      "Your OTP Code",
      `<p>Your one-time password is:</p>
       <h2>${otp}</h2>
       <p>This OTP is valid for 5 minutes.</p>`
    );

    return res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("OTP Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
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

const Guest = require("../models/Guest");
const generateOTP = require("../utils/generateOTP");
const { Resend } = require("resend");
const dotenv = require("dotenv");
dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

// Request OTP
const sendEmail = async (to, subject, html) => {
  return await resend.emails.send({
    from: "Your App <onboarding@kavikanna.com>",
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
      `<div style="
  background:#F0FDF4;
  padding:24px;
  font-family:Arial, sans-serif;
">

  <div style="
    background:#FFFFFF;
    padding:28px;
    border-radius:16px;
    max-width:420px;
    margin:0 auto;
    box-shadow:0 10px 25px rgba(0,0,0,0.08);
    text-align:center;
  ">

    <h2 style="
      color:#16A34A;
      font-size:22px;
      font-weight:800;
      margin-bottom:12px;
    ">
      🔐 Verify Your Account
    </h2>

    <p style="
      color:#374151;
      font-size:15px;
      margin-bottom:18px;
    ">
      Your one-time password (OTP) is:
    </p>

    <div style="
      background:#DCFCE7;
      border-radius:12px;
      padding:10px 20px;
      display:inline-block;
      margin-bottom:16px;
      width: 70%;
    ">
      <span style="
        font-size:1.2rem;
        font-weight:800;
        letter-spacing:2px;
        color:#15803D;
      ">
        ${otp}
      </span>
    </div>

    <p style="
      color:#6B7280;
      font-size:13px;
      margin-top:10px;
    ">
      This OTP is valid for <strong>5 minutes</strong>.
    </p>

    <p style="
      color:#9CA3AF;
      font-size:12px;
      margin-top:16px;
    ">
      Do not share this code with anyone.
    </p>

    <!-- Divider -->
    <div style="
      height:1px;
      background:#DCFCE7;
      margin:26px 0;
    "></div>

    <!-- RSVP / Contact -->
    <div style="text-align:center;">
      <h3 style="
        font-size:16px;
        font-weight:700;
        color:#16A34A;
        margin-bottom:8px;
      ">
        📍 KaviKanna Badminton Court
      </h3>

      <p style="
        color:#374151;
        font-size:13px;
        line-height:1.6;
        margin:4px 0;
      ">
        Near Putrumariamman Kovil,<br/>
        Muttur – Parangipettai Road,<br/>
        Bhuvanagiri Taluk,<br/>
        Cuddalore District – 608501
      </p>

      <p style="
        color:#374151;
        font-size:13px;
        margin-top:10px;
      ">
        📞 <strong>Mobile:</strong>
        <a href="tel:9600614215" style="color:#15803D; text-decoration:none;">
          9600614215
        </a>
      </p>

      <p style="
        font-size:12px;
        color:#6B7280;
        margin-top:14px;
      ">
        For any queries or booking assistance, feel free to contact us.
      </p>
    </div>

  </div>
</div>`
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
  if (guest.otp !== otp)
    return res.status(400).json({ message: "Invalid OTP" });
  if (guest.otpExpires < new Date())
    return res.status(400).json({ message: "OTP expired" });

  guest.otp = null;
  guest.otpExpires = null;
  await guest.save();

  res.json({ message: "OTP verified", guestId: guest._id });
};

module.exports = { requestOTP, verifyOTP };

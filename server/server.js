const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const otpRoutes = require("./routes/otpRoutes");
const turfRoutes = require("./routes/turfRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const jwt = require("jsonwebtoken");
const guestRoutes = require("./routes/guestRoutes")
const paymentRoutes = require("./routes/paymentRoutes")
const membershipRoutes = require("./routes/membershipRoutes")

dotenv.config();
connectDB();
const passport = require("passport");
require("./config/googleAuth");
const session = require("express-session");
const Guest = require("./models/Guest");

const app = express();
app.use(
  cors({
    origin: [process.env.FRONTEND_URL,"https://admin.kavikanna.com","https://kavikanna.com"],
    credentials: true,
  })
);

app.use(
  "/api/payment/webhook",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString("utf8");
    },
  })
);

app.use(express.json());

// session middleware (required for passport)
app.use(
  session({
    secret: "secret123",
    resave: false,
    saveUninitialized: true,
  })
);

// passport initialize
app.use(passport.initialize());
app.use(passport.session());

// Google Login Redirect Route
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.redirect("/");
      }

      // Extract google profile data
      const googleId = req.user.id;
      const email = req.user.emails?.[0]?.value;
      const name = req.user.displayName;

      // Check if user already exists
      let guest = await Guest.findOne({ googleId });

      // If not, create new guest
      if (!guest) {
        guest = await Guest.create({
          name,
          email,
          phone: "",   // You can change this later
          googleId,
        });
      }

      // JWT payload with MongoDB ID
      const token = jwt.sign(
        {
          guestId: guest._id,
          googleId: guest.googleId,
          email: guest.email,
          name: guest.name,
        },
        process.env.JWT_SECRET
      );

      // Redirect to frontend with JWT
      res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${token}`);
    } catch (err) {
      console.error("Google Auth Error:", err);
      res.redirect("/");
    }
  }
);


app.use("/api/otp", otpRoutes);
app.use("/api/turfs", turfRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/guests", guestRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/membership",membershipRoutes)

app.get("/", (req, res) => {
  res.send("alive")
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

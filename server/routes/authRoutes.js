const express = require("express");
const router = express.Router();
const passport = require("../config/googleAuth");
const jwt = require("jsonwebtoken");

// Step 1: Redirect user to Google Login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Step 2: Google redirects back here
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Generate JWT
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ⬅️ send token to frontend (you can redirect too)
    res.json({
      message: "Google Login Successful",
      token,
      user: req.user,
    });
  }
);

module.exports = router;

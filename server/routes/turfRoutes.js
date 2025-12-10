const express = require("express");
const router = express.Router();
const Turf = require("../models/Turf");

// Get all turfs
router.get("/", async (req, res) => {
  try {
    const turfs = await Turf.find();
    res.status(200).json(turfs);
  } catch (error) {
    console.error("Error fetching turfs:", error);
    res.status(500).json({ message: "Failed to fetch turfs" });
  }
});

module.exports = router;

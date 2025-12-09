const express = require("express");
const router = express.Router();
const Turf = require("../models/Turf");

// Get all turfs
router.get("/", async (req, res) => {
  const turfs = await Turf.find();
  res.json(turfs);
});

module.exports = router;

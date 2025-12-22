const express = require("express");
const router = express.Router();
const Turfs = require("../models/Turf")
const Membership = require("../models/Memberships");

router.get("/", async (req, res) => {
  try {
    const memberships = await Membership.find().populate("turf");
    res.status(200).json(memberships);
  } catch (error) {
    console.error("Error fetching memberships:", error);
    res.status(500).json({ message: "Failed to fetch memberships" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, turfId, phone, startDate, slot, guestId } = req.body;

    if (!name || !phone || !guestId || !turfId || !startDate || !slot) {
      return res.status(400).json({ message: "Missing details" });
    }

    // Create new membership
    const membership = await Membership.create({
      name: name,
      phoneNumber: phone,
      startDate: startDate,
      slot: slot,
      turf: turfId,
      guest: guestId,
      isAllowed : false
    });

    res.status(201).json(membership);
  } catch (error) {
    console.error("Error creating membership:", error);
    res.status(500).json({ message: "Failed to create membership" });
  }
});

router.patch("/:id/approve", async (req, res) => {
  try {
    const membership = await Membership.findByIdAndUpdate(
      req.params.id,
      { isAllowed: true },
      { new: true }
    );

    res.status(200).json(membership);
  } catch (error) {
    res.status(500).json({ message: "Failed to approve membership" });
  }
});

module.exports = router;

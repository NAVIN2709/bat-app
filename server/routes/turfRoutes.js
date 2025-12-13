const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Turf = require("../models/Turf");
const apiKeyAuth = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  try {
    const turfs = await Turf.find();
    res.status(200).json(turfs);
  } catch (error) {
    console.error("Error fetching turfs:", error);
    res.status(500).json({ message: "Failed to fetch turfs" });
  }
});

router.post("/", apiKeyAuth, async (req, res) => {
  try {
    const { name, price, location, imageUrl } = req.body;

    if (!name || !price || !location || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const turf = await Turf.create({
      name,
      price,
      location,
      imageUrl,
    });

    res.status(201).json(turf);
  } catch (error) {
    console.error("Error creating turf:", error);
    res.status(500).json({ message: "Failed to create turf" });
  }
});

router.put("/:id", apiKeyAuth, async (req, res) => {
  try {
    const updatedTurf = await Turf.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTurf) {
      return res.status(404).json({ message: "Turf not found" });
    }

    res.status(200).json(updatedTurf);
  } catch (error) {
    console.error("Error updating turf:", error);
    res.status(500).json({ message: "Failed to update turf" });
  }
});

router.delete("/:id", apiKeyAuth, async (req, res) => {
  try {
    const deletedTurf = await Turf.findByIdAndDelete(req.params.id);

    if (!deletedTurf) {
      return res.status(404).json({ message: "Turf not found" });
    }

    res.status(200).json({ message: "Turf deleted successfully" });
  } catch (error) {
    console.error("Error deleting turf:", error);
    res.status(500).json({ message: "Failed to delete turf" });
  }
});

router.get("/court-timings/:courtId", async (req, res) => {
  try {
    const { courtId } = req.params;
    // get all paid bookings
    const bookings = await Turf.findById(courtId);

    res.json({
      message: "Court timings fetched successfully",
      bookings: bookings,
    });
  } catch (error) {
    console.error("Court timings error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/update-timings/:id", apiKeyAuth, async (req, res) => {
  try {
    const { date, slots } = req.body;
    const doneBy = "admin";

    if (!date || !slots ) {
      return res
        .status(400)
        .json({ message: "date, slots and doneBy are required" });
    }

    const turf = await Turf.findById(req.params.id);
    if (!turf) {
      return res.status(404).json({ message: "Turf not found" });
    }

    // check if this date is already present
    const existingBooking = turf.bookings.find((b) => b.date === date);

    if (existingBooking) {
      // merge slots
      existingBooking.slots = [
        ...new Set([...existingBooking.slots, ...slots]),
      ];

      // merge doneBy
      existingBooking.doneBy = "admin";
      
    } else {
      turf.bookings.push({
        date,
        slots,
        doneBy,
      });
    }

    const updated = await turf.save();
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating turf timings:", error);
    res.status(500).json({ message: "Failed to update timings" });
  }
});



module.exports = router;

const express = require("express");
const router = express.Router();
const Guest = require("../models/Guest");
const apiKeyAuth = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  try {
    const guests = await Guest.find();
    res.status(200).json(guests);
  } catch (error) {
    console.error("Error fetching guests:", error);
    res.status(500).json({ message: "Failed to fetch guests" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);

    if (!guest) {
      return res.status(404).json({ message: "Guest not found" });
    }

    res.status(200).json(guest);
  } catch (error) {
    console.error("Error fetching guest:", error);
    res.status(500).json({ message: "Failed to fetch guest" });
  }
});


router.post("/", async (req, res) => {
  try {
    const { name, email, phone, googleId } = req.body;

    if (!name || !phone || !googleId) {
      return res.status(400).json({ message: "name, phone & googleId are required" });
    }

    // Create new guest
    const guest = await Guest.create({
      name,
      email,
      phone,
      googleId,
    });

    res.status(201).json(guest);
  } catch (error) {
    console.error("Error creating guest:", error);
    res.status(500).json({ message: "Failed to create guest" });
  }
});


router.put("/:id",  async (req, res) => {
  try {
    const updatedGuest = await Guest.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedGuest) {
      return res.status(404).json({ message: "Guest not found" });
    }

    res.status(200).json(updatedGuest);
  } catch (error) {
    console.error("Error updating guest:", error);
    res.status(500).json({ message: "Failed to update guest" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedGuest = await Guest.findByIdAndDelete(req.params.id);

    if (!deletedGuest) {
      return res.status(404).json({ message: "Guest not found" });
    }

    res.status(200).json({ message: "Guest deleted successfully" });
  } catch (error) {
    console.error("Error deleting guest:", error);
    res.status(500).json({ message: "Failed to delete guest" });
  }
});


module.exports = router;

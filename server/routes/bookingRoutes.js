const express = require("express");
const router = express.Router();
const { createBooking, confirmBooking, getBooking, getAllBooking, updateDone } = require("../controllers/bookingController");
const apiKeyAuth = require("../middlewares/AuthMiddleware")

router.post("/", createBooking);
router.post("/confirm", confirmBooking);
router.get("/allbookings", getAllBooking);
router.get("/:guestId", getBooking);
router.put("/:bookingId", updateDone);

module.exports = router;

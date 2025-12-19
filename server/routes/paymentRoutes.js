const express = require("express");
const { createPaymentOrder, paymentWebhook } = require("../controllers/paymentController");

const router = express.Router();

// Create Cashfree payment order
router.post("/create-order", createPaymentOrder);

// Webhook endpoint
router.post("/webhook", paymentWebhook);

module.exports = router;

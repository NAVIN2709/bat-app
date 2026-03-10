const express = require("express");
const {
  createPaymentOrder,
  verifyPayment,
  paymentWebhook,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/create-order", createPaymentOrder);
router.post("/verify-payment", verifyPayment);
router.post("/webhook", paymentWebhook);

module.exports = router;
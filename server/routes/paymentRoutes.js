const express = require("express");
const {
  createPaymentOrder,
  verifyPayment,
  paymentWebhook,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/create-order", createPaymentOrder);
router.post("/verify-payment", verifyPayment);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  paymentWebhook
);

module.exports = router;
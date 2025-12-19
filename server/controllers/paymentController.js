const { Cashfree, CFEnvironment } = require("cashfree-pg");
const Booking = require("../models/Booking");
const Turf = require("../models/Turf");
const {
  bookingConfirmationEmail,
} = require("../utils/bookingConfirmationEmail");
const { Resend } = require("resend");
const dotenv = require("dotenv");
dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

const cashfree = new Cashfree(
  CFEnvironment.SANDBOX,
  process.env.APP_ID,
  process.env.SECRET_KEY
);

const sendEmail = async (to, subject, html) => {
  return await resend.emails.send({
    from: "Your App <onboarding@resend.dev>",
    to,
    subject,
    html,
  });
};

// 1️⃣ Create Cashfree order for an existing PENDING booking
const createPaymentOrder = async (req, res) => {
  try {
    const { amount, phone, bookingId, guestId } = req.body;

    // Ensure booking exists and is still pending
    const booking = await Booking.findById(bookingId).populate("turf guest");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "paid") {
      return res
        .status(400)
        .json({ message: "Booking already paid for this order" });
    }

    const orderRequest = {
      // Tie the order id to the booking id for easier debug/idempotency
      order_id: `BOOK_${bookingId}_${Date.now()}`,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: guestId,
        customer_phone: phone,
        // store just bookingId for the webhook to use
        notes: JSON.stringify({ bookingId }),
      },
      order_meta: {
        notify_url: `${process.env.BACKEND_URL}/api/payment/webhook`,
      },
    };

    const response = await cashfree.PGCreateOrder(orderRequest);
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment order creation failed" });
  }
};

// 2️⃣ Webhook: Update existing booking from PENDING -> PAID after successful payment
const paymentWebhook = async (req, res) => {
  console.log("[Webhook] Cashfree webhook received");
  try {
    if (!req.rawBody) {
      throw new Error("Raw body missing");
    }
    console.log("[Webhook] Raw body present:", !!req.rawBody);

    cashfree.PGVerifyWebhookSignature(
      req.headers["x-webhook-signature"],
      req.rawBody,
      req.headers["x-webhook-timestamp"]
    );
    console.log("[Webhook] Signature verified successfully");

    const {
      order_status,
      customer_details,
      order_amount,
      order_id,
      payment_id,
    } = req.body.data;
    console.log("[Webhook] Order status:", order_status);
    console.log("[Webhook] Order ID:", order_id);

    if (order_status === "PAID") {
      let bookingId;
      try {
        bookingId = JSON.parse(customer_details?.notes || "{}").bookingId;
      } catch {
        return res.status(200).json({ success: true });
      }

      const booking = await Booking.findById(bookingId).populate("turf guest");
      if (!booking || booking.status === "paid") {
        return res.status(200).json({ success: true });
      }

      booking.status = "paid";
      booking.totalPrice = order_amount;
      booking.paymentId = payment_id || order_id;
      await booking.save();

      await Turf.findByIdAndUpdate(booking.turf._id, {
        $push: {
          bookings: {
            date: booking.date,
            slots: booking.slot,
            bookingId: booking._id,
            doneBy: "guest",
          },
        },
      });

      await sendEmail(
        booking.guest.email,
        "Booking Confirmed",
        bookingConfirmationEmail({
          name: booking.guest.name,
          date: booking.date,
          bookingId: booking._id,
          slot: booking.slot,
          totalPrice: booking.totalPrice,
          courtName: booking.turf.name,
        })
      );
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(400).json({ success: false });
  }
};

module.exports = { paymentWebhook, createPaymentOrder };

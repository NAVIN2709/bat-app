const Razorpay = require("razorpay");
const crypto = require("crypto");
const Booking = require("../models/Booking");
const Turf = require("../models/Turf");
const {
  bookingConfirmationEmail,
} = require("../utils/bookingConfirmationEmail");
const {
  adminBookingNotification,
} = require("../utils/adminBookingNotification");
const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const sendEmail = async (to, subject, html) => {
  return await resend.emails.send({
    from: "KaviKanna <onboarding@kavikanna.com>",
    to,
    subject,
    html,
  });
};

const createPaymentOrder = async (req, res) => {
  try {
    const { amount, bookingId } = req.body;

    const booking = await Booking.findById(bookingId).populate("turf guest");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "paid") {
      return res.status(400).json({ message: "Already paid" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `BOOK_${bookingId}`,
      notes: {
        bookingId: bookingId,
      },
    });

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Razorpay order creation failed" });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
      amount,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false });
    }

    const booking = await Booking.findById(bookingId).populate("turf guest");

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    if (booking.status === "paid") {
      return res.json({ success: true });
    }
    booking.status = "paid";
    booking.totalPrice = amount;
    booking.paymentId = razorpay_payment_id;
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

    try {
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
        }),
      );

      // Send notification to Admin
      await sendEmail(
        "kavikannacourts@gmail.com",
        "New Booking Payment Received",
        adminBookingNotification({
          name: booking.guest.name,
          phone: booking.guest.phone,
          date: booking.date,
          bookingId: booking._id,
          slot: booking.slot,
          totalPrice: booking.totalPrice,
          courtName: booking.turf.name,
        }),
      );
    } catch (err) {
      console.error("Failed to send emails on verify-payment:", err.message);
    }

    res.json({ success: true });
  } catch (err) {
    console.error("verifyPayment Error:", err);
    res.status(500).json({ success: false });
  }
};

const paymentWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const signature = req.headers["x-razorpay-signature"];

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(req.rawBody)
      .digest("hex");

    if (signature !== expectedSignature) {
      return res.status(400).send("Invalid signature");
    }

    const event = req.body;

    if (event.event === "payment.captured" || event.event === "order.paid") {
      const paymentEntity = event.payload.payment
        ? event.payload.payment.entity
        : null;
      const orderEntity = event.payload.order
        ? event.payload.order.entity
        : paymentEntity;

      const bookingId = orderEntity?.notes?.bookingId;
      const amount = paymentEntity ? paymentEntity.amount / 100 : 0;

      if (!bookingId) {
        console.warn("Webhook received payment without bookingId in notes");
        return res.status(200).json({ success: true });
      }

      const booking = await Booking.findById(bookingId).populate("turf guest");

      if (!booking || booking.status === "paid") {
        return res.status(200).json({ success: true });
      }
      booking.status = "paid";
      booking.totalPrice = amount;
      booking.paymentId = paymentEntity ? paymentEntity.id : "unknown";
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

      try {
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
          }),
        );

        // Send notification to Admin
        await sendEmail(
          "kavikannacourts@gmail.com",
          "New Booking Payment Received (Webhook)",
          adminBookingNotification({
            name: booking.guest.name,
            phone: booking.guest.phone,
            date: booking.date,
            bookingId: booking._id,
            slot: booking.slot,
            totalPrice: booking.totalPrice,
            courtName: booking.turf.name,
          }),
        );
      } catch (emailErr) {
        console.error("Failed to send webhook emails:", emailErr.message);
      }

      console.log(
        `Payment fulfillment complete for booking ${bookingId} via webhook fallback`,
      );
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Webhook error encountered:", err.message);
    res.status(400).json({ success: false });
  }
};

module.exports = {
  createPaymentOrder,
  verifyPayment,
  paymentWebhook,
};

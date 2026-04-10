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
  return resend.emails.send({
    from: "KaviKanna <onboarding@kavikanna.com>",
    to,
    subject,
    html,
  });
};

const createPaymentOrder = async (req, res) => {
  try {
    const { amount, bookingId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "paid") {
      return res.status(400).json({ message: "Already paid" });
    }

    if (booking.razorpayOrderId) {
      return res.json({
        id: booking.razorpayOrderId,
        reused: true,
      });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `BOOK_${bookingId}`,
      notes: { bookingId },
    });

    booking.razorpayOrderId = order.id;
    await booking.save();

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order creation failed" });
  }
};

const fulfillBooking = async ({ bookingId, paymentId, amount }) => {
  const booking = await Booking.findOneAndUpdate(
    { _id: bookingId, status: { $ne: "paid" } },
    {
      status: "paid",
      totalPrice: amount,
      paymentId,
    },
    { new: true }
  ).populate("turf guest");

  if (!booking) {
    return null; 
  }

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
      })
    );

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
      })
    );
  } catch (err) {
    console.error("Email error:", err.message);
  }

  return booking;
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

    const booking = await fulfillBooking({
      bookingId,
      paymentId: razorpay_payment_id,
      amount,
    });

    return res.json({ success: true, processed: !!booking });
  } catch (err) {
    console.error("verifyPayment error:", err);
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
      const payment = event.payload.payment?.entity;
      const order = event.payload.order?.entity || payment;

      const bookingId = order?.notes?.bookingId;
      const amount = payment?.amount / 100;
      const paymentId = payment?.id;

      if (!bookingId || !paymentId) {
        return res.status(200).json({ success: true });
      }

      await fulfillBooking({
        bookingId,
        paymentId,
        amount,
      });

      console.log(`Webhook processed for booking ${bookingId}`);
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(400).json({ success: false });
  }
};

module.exports = {
  createPaymentOrder,
  verifyPayment,
  paymentWebhook,
};
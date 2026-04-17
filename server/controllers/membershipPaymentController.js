const Razorpay = require("razorpay");
const crypto = require("crypto");
const Membership = require("../models/Memberships");
const Turf = require("../models/Turf");
const {
  membershipConfirmationEmail,
  adminMembershipNotification,
} = require("../utils/membershipEmail");
const { Resend } = require("resend");
const dayjs = require("dayjs");
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

const createMembershipOrder = async (req, res) => {
  try {
    const { membershipId, amount } = req.body;

    const membership = await Membership.findById(membershipId);

    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }

    if (membership.status === "paid") {
      return res.status(400).json({ message: "Already paid" });
    }

    // Idempotency: Reuse existing order ID if present
    if (membership.razorpayOrderId) {
      return res.json({
        id: membership.razorpayOrderId,
        reused: true,
        amount: amount * 100,
      });
    }

    const order = await razorpay.orders.create({
      amount: (amount + 99) * 100, // INR to Paise (including 99 INR platform fee)
      currency: "INR",
      receipt: `MEMB_${membershipId}`,
      notes: { membershipId },
    });

    membership.razorpayOrderId = order.id;
    membership.amount = amount;
    await membership.save();

    res.json(order);
  } catch (err) {
    console.error("Membership Order Error:", err);
    res.status(500).json({ message: "Failed to create membership order" });
  }
};

const fulfillMembership = async ({ membershipId, paymentId, amount }) => {
  // Use findOneAndUpdate with status check for idempotency
  const membership = await Membership.findOneAndUpdate(
    { _id: membershipId, status: { $ne: "paid" } },
    {
      status: "paid",
      isAllowed: true,
      paymentId,
      amount,
    },
    { new: true },
  ).populate("turf guest");

  if (!membership) {
    console.log(`Membership ${membershipId} already fulfilled or not found.`);
    return null;
  }

  // Automatic Slot Blocking: Block all days for exactly one month (e.g., 17th April to 17th May)
  try {
    const start = dayjs(membership.startDate); // Assuming YYYY-MM-DD
    const end = start.add(1, "month");
    const bookingsToAdd = [];
    const conflicts = [];

    // Fetch turf again to get latest bookings for conflict check
    const turfDoc = await Turf.findById(membership.turf._id);
    
    let current = start;
    while (current.isBefore(end) || current.isSame(end, "day")) {
      const dateStr = current.format("DD-MM-YYYY");
      
      // Check if slot is already booked on this date
      const isAlreadyBooked = turfDoc.bookings.some(b => 
        b.date === dateStr && b.slots.includes(membership.slot)
      );

      if (isAlreadyBooked) {
        conflicts.push(dateStr);
      } else {
        bookingsToAdd.push({
          date: dateStr,
          slots: [membership.slot],
          membershipId: membership._id,
          doneBy: "member",
        });
      }
      current = current.add(1, "day");
    }

    // Save end date and conflicts to membership
    membership.endDate = end.format("YYYY-MM-DD");
    membership.conflicts = conflicts;
    await membership.save();

    if (bookingsToAdd.length > 0) {
      await Turf.findByIdAndUpdate(membership.turf._id, {
        $push: { bookings: { $each: bookingsToAdd } },
      });
      console.log(
        `Blocked ${bookingsToAdd.length} slots for membership ${membershipId}. ${conflicts.length} conflicts found.`,
      );
    }
  } catch (err) {
    console.error("Error blocking slots for membership:", err.message);
  }

  // Send Emails
  try {
    // To User
    await sendEmail(
      membership.guest.email,
      "Membership Confirmed - KaviKanna",
      membershipConfirmationEmail({
        name: membership.name,
        startDate: membership.startDate,
        endDate: membership.endDate,
        conflicts: membership.conflicts,
        membershipId: membership._id,
        slot: membership.slot,
        basePrice: membership.amount - 99,
        platformFee: 99,
        totalPrice: membership.amount,
        courtName: membership.turf.name,
      }),
    );

    // To Admin
    await sendEmail(
      "kavikannacourts@gmail.com",
      "New Membership Payment Received",
      adminMembershipNotification({
        name: membership.name,
        phone: membership.phoneNumber,
        startDate: membership.startDate,
        endDate: membership.endDate,
        conflicts: membership.conflicts,
        membershipId: membership._id,
        slot: membership.slot,
        basePrice: membership.amount - 99,
        platformFee: 99,
        totalPrice: membership.amount,
        courtName: membership.turf.name,
      }),
    );
    console.log(`Emails sent for membership ${membershipId}`);
  } catch (err) {
    console.error("Email error for membership:", err.message);
  }

  return membership;
};

const verifyMembershipPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      membershipId,
      amount,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    const membership = await fulfillMembership({
      membershipId,
      paymentId: razorpay_payment_id,
      amount,
    });

    return res.json({ success: true, processed: !!membership });
  } catch (err) {
    console.error("verifyMembershipPayment error:", err);
    res.status(500).json({ success: false });
  }
};

module.exports = {
  createMembershipOrder,
  verifyMembershipPayment,
  fulfillMembership,
};

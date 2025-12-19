import axios from "axios";

// bookingInfo = { bookingId, totalPrice, phone }
export async function makePayment(bookingInfo) {
  try {
    // 1️⃣ Create payment order for existing pending booking
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`,
      {
        amount: bookingInfo.totalPrice,
        phone: bookingInfo.phone,
        bookingId: bookingInfo.bookingId,
        guestId : bookingInfo.guestId ,
        name : bookingInfo.name ,
        email : bookingInfo.email
      }
    );

    // 2️⃣ Open Cashfree checkout (Web SDK v3)
    if (!window.Cashfree) {
      console.error("Cashfree SDK not loaded");
      alert("Payment system is not ready. Please try again.");
      return { success: false };
    }

    const cashfree = window.Cashfree({
      mode: "sandbox", // or "production"
    });
    const result = await cashfree.checkout({
      paymentSessionId: data.payment_session_id,
      redirectTarget: "_modal",
    });

    if (result.error) {
      alert("Payment cancelled or failed");
      return { success: false };
    }

    // 3️⃣ Payment success → backend webhook will mark booking as paid
    alert("Payment success! Booking will be confirmed via email.");
    return { success: true };
  } catch (err) {
    console.error(err);
    alert("Payment failed");
    return { success: false };
  }
}

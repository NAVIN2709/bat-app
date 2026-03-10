import axios from "axios";

export async function makePayment(bookingInfo) {
  try {
    // 1️⃣ Create Razorpay order
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`,
      {
        amount: bookingInfo.totalPrice,
        bookingId: bookingInfo.bookingId,
      }
    );

    // 2️⃣ Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    await new Promise((resolve) => (script.onload = resolve));

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: "INR",
      order_id: data.id,
      name: "KaviKanna Turf",
      handler: async function (response) {
        const verifyRes = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/payment/verify-payment`,
          {
            ...response,
            bookingId: bookingInfo.bookingId,
            amount: bookingInfo.totalPrice,
          }
        );

        if (verifyRes.data.success) {
          alert("Payment successful!");
        } else {
          alert("Payment verification failed");
        }
      },
      prefill: {
        name: bookingInfo.name,
        email: bookingInfo.email,
        contact: bookingInfo.phone,
      },
      theme: {
        color: "#22c55e",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    return { success: true };
  } catch (err) {
    console.error(err);
    alert("Payment failed");
    return { success: false };
  }
}
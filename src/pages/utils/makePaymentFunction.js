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

    // 2️⃣ Load Razorpay script ONLY ONCE
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });
    }

    // 3️⃣ Wrap Razorpay in Promise (SAFE VERSION)
    return new Promise((resolve) => {
      let resolved = false;

      const safeResolve = (val) => {
        if (!resolved) {
          resolved = true;
          resolve(val);
        }
      };

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        order_id: data.id,
        name: "KaviKanna Badminton Court",
        description: "Court Booking Payment",

        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/payment/verify-payment`,
              {
                ...response,
                bookingId: bookingInfo.bookingId,
                amount: bookingInfo.totalPrice,
              }
            );

            // ✅ Delay resolve to avoid Razorpay race condition
            setTimeout(() => {
              if (verifyRes.data.success) {
                safeResolve({ success: true });
              } else {
                safeResolve({ success: false });
              }
            }, 300);

          } catch (err) {
            console.error("Verification error:", err);

            setTimeout(() => {
              safeResolve({ success: false });
            }, 300);
          }
        },

        modal: {
          ondismiss: function () {
            console.log("Payment modal closed by user");
            safeResolve({ success: false });
          },
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

      paymentObject.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error.description);
        safeResolve({ success: false });
      });

      paymentObject.open();
    });

  } catch (err) {
    console.error("MakePayment Error:", err);
    return { success: false };
  }
}
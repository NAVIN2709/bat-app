import axios from "axios";

export async function makePayment(bookingInfo) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`,
      {
        amount: bookingInfo.totalPrice,
        bookingId: bookingInfo.bookingId,
      }
    );

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    await new Promise((resolve) => (script.onload = resolve));

    return new Promise((resolve) => {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        order_id: data.id,
        name: "KaviKanna Badminton Court",
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

            if (verifyRes.data.success) {
              resolve({ success: true }); 
            } else {
              resolve({ success: false }); 
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Payment verification encountered an error");
            resolve({ success: false }); 
          }
        },
        modal: {
          ondismiss: function () {
            console.log("Payment modal closed by the user");
            resolve({ success: false });
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
        console.error("Payment failed reason:", response.error.description);
        alert(response.error.description || "Payment failed");
        resolve({ success: false });
      });

      paymentObject.open();
    });

  } catch (err) {
    console.error("MakePayment Error:", err);
    alert("Payment initialization failed");
    return { success: false };
  }
}
import axios from "axios";

export async function makeMembershipPayment(membershipInfo) {
  try {
    const PRICE = 4000; // Fixed price for membership

    // Create Razorpay order
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/membership/create-order`,
      {
        amount: PRICE,
        membershipId: membershipInfo.membershipId,
      },
    );

    // Load Razorpay script if not already loaded
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

    // Open Razorpay Checkout
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
        description: "Membership Payment",

        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/membership/verify-payment`,
              {
                ...response,
                membershipId: membershipInfo.membershipId,
                amount: PRICE,
              },
            );

            if (verifyRes.data.success) {
              safeResolve({ success: true });
            } else {
              safeResolve({ success: false });
            }
          } catch (err) {
            console.error("Verification error:", err);
            safeResolve({ success: false });
          }
        },

        modal: {
          ondismiss: function () {
            console.log("Payment modal closed");
            safeResolve({ success: false });
          },
        },

        prefill: {
          name: membershipInfo.name,
          email: membershipInfo.email,
          contact: membershipInfo.phone,
        },

        theme: {
          color: "#16a34a",
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
    console.error("makeMembershipPayment Error:", err);
    return { success: false };
  }
}

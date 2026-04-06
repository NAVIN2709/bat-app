import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import BannerImage from "../assets/logo.jpg";
import { ArrowLeft, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { makePayment } from "./utils/makePaymentFunction";

const DetailsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const date = searchParams.get("date");
  const courtId = searchParams.get("courtId");
  const courtName = searchParams.get("courtName");
  const time = searchParams.get("times");

  // ✅ FIX: convert to number
  const price = Number(searchParams.get("price"));

  const [mobile, setMobile] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [username, setUsername] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      const returnTo = window.location.href;
      localStorage.setItem("returnTo", returnTo);
      navigate("/login");
    } else {
      const user = jwtDecode(token);
      setUser(user);
      setUsername(user.name);
    }
  }, []);

  const sendOtp = async () => {
    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/otp/request`,
        {
          name: username,
          email: user.email,
          phone: mobile,
        }
      );

      setOtpSent(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);

      // 1️⃣ Verify OTP
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/otp/verify`,
        {
          phone: mobile,
          otp,
        }
      );

      // 2️⃣ Create booking
      const bookingRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings`,
        {
          guestId: user.guestId,
          turfId: courtId,
          date,
          slot: time,
          totalPrice: price,
          email: user.email,
          courtName,
          name: username,
        }
      );

      const bookingId = bookingRes.data.bookingId;

      // 3️⃣ Payment
      const paymentResult = await makePayment({
        bookingId,
        totalPrice: price,
        phone: mobile,
        guestId: user.guestId,
        name: username,
        email: user.email,
      });

      // 4️⃣ UI handling (SAFE)
      if (paymentResult.success) {
        setPaymentSuccess(true);

        setTimeout(() => {
          navigate(`/confirmation/${bookingId}`, {
            state: { date, time, price, name: username },
          });
        }, 2500);
      } else {
        setPaymentError(true);

        setTimeout(() => {
          navigate("/");
        }, 2500);
      }

    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProfile = () => {
    if (!mobile || mobile.length !== 10) {
      return alert("Enter valid mobile number");
    }
    sendOtp();
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">

      <img src={BannerImage} className="w-40 mb-6 rounded-xl" />

      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">

        {!otpSent ? (
          <>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mb-3 p-3 border rounded"
              placeholder="Name"
            />

            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full mb-3 p-3 border rounded"
              placeholder="Mobile"
            />

            <button onClick={handleSubmitProfile} className="w-full bg-green-500 text-white p-3 rounded">
              {loading ? "Sending..." : "Continue"}
            </button>
          </>
        ) : (
          <>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mb-3 p-3 border rounded"
              placeholder="OTP"
            />

            <button onClick={verifyOtp} className="w-full bg-green-600 text-white p-3 rounded">
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

      </div>

      {/* ✅ Modal */}
      {(paymentSuccess || paymentError) && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl text-center">
            {paymentSuccess ? (
              <>
                <CheckCircle2 className="text-green-500 mx-auto" size={40} />
                <h2 className="text-xl font-bold mt-2">Payment Success</h2>
              </>
            ) : (
              <>
                <XCircle className="text-red-500 mx-auto" size={40} />
                <h2 className="text-xl font-bold mt-2">Payment Failed</h2>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
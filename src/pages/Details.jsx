import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import BannerImage from "../assets/logo.jpg";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const DetailsPage = () => {
  const [searchParams] = useSearchParams();
  const user = jwtDecode(localStorage.getItem("token"));
  const navigate = useNavigate();
  const date = searchParams.get("date");
  const courtId = searchParams.get("courtId")
  const time = searchParams.get("times");
  const price = searchParams.get("price");

  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const sendOtp = async () => {
    try {
      setLoading(true);

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/otp/request`, {
        name: username,
        email: user.email,
        phone: mobile,
      });

      setOtpSent(true);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => navigate("/");

  const verifyOtp = async () => {
    try {
      setLoading(true);

      // Step 1: Verify OTP
      const otpRes = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/otp/verify`, {
        phone: mobile,
        otp,
      });

      // Step 2: Create Booking (status: paid for now, after payemnt integration route to it)
      const bookingRes = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`, {
        guestId : user.guestId ,
        turfId : courtId ,
        date,
        slot: time,
        status: "paid",
        totalPrice : price
      });

      console.log("Booking Created:", bookingRes.data);

      const bookingId = bookingRes.data.bookingId;

      // Step 3: Navigate to confirmation page
      navigate(`/confirmation/${bookingId}`, {
        state: {
          date,
          time,
          price,
          name: username,
        },
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProfile = () => {
    if (!mobile) return alert("Mobile Number is required.");
    if (mobile.length !== 10)
      return alert("Enter a valid 10-digit mobile number");
    sendOtp();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100 flex flex-col items-center justify-start sm:justify-center px-4 py-10 sm:py-16">
      {/* Banner */}
      <div className="w-48 sm:w-56 mb-10">
        <img
          src={BannerImage}
          alt="Court Banner"
          className="w-full rounded-2xl shadow-xl border-2 border-green-200"
        />
      </div>

      {/* Card */}
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border border-gray-200">
        {/* Header */}
        <div className="relative flex items-center mb-10">
          <div
            className="absolute left-0 cursor-pointer p-2 hover:bg-gray-100 rounded-full transition"
            onClick={handleBack}
          >
            <ArrowLeft className="text-gray-700" />
          </div>
          <h1 className="mx-auto text-md sm:text-2xl md:text-3xl font-bold text-gray-800 text-center">
            {otpSent ? "Verify OTP" : "Submit Your Number"}
          </h1>
        </div>

        {/* Step 1: Profile */}
        {!otpSent && (
          <div className="space-y-6">
            <div>
              <label className="text-sm sm:text-base font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="number"
                maxLength="10"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter mobile number"
                className="w-full mt-2 px-5 py-3 border rounded-xl outline-none text-base sm:text-lg focus:ring-2 focus:ring-green-400 transition shadow-sm hover:shadow-md"
              />
            </div>
            <div>
              <label className="text-sm sm:text-base font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                maxLength="50"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                className="w-full mt-2 px-5 py-3 border rounded-xl outline-none text-base sm:text-lg focus:ring-2 focus:ring-green-400 transition shadow-sm hover:shadow-md"
              />
            </div>
            <button
              onClick={handleSubmitProfile}
              className="w-full py-3 sm:py-4 bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold rounded-xl shadow-lg hover:from-green-500 hover:to-green-600 transition"
            >
              {loading ? "Sending OTP..." : "Continue"}
            </button>
          </div>
        )}

        {/* Step 2: OTP */}
        {otpSent && (
          <div className="space-y-6">
            <p className="text-center text-gray-600 sm:text-base">
              OTP sent to <b>{mobile}</b>
            </p>

            <input
              type="text"
              maxLength="8"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full mt-2 px-5 py-3 border rounded-xl outline-none text-center text-lg tracking-widest focus:ring-2 focus:ring-green-400 transition shadow-sm hover:shadow-md"
            />

            <button
              onClick={verifyOtp}
              className="w-full py-3 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:from-green-600 hover:to-green-700 transition"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              onClick={sendOtp}
              className="w-full text-green-600 text-sm sm:text-base hover:underline transition"
            >
              Resend OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;

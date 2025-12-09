import React, { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import BannerImage from "../assets/logo.jpg";
import { MoveLeft } from "lucide-react";

const DetailsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const detailsId = useParams();
  const confirmationId = detailsId.detailsId;
  const date = searchParams.get("date");
  const time = searchParams.get("times");
  const price = searchParams.get("price");

  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = () => {
    setLoading(true);
    setTimeout(() => {
      console.log("OTP Sent to", mobile);
      setOtpSent(true);
      setLoading(false);
    }, 1000);
  };

  const handleBack = () => navigate("/");

  const verifyOtp = () => {
    setLoading(true);
    setTimeout(() => {
      if (otp === "1234") {
        navigate(`/confirmation/${confirmationId}`, {
          state: { date, time, price, name: username },
        });
      } else {
        alert("Incorrect OTP");
      }
      setLoading(false);
    }, 1000);
  };

  const handleSubmitProfile = () => {
    if (!mobile || !username) return alert("Both fields are required.");
    if (mobile.length !== 10) return alert("Enter a valid 10-digit mobile number");
    sendOtp();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-start sm:justify-center px-4 py-10 sm:py-16">

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
            <MoveLeft className="w-6 h-6 text-gray-700" />
          </div>
          <h1 className="mx-auto text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center">
            {otpSent ? "Verify OTP" : "Submit Your Details"}
          </h1>
        </div>

        {/* Step 1: Profile */}
        {!otpSent && (
          <div className="space-y-6">
            <div>
              <label className="text-sm sm:text-base font-medium text-gray-700">Mobile Number</label>
              <input
                type="tel"
                maxLength="10"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter mobile number"
                className="w-full mt-2 px-5 py-3 border rounded-xl outline-none text-base sm:text-lg focus:ring-2 focus:ring-green-400 transition shadow-sm hover:shadow-md"
              />
            </div>

            <div>
              <label className="text-sm sm:text-base font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                maxLength="25"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your full name"
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
              maxLength="4"
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

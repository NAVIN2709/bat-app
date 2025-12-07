import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import BannerImage from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";

const DetailsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const detailsId = useParams();
  let confirmationId = detailsId.detailsId;
  const date = searchParams.get("date");
  const time = searchParams.get("times");
  const price = searchParams.get("price");

  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");

  // OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Dummy backend OTP (you'll replace this)
  const sendOtp = async () => {
    setLoading(true);
    setTimeout(() => {
      console.log("OTP Sent to", mobile);
      setOtpSent(true);
      setLoading(false);
    }, 1000);
  };

  const verifyOtp = async () => {
    setLoading(true);
    setTimeout(() => {
      if (otp === "1234") {
        console.log("OTP Verified. User:", { mobile, username });
        navigate(`/confirmation/${confirmationId}`, {
          state: {
            date: date,
            time: time,
            price: price,
            name:username
          },
        });
      } else {
        alert("Incorrect OTP");
      }
      setLoading(false);
    }, 1000);
  };

  const handleSubmitProfile = () => {
    if (!mobile || !username) {
      alert("Both fields are required.");
      return;
    }
    if (mobile.length !== 10) {
      alert("Enter a valid 10-digit mobile number");
      return;
    }
    sendOtp();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start sm:justify-center px-4 py-6 sm:py-10">
      {/* Banner */}
      <section className="w-full max-w-3xl flex justify-center items-center mb-6 sm:mb-10">
        <img
          src={BannerImage}
          alt="Banner"
          className="w-full max-h-[120px] sm:max-h-40 md:max-h-[200px] lg:max-h-60 object-contain rounded-lg p-2 sm:p-3"
        />
      </section>

      {/* Card */}
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          {otpSent ? "Verify OTP" : "Submit Your Details"}
        </h1>

        {/* Step 1: Enter Details */}
        {!otpSent && (
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Mobile Number (Required)
              </label>
              <input
                type="tel"
                maxLength="10"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full mt-1 px-4 py-3 border rounded-lg outline-none text-base focus:ring-2 focus:ring-green-400"
                placeholder="Enter your mobile number"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name (Required)
              </label>
              <input
                type="text"
                maxLength="25"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-1 px-4 py-3 border rounded-lg outline-none text-base focus:ring-2 focus:ring-green-400"
                placeholder="Enter a username"
              />
            </div>

            <button
              onClick={handleSubmitProfile}
              className="w-full bg-green-400 text-white py-3 sm:py-4 rounded-lg font-medium hover:bg-green-500 transition"
            >
              {loading ? "Sending OTP..." : "Continue"}
            </button>
          </div>
        )}

        {/* Step 2: OTP Input */}
        {otpSent && (
          <div className="space-y-5">
            <p className="text-center text-gray-600">
              OTP sent to <b>{mobile}</b>
            </p>

            <input
              type="text"
              maxLength="4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mt-1 px-4 py-3 border rounded-lg outline-none text-base tracking-widest text-center focus:ring-2 focus:ring-green-400"
              placeholder="Enter OTP"
            />

            <button
              onClick={verifyOtp}
              className="w-full bg-green-500 text-white py-3 sm:py-4 rounded-lg font-medium hover:bg-green-600 transition"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              className="w-full text-green-600 text-sm hover:underline"
              onClick={sendOtp}
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

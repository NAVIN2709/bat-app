import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BannerImage from "../assets/logo.jpg";
import {FaGoogle} from "react-icons/fa"
import { ArrowLeft } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);
    window.location.href = `${import.meta.env.vite.BACKEND_URL}/auth/google`;
  };

  const handleBack = () => navigate("/");

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
            {/* You can import MoveLeft icon if you want same as DetailsPage */}
            <ArrowLeft />
          </div>
          <h1 className="mx-auto text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center">
            Login with Google
          </h1>
        </div>

        {/* Google Login Button */}
        <div className="space-y-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 sm:py-4 bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold rounded-xl shadow-lg hover:from-green-500 hover:to-green-600 transition flex items-center justify-center gap-3"
            disabled={loading}
          >
            <FaGoogle />
            {loading ? "Redirecting..." : "Continue with Google"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

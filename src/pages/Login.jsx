import React, { useState } from "react";
import BannerImage from "../assets/logo.jpg";

const Login = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");

  const handleGoogleLogin = async () => {
    console.log("Google login clicked");
    console.log("trying google login...");
    setTimeout(() => {
      console.log("google login successful");
      setStep(2);
    }, 1000);
  };

  const handleSubmitProfile = () => {
    if (!mobile || !username) {
      alert("Both fields are required.");
      return;
    }
    console.log("Profile saved:", { mobile, username });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start sm:justify-center px-4 py-6 sm:py-10">
      {/* ---------- Banner Section ---------- */}
      <section
        className="
        w-full max-w-3xl 
        flex justify-center 
        items-center 
        mb-6 sm:mb-10
      "
      >
        <img
          src={BannerImage}
          alt="Banner"
          className="
            w-full 
            max-h-[120px] sm:max-h-40 md:max-h-[200px] lg:max-h-60
            object-contain 
            rounded-lg
            p-2 sm:p-3
          "
        />
      </section>

      {/* ---------- Login Card ---------- */}
      <div
        className="
        w-full max-w-md 
        bg-white 
        p-6 sm:p-8 
        rounded-2xl 
        shadow-xl
      "
      >
        <h1
          className="
          text-xl sm:text-2xl md:text-3xl 
          font-bold 
          text-center 
          text-gray-800 
          mb-6
        "
        >
          Login to Continue
        </h1>

        {/* Step 1 - Google Login */}
        {step === 1 && (
          <div className="text-center">
            <button
              onClick={handleGoogleLogin}
              className="
                w-full 
                flex items-center justify-center gap-3 
                bg-green-600 
                text-white 
                py-3 sm:py-4 
                text-sm sm:text-base 
                rounded-lg 
                font-medium 
                hover:bg-green-500 
                transition
              "
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-6 h-6 sm:w-7 sm:h-7"
                alt="Google"
              />
              Continue with Google
            </button>
          </div>
        )}

        {/* Step 2 - Phone & Username */}
        {step === 2 && (
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
                className="
                  w-full mt-1 px-4 py-3 
                  border rounded-lg 
                  outline-none 
                  text-base
                  focus:ring-2 focus:ring-green-400
                "
                placeholder="Enter your mobile number"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Username (Required)
              </label>
              <input
                type="text"
                maxLength="25"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="
                  w-full mt-1 px-4 py-3 
                  border rounded-lg 
                  outline-none 
                  text-base
                  focus:ring-2 focus:ring-green-400
                "
                placeholder="Enter a username"
              />
            </div>

            <button
              onClick={handleSubmitProfile}
              className="
                w-full 
                bg-green-400 
                text-white 
                py-3 sm:py-4 
                rounded-lg 
                font-medium 
                hover:bg-green-500 
                transition
              "
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import NavBar from "./components/Navbar";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-start h-screen bg-gray-100">
      <NavBar />
      <h1 className="text-4xl font-bold text-green-600 flex items-center justify-center mt-20">
        404 - Page Not Found
      </h1>
      <button className="mt-10 bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300 cursor-pointer" onClick={() => window.location.href = '/'}>
        Go Home
      </button>
    </div>
  );
};

export default NotFound;

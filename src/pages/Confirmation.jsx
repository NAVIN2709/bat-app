import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Rules from "./components/Rules";
import NavBar from "./components/Navbar";

const Confirmation = () => {
  const location = useLocation();
  const { bookingId } = useParams();
  console.log(bookingId)
  const { time, date, price, name } = location.state;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
        <NavBar />

      <div className="bg-white p-6 rounded-2xl shadow mb-6 max-w-2xl mx-auto text-center mt-3">
        <h2 className="text-3xl font-bold mb-4">Booking Confirmed {name} !</h2>

        <p className="text-gray-700 mb-2">Date: {date}</p>
        <p className="text-gray-700 mb-2">Booking Id: {bookingId}</p>
        <p className="text-gray-700 mb-2">Time: {time}</p>
        <p className="text-green-700 text-xl font-semibold mb-4">
          Total Amount: ₹{price}
        </p>

        <div className="mt-6">
          <h3 className="text-2xl font-bold mb-2">Court Rules</h3>
          <Rules />
        </div>
      </div>
    </div>
  );
};

export default Confirmation;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CourtInfo from "./components/CourtInfo";
import Rules from "./components/Rules";
import CourtCalendar from "./components/CourtCalender";
import TimeCarousel from "./components/TimeCarousel";
import NavBar from "./components/Navbar";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, located, price,id } = location.state;

  const availability = {
    "2025-12-01": true,
    "2025-12-02": false,
    "2025-12-03": true,
    "2025-12-04": false,
  };

  const court = {
    id : id ,
    name: name,
    located: located,
    price: price,
  };

  const slots = [
    { time: "10:00-11:00", booked: false },
    { time: "11:00-12:00", booked: true },
    { time: "12:00-13:00", booked: false },
  ];

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);

  const handleConfirm = () => {
    const calculatedPrice = selectedSlots.length * court.price;

    const timeQuery = encodeURIComponent(selectedSlots.join(","));
    console.log(timeQuery,selectedDate,calculatedPrice)

    navigate(
      `/details/${court.id}?courtId=${court.id}&date=${selectedDate}&times=${timeQuery}&price=${calculatedPrice}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-0">
      <NavBar />
      <div className="court mt-2">
        <CourtInfo court={court} />
      </div>

      {/* ✅ Pass onDateSelect */}
      <CourtCalendar
        availability={availability}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />

      {/* ✅ Pass onSlotSelect */}
      <TimeCarousel
        slots={slots}
        selectedSlots={selectedSlots}
        onSlotSelect={setSelectedSlots}
      />

      <Rules />
      <div className="flex justify-between items-center mt-6 bg-white p-4 rounded-xl shadow">
        <p className="text-lg font-semibold">Total Price:</p>
        <p className="text-xl font-bold text-green-600">
          ₹{selectedSlots.length * court.price}
        </p>
      </div>

      <div className="flex justify-center mt-4 pb-4">
        <button
          onClick={handleConfirm}
          className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700"
        >
          Confirm & Pay
        </button>
      </div>
    </div>
  );
};

export default Booking;

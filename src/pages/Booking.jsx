import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourtInfo from "./components/CourtInfo";
import Rules from "./components/Rules";
import CourtCalendar from "./components/CourtCalender";
import TimeCarousel from "./components/TimeCarousel";
import NavBar from "./components/Navbar";

const Booking = () => {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);

  const court = {
    id: 1,
    name: "Smash Pro Indoor Arena",
    location: "Trichy",
    price: 250,
  };

  const availability = {
    "2025-12-01": true,
    "2025-12-02": false,
    "2025-12-03": true,
    "2025-12-04": false,
  };

  const slots = [
    { time: "10:00-11:00", booked: false },
    { time: "11:00-12:00", booked: true },
    { time: "12:00-13:00", booked: false },
  ];

  // ✅ State for selection
  const [selectedDate, setSelectedDate] = useState("2025-12-01");
  const [selectedSlots, setSelectedSlots] = useState([]);

  const handleConfirm = () => {
    const calculatedPrice = selectedSlots.length * court.price;

    const timeQuery = encodeURIComponent(selectedSlots.join(","));

    navigate(
      `/confirmation/${court.id}?courtId=${court.id}&date=${selectedDate}&times=${timeQuery}&price=${calculatedPrice}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="navbar mt-0 mb-6">
        <NavBar />
      </div>
      <CourtInfo court={court} />

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

      <div className="flex justify-center mt-6">
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

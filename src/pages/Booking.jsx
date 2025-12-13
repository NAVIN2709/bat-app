import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CourtInfo from "./components/CourtInfo";
import Rules from "./components/Rules";
import CourtCalendar from "./components/CourtCalender";
import TimeCarousel from "./components/TimeCarousel";
import NavBar from "./components/Navbar";
import axios from "axios";
import { SlEmotsmile } from "react-icons/sl";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookedData, setBookedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const { name, located, price, id } = location.state;

  // 🔥 Fetch Booked Slots from Backend
  useEffect(() => {
    const fetchTimings = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.vite.BACKEND_URL}/api/turfs/court-timings/${id}`
        );

        setBookedData(res.data.bookings.bookings);
      } catch (err) {
        console.error("Error fetching timings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTimings();
  }, []);

  const availability = {};

  const baseSlots = [
    { time: "6:00-7:00", booked: false },
    { time: "7:00-8:00", booked: false },
    { time: "8:00-9:00", booked: false },
    { time: "9:00-10:00", booked: false },
    { time: "10:00-11:00", booked: false },
    { time: "11:00-12:00", booked: false },
    { time: "12:00-13:00", booked: false },
    { time: "13:00-14:00", booked: false },
    { time: "14:00-15:00", booked: false },
    { time: "15:00-16:00", booked: false },
    { time: "16:00-17:00", booked: false },
    { time: "17:00-18:00", booked: false },
    { time: "18:00-19:00", booked: false },
    { time: "19:00-20:00", booked: false },
    { time: "20:00-21:00", booked: false },
    { time: "21:00-22:00", booked: false },
  ];

  const setTimings = () => {
    var x = 0;
    bookedData?.map((b) => {
      b.slots.map((slot) => {
        baseSlots.map((baseSlot) => {
          if (baseSlot.time == slot) {
            baseSlot.booked = true;
          }
        });
      });
      baseSlots.forEach((baseSlot) => {
        if (baseSlot.booked == true) {
          x = x + 1;
        }
      });
      if ( x == 16){
        availability[b.date] = false;
        x = 0
      }else{
        availability[b.date] = true;
        x = 0
      }
    });
  };

  setTimings();
  

  const court = {
    id: id,
    name: name,
    located: located,
    price: price,
  };

  const handleConfirm = () => {
    if (!selectedDate || selectedSlots.length === 0) return;
    const calculatedPrice = selectedSlots.length * court.price;

    const timeQuery = encodeURIComponent(selectedSlots.join(","));

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

      {/* Pass onDateSelect */}
      <CourtCalendar
        availability={availability}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />

      {/*  Pass onSlotSelect */}
      <TimeCarousel
        slots={baseSlots}
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

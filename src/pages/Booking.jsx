import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CourtInfo from "./components/CourtInfo";
import Rules from "./components/Rules";
import CourtCalendar from "./components/CourtCalender";
import TimeCarousel from "./components/TimeCarousel";
import NavBar from "./components/Navbar";
import axios from "axios";
import dayjs from "dayjs";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const BASE_SLOTS = [
    { time: "06:00-07:00" },
    { time: "07:00-08:00" },
    { time: "08:00-09:00" },
    { time: "09:00-10:00" },
    { time: "10:00-11:00" },
    { time: "11:00-12:00" },
    { time: "12:00-13:00" },
    { time: "13:00-14:00" },
    { time: "14:00-15:00" },
    { time: "15:00-16:00" },
    { time: "16:00-17:00" },
    { time: "17:00-18:00" },
    { time: "18:00-19:00" },
    { time: "19:00-20:00" },
    { time: "20:00-21:00" },
    { time: "21:00-22:00" },
  ];
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookedData, setBookedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [availability, setAvailability] = useState({});
  const [slots, setSlots] = useState(BASE_SLOTS);
  const { name, located, price, id } = location.state;

  useEffect(() => {
    const fetchTimings = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/turfs/court-timings/${id}`
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

  useEffect(() => {
    if (!bookedData.length || !selectedDate) return;

    // reset slots
    const updatedSlots = BASE_SLOTS.map((slot) => ({
      ...slot,
      booked: false,
    }));

    const availabilityMap = {};

    bookedData.forEach((b) => {
      let bookedCount = 0;
      if (b.date == selectedDate) {
        b.slots.forEach((bookedTime) => {
          updatedSlots.forEach((s) => {
            if (s.time == bookedTime) {
              s.booked = true;
            }
          });
        });
      }

      // count booked slots for this date
      b.slots.length === 16
        ? (availabilityMap[b.date] = false)
        : (availabilityMap[b.date] = true);
    });

    setSlots(updatedSlots);
    setAvailability(availabilityMap);
  }, [selectedDate,bookedData]);

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

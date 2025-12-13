import React, { useEffect, useState } from "react";
import NavBar from "./components/Navbar";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Profile = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const user = jwtDecode(localStorage.getItem("token"));

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${import.meta.env.vite.BACKEND_URL}/api/bookings/${user.guestId}`);
        setReservations(res.data.bookings);
      } catch (err) {
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container p-6">
        <div className="backbutton flex items-center cursor-pointer ">
          <div className="arrow mb-2">
            <ArrowLeft onClick={handleBack} />
          </div>
          <h1 className="text-xl lg:text-3xl font-bold mb-3 ml-2 ">
            My Profile
          </h1>
        </div>

        {/* Profile Info */}
        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-3">Personal Details</h2>

          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span> {user?.name}
            </p>
          </div>
        </div>

        {/* Past Reservations */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Past Reservations</h2>

          <div className="space-y-4">
            {reservations?.map((r) => (
              <div
                key={r._id}
                className="border rounded-lg p-4 bg-gray-50 shadow-sm"
              >
                <p className="text-gray-700">
                  <span className="font-semibold">BookingId:</span> {r._id}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Date:</span> {r.date}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Time:</span> {r.slot}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Amount:</span> ₹{r.totalPrice}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Court Name:</span> {r.turf.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Location:</span> {r.turf.location}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Mobile:</span> {r.guest.phone}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Had Played:</span> {r.isDone ? "Done" : "Not Done"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

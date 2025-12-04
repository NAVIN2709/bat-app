import React from "react";
import NavBar from "./components/Navbar";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  // Mock User Data
  const user = {
    name: "Navin Kumar",
    mobile: "+91 82206 20170",
  };

  // Mock Past Reservations
  const reservations = [
    {
      id: 1,
      court: "Smash Pro Indoor Arena",
      date: "2025-12-01",
      time: "10:00 - 11:00",
      amount: 250,
    },
    {
      id: 2,
      court: "KaviKanna Badminton Court",
      date: "2025-11-24",
      time: "12:00 - 13:00",
      amount: 250,
    },
    {
      id: 3,
      court: "Arena Club Sports Hall",
      date: "2025-11-18",
      time: "09:00 - 10:00",
      amount: 300,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container p-3">
        <div className="backbutton flex items-center cursor-pointer ">
          <ArrowLeft onClick={handleBack} />
          <h1 className="text-xl lg:text-3xl font-bold mb-3 ml-2 mt-3">
            My Profile
          </h1>
        </div>

        {/* Profile Info */}
        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-3">Personal Details</h2>

          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Mobile:</span> {user.mobile}
            </p>
          </div>
        </div>

        {/* Past Reservations */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Past Reservations</h2>

          <div className="space-y-4">
            {reservations.map((r) => (
              <div
                key={r.id}
                className="border rounded-lg p-4 bg-gray-50 shadow-sm"
              >
                <p className="font-bold text-lg">{r.court}</p>
                <p className="text-gray-700">
                  <span className="font-semibold">Date:</span> {r.date}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Time:</span> {r.time}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Amount:</span> ₹{r.amount}
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

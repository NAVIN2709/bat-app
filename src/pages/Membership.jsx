import React, { useState, useEffect } from "react";
import NavBar from "./components/Navbar";
import axios from "axios";

const MembershipPage = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    timeSlot: "",
    court: "",
    startDate: "",
  });
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/turfs`
        );
        setCourts(res.data);
      } catch (error) {
        console.error("Error fetching courts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="min-h-screen bg-green-50">
      <NavBar />

      {/* Header */}
      <div className="text-center mt-12 px-4">
        <h1 className="text-4xl font-bold text-green-700">Membership</h1>
      </div>

      {/* Form Card */}
      <div className="max-w-lg mx-auto mt-10 bg-white rounded-3xl shadow-xl p-8 border border-green-100">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm font-semibold text-green-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-semibold text-green-700">
              Mobile Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter mobile number"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="text-sm font-semibold text-green-700">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300
               focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Time Slot */}
          <div>
            <label className="text-sm font-semibold text-green-700">
              Preferred Time Slot
            </label>
            <select
              name="timeSlot"
              value={form.timeSlot}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="">Select time slot</option>
              <option>05:00 – 06:00</option>
              <option>06:00 – 07:00</option>
              <option>07:00 – 08:00</option>
              <option>08:00 – 09:00</option>
              <option>09:00 – 10:00</option>
              <option>10:00 – 11:00</option>
              <option>11:00 – 12:00</option>
              <option>12:00 – 13:00</option>
              <option>13:00 – 14:00</option>
              <option>14:00 – 15:00</option>
              <option>15:00 – 16:00</option>
              <option>16:00 – 17:00</option>
              <option>17:00 – 18:00</option>
              <option>18:00 – 19:00</option>
              <option>19:00 – 20:00</option>
              <option>20:00 – 21:00</option>
            </select>
          </div>

          {/* Court */}
          <div>
            <label className="text-sm font-semibold text-green-700">
              Court
            </label>

            <select
              name="court"
              value={form.court}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white
               focus:ring-2 focus:ring-green-500 focus:outline-none"
              disabled={loading}
            >
              <option value="">
                {loading ? "Loading courts..." : "Select court"}
              </option>

              {courts.map((court) => (
                <option key={court._id} value={court._id}>
                  {court.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Info */}
          <div className="bg-green-100 rounded-xl p-4 text-center">
            <p className="text-green-800 font-semibold">₹4000 / Month</p>
            <p className="text-sm text-green-700">Includes 1 hour daily play</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Apply for Membership
          </button>
        </form>
      </div>
    </div>
  );
};

export default MembershipPage;

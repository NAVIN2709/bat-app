import React, { useState, useEffect } from "react";
import NavBar from "./components/Navbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { makeMembershipPayment } from "./utils/makeMembershipPaymentFunction";
import { CheckCircle2, XCircle } from "lucide-react";

const MembershipPage = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    timeSlot: "",
    court: "",
    startDate: "",
  });
  const navigate = useNavigate();
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    } catch (error) {
      navigate("/login");
      setUser(null);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/turfs`,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        name: form.name,
        phone: form.phone,
        startDate: form.startDate,
        slot: form.timeSlot,
        turfId: form.court,
        guestId: user.guestId,
      };

      // 1. Create "pending" membership record
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/membership`,
        payload,
      );

      const membershipId = res.data._id;

      // 2. Trigger Payment
      const paymentResult = await makeMembershipPayment({
        membershipId,
        name: form.name,
        phone: form.phone,
        email: user.email,
      });

      // 3. UI Handling
      if (paymentResult.success) {
        setPaymentSuccess(true);
        setForm({
          name: "",
          phone: "",
          timeSlot: "",
          court: "",
          startDate: "",
        });
        setTimeout(() => setPaymentSuccess(false), 5000);
      } else {
        setPaymentError(true);
        setTimeout(() => setPaymentError(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting membership:", error);
      alert(error.response?.data?.message || "Failed to apply for membership");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  if (!user)
    return (
      <div className="return min-h-screen bg-green-50">
        <NavBar />
        <div className="text-center mt-12 px-4">
          <h1 className="text-4xl font-bold text-green-700">Membership</h1>
          <p className="text-lg font-semibold text-green-500 mt-5">
            Please Login to apply for memberships
          </p>
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 sm:py-4 bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold rounded-xl shadow-lg hover:from-green-500 hover:to-green-600 transition flex items-center justify-center gap-3 mt-5"
            disabled={loading}
          >
            <FaGoogle />
            {loading ? "Redirecting..." : "Continue with Google"}
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-green-50">
      <NavBar />

      <div className="text-center mt-12 px-4">
        <h1 className="text-4xl font-bold text-green-700">Membership</h1>
      </div>

      <div className="max-w-lg mx-auto mt-10 bg-white rounded-3xl shadow-xl p-8 border border-green-100 mb-10">
        <form onSubmit={handleSubmit} className="space-y-5">
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
              className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

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
              <option>16:00 – 17:00</option>
              <option>17:00 – 18:00</option>
              <option>18:00 – 19:00</option>
              <option>19:00 – 20:00</option>
              <option>20:00 – 21:00</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-green-700">
              Court
            </label>
            <select
              name="court"
              value={form.court}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
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

          <div className="bg-green-100 rounded-xl p-4 text-center">
            <p className="text-green-800 font-semibold">₹4000 / Month</p>
            <p className="text-sm text-green-700">Includes 1 hour daily play</p>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Processing..." : "Apply for Membership"}
          </button>
        </form>
      </div>

      {/* ✅ Modal */}
      {(paymentSuccess || paymentError) && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl text-center shadow-2xl max-w-xs w-full">
            {paymentSuccess ? (
              <>
                <CheckCircle2
                  className="text-green-500 mx-auto mb-4"
                  size={48}
                />
                <h2 className="text-2xl font-bold text-gray-800">
                  Payment Success
                </h2>
                <p className="text-gray-600 mt-2">Welcome to the club!</p>
              </>
            ) : (
              <>
                <XCircle className="text-red-500 mx-auto mb-4" size={48} />
                <h2 className="text-2xl font-bold text-gray-800">
                  Payment Failed
                </h2>
                <p className="text-gray-600 mt-2">Please try again later.</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipPage;

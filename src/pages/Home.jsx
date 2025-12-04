import React from "react";
import { useNavigate } from "react-router-dom";
import CourtCard from "./components/CourtCard";
import BannerImage from "../assets/banner.jpg";
import Navbar from "./components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  const courts = [
    {
      id: 1,
      name: "Smash Pro Indoor Arena",
      location: "Trichy, Tamil Nadu",
      rating: 4.7,
      price: 250,
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200",
    },
    {
      id: 2,
      name: "Feather Shots Court",
      location: "Chennai, Tamil Nadu",
      rating: 4.5,
      price: 300,
      image:
        "https://images.unsplash.com/photo-1599058918144-eb18f1d4807d?q=80&w=1200",
    },
    {
      id: 3,
      name: "Arena 24x7 Sports Club",
      location: "Bangalore, Karnataka",
      rating: 4.8,
      price: 280,
      image:
        "https://images.unsplash.com/photo-1518602164572-75be7f1e22b2?q=80&w=1200",
    },
  ];

  const handleCourtClick = (id) => {
    navigate(`/booking/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <Navbar />

      {/* BANNER */}
      <section className="relative w-full flex justify-center items-center bg-white">
  <img
    src={BannerImage}
    alt="Banner"
    className="
      w-full 
      h-auto 
      object-contain 
      rounded-lg 
      shadow-lg
      p-2
    "
  />
</section>


      {/* COURT LISTING */}
      <div className="p-6 mt-10">
        <h2 className="text-3xl font-bold mb-2">Available Courts</h2>
        <p className="text-gray-600 mb-6">Choose from top-rated arenas.</p>

        {/* COURT CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courts.map((court) => (
            <div
              key={court.id}
              onClick={() => handleCourtClick(court.id)}
              className="cursor-pointer"
            >
              <CourtCard court={court} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

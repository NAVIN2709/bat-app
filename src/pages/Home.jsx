import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import CourtCard from "./components/CourtCard";
import BannerImage from "../assets/banner.jpg";
import Navbar from "./components/Navbar";

const Home = () => {
  const courtsRef = useRef();
  const scrollToCourts = () => {
    if (!courtsRef.current) return;

    const elementPosition =
      courtsRef.current.getBoundingClientRect().top + window.scrollY;

    const offsetPosition = elementPosition - 110;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

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
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white pb-1">
      <Navbar />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-10 animate-fadeUp">
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 md:p-14 shadow-xl border border-green-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* TEXT */}
            <div className="opacity-0 animate-slideLeft">
              <h1 className="text-4xl md:text-6xl font-extrabold text-green-700 leading-tight drop-shadow-sm">
                Book Courts
                <span className="text-green-600 block">Faster & Smarter.</span>
              </h1>

              <p className="text-gray-600 text-lg mt-4">
                Discover premium badminton courts near you with instant online
                booking.
              </p>

              <button
                onClick={scrollToCourts}
                className="mt-6 px-6 py-3 rounded-xl bg-green-600 text-white text-lg shadow-lg 
                         hover:bg-green-700 hover:shadow-xl transition-all duration-300"
              >
                Explore Courts
              </button>
            </div>

            {/* BANNER */}
            <div className="opacity-0 animate-slideRight">
              <img
                src={BannerImage}
                alt="banner"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* COURTS */}
      <div
        ref={courtsRef}
        className="max-w-7xl mx-auto px-6 md:px-10 mt-20 mb-16"
      >
        <h2 className="text-3xl font-bold text-green-700 mb-1 animate-fadeUp">
          Available Courts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {courts.map((court, index) => (
            <div
              key={court.id}
              onClick={() => handleCourtClick(court.id)}
              className="cursor-pointer opacity-0"
              style={{
                animation: `fadeUp 0.8s ease-out forwards`,
                animationDelay: `${index * 0.15}s`,
              }}
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

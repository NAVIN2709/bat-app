import React, { useState } from "react";
import Logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogo = () => {
    navigate("/");
  };

  return (
    <nav
      className="
        sticky top-0 z-50
        backdrop-blur-xl bg-white/80 
        border-b border-green-100
        shadow-[0_2px_10px_rgba(0,0,0,0.05)] w-screen
      "
    >
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
        {/* LOGO + TEXT */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={handleLogo}
        >
          <img
            src={Logo}
            alt="Logo"
            className="h-20 w-20 object-contain transition-transform duration-300"
          />

          <span className="text-xl font-semibold text-green-700 group-hover:text-green-800 transition hidden sm:block">
            KaviKanna Badminton Court
          </span>
        </div>

        {/* Desktop Button */}
        <button
          className="
            bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold
            transition duration-300 hover:bg-white hover:text-green-600
            hover:border hover:border-green-600 hover:scale-105
            hidden sm:block
          "
        >
          Get Membership
        </button>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden p-2 rounded-md text-green-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="sm:hidden bg-white px-5 pb-5 pt-2 shadow-md animate-slideDown">
          <button
            className="
              w-full bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold
              transition duration-300 hover:bg-white hover:text-green-600
              hover:border hover:border-green-600 hover:scale-105
            "
          >
            Get Membership
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

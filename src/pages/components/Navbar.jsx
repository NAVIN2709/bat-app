import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const loggedInUser = jwtDecode(token);
      setUser(loggedInUser);
    }
  }, []);

  const handleLogo = () => {
    navigate("/");
  };

  const handleMembership = () => {
    navigate('/membership')
  };

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setOpen(false);
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-green-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)] w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
        {/* LOGO + TEXT */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={handleLogo}
        >
          <img
            src={Logo}
            alt="Logo"
            className="h-16 w-16 sm:h-20 sm:w-20 object-contain transition-transform duration-300"
          />
          <span className="text-xl font-semibold text-green-700 group-hover:text-green-800 transition hidden sm:block">
            KaviKanna Badminton Court
          </span>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button className="bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-lg font-semibold transition duration-300 hover:bg-white hover:text-green-600 hover:border hover:border-green-600 hover:scale-105">
            Get Membership
          </button>

          {user ? (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="bg-white text-green-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-lg font-semibold border border-green-600 transition duration-300 hover:bg-green-600 hover:text-white hover:scale-105"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-white text-red-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-lg font-semibold border border-red-600 transition duration-300 hover:bg-red-600 hover:text-white hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-lg font-semibold transition duration-300 hover:bg-white hover:text-green-600 hover:border hover:border-green-600 hover:scale-105"
            >
              Login
            </button>
          )}
        </div>

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
        <div className="sm:hidden bg-white px-5 pb-5 pt-2 shadow-md animate-slideDown overflow-x-hidden flex flex-col gap-2">
          <button
            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg text-lg font-semibold transition duration-300 hover:bg-white hover:text-green-600 hover:border hover:border-green-600 hover:scale-105"
            onClick={handleMembership}
          >
            Get Membership
          </button>

          {user ? (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="w-full bg-white text-green-600 px-4 py-2 rounded-lg text-lg font-semibold border border-green-600 transition duration-300 hover:bg-green-600 hover:text-white hover:scale-105"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full bg-white text-red-600 px-4 py-2 rounded-lg text-lg font-semibold border border-red-600 transition duration-300 hover:bg-red-600 hover:text-white hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg text-lg font-semibold transition duration-300 hover:bg-white hover:text-green-600 hover:border hover:border-green-600 hover:scale-105"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;

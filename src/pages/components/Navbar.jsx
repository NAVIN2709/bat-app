import React from "react";
import Logo from "../../assets/logo.jpg";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between p-5 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <img src={Logo} alt="Logo" className="h-10" />
        <span className="text-l font-bold lg:text-xl">KaviKanna Batminton Court</span>
      </div>

      <button className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
        Login
      </button>
    </nav>
  );
};

export default NavBar;

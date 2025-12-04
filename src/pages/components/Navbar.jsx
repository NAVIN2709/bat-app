import React from "react";
import Logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  }
  const handleProfile = () =>{
    navigate('/profile');
  }
  return (
    <nav className="flex items-center justify-between p-5 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <img src={Logo} alt="Logo" className="h-10" />
        <span className="text-l font-bold lg:text-xl">KaviKanna Batminton Court</span>
      </div>
      <div className="buttons">
        <button className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 mr-2" onClick={handleProfile}>
        Profile
      </button>
        <button className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700" onClick={handleLogin}>
        Login
      </button>
      </div>
    </nav>
  );
};

export default NavBar;

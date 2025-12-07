import React from "react";
import Logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogo = () =>{
    navigate('/');
  }
  return (
    <nav className="flex items-center justify-between p-5 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <img src={Logo} alt="Logo" className="h-10" />
        <span className="text-l font-bold lg:text-xl cursor-pointer" onClick={handleLogo}>KaviKanna Batminton Court</span>
      </div>
    </nav>
  );
};

export default NavBar;

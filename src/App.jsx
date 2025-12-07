import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Booking from './pages/Booking';
import Confirmation from './pages/Confirmation';
import DetailsPage from './pages/Details';

const App = () => {
  return (
    <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Profile page */}
        <Route path="/profile" element={<Profile />} />

        {/* Booking page with dynamic courtId */}
        <Route path="/booking/:courtId" element={<Booking />} />

        {/* Confirmation page with dynamic bookingId */}
        <Route path="/confirmation/:bookingId" element={<Confirmation />} />
        <Route path='/details/:detailsId' element={<DetailsPage/>}/>

    </Routes>
  );
};

export default App;

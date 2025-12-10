import React from 'react';

const CourtInfo = ({ court }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-6">
      <h2 className="text-2xl font-bold mb-2">{court.name}</h2>
      <p className="text-gray-600 mb-1">{court.located}</p>
      <p className="text-green-700 font-semibold">₹{court.price}/hour</p>
    </div>
  );
};

export default CourtInfo;

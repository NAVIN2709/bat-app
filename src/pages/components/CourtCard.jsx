import React from 'react';

export default function CourtCard({ court }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
                src={court.image}
                alt={court.name}
                className="w-full h-40 object-cover"
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{court.name}</h2>
                <p className="text-gray-600 mb-2">{court.location}</p>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-yellow-500 font-medium">
                        Rating: {court.rating} ★
                    </span>
                    <span className="text-green-600 font-semibold">
                        ₹{court.price}/hour
                    </span>
                </div>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                    Book Now
                </button>
            </div>
        </div>
    );
}

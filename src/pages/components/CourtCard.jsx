import React from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CourtCard = ({ court }) => {
  const navigate = useNavigate();

  const handleCourtClick = (id) => {
    navigate(`/booking/${id}`, {
      state: {
        name: court.name,
        located: court.location,
        price: court.price,
        id : id
      },
    });
  };

  return (
    <div
      className="
      bg-white
      rounded-2xl 
      border border-green-100
      shadow-[0_8px_20px_rgba(0,0,0,0.08)]
      hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)]
      overflow-hidden 
      transition-all 
      duration-300 
      hover:-translate-y-1
    "
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={court.imageUrl}
          alt={court.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-green-700">{court.name}</h3>
        <p className="text-gray-600 text-sm">{court.location}</p>

        <div className="mt-3 flex justify-between items-center">
          <p className="text-green-700 font-semibold text-xl">₹{court.price}</p>

          <button
            onClick={() => handleCourtClick(court._id)}
            className="
              bg-green-600 text-white 
              px-4 py-2 
              rounded-xl 
              text-sm 
              hover:bg-green-700 
              transition
              cursor-pointer
            "
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourtCard;

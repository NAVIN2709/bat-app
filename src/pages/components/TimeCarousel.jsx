import React from "react";

const TimeCarousel = ({ slots = [], selectedSlots = [], onSlotSelect }) => {
  const toggleSlot = (time) => {
    if (selectedSlots.includes(time)) {
      onSlotSelect(selectedSlots.filter((t) => t !== time));
    } else {
      onSlotSelect([...selectedSlots, time]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Select Time Slot</h2>

      {/* Slot list */}
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        {slots.map((slot, index) => {
          const isSelected = selectedSlots.includes(slot.time);
          const isBooked = slot.booked;

          let styleClass = "";

          if (isBooked) {
            styleClass =
              "bg-red-600 text-white border-red-700 cursor-not-allowed opacity-80";
          } else if (isSelected) {
            styleClass =
              "bg-green-700 text-white border-green-800 shadow-lg scale-105";
          } else {
            styleClass =
              "bg-green-100 text-green-800 border-green-300 hover:bg-green-200 hover:shadow-sm";
          }

          return (
            <button
              key={index}
              disabled={isBooked}
              onClick={() => !isBooked && toggleSlot(slot.time)}
              className={`shrink-0 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${styleClass}`}
            >
              {slot.time}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-gray-">
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 rounded-full bg-green-100 border border-green-300 shadow-sm"></span>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 rounded-full bg-green-700 border border-green-800 shadow-sm"></span>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 rounded-full bg-red-600 border border-red-700 shadow-sm"></span>
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
};

export default TimeCarousel;

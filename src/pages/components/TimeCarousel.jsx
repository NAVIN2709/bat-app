import React from 'react';

const TimeCarousel = ({ slots = [], selectedSlots = [], onSlotSelect }) => {
  const toggleSlot = (time) => {
    if (selectedSlots.includes(time)) {
      // remove it
      onSlotSelect(selectedSlots.filter(t => t !== time));
    } else {
      // add it
      onSlotSelect([...selectedSlots, time]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-6">
      <h2 className="text-2xl font-bold mb-4">Select Time Slot</h2>

      <div className="flex gap-3 overflow-x-auto">
        {slots.map((slot, index) => {
          const isSelected = selectedSlots.includes(slot.time);

          return (
            <div
              key={index}
              onClick={() => !slot.booked && toggleSlot(slot.time)}
              className={`shrink-0 px-4 py-3 rounded-lg text-center cursor-pointer transition
                ${slot.booked ? 'bg-red-500 text-white cursor-not-allowed opacity-60'
                               : 'bg-green-500 text-white'}
                ${isSelected ? 'bg-green-700 shadow-xl scale-110' : ''}`}
            >
              {slot.time}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeCarousel;

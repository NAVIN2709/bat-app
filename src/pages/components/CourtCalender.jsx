import React from "react";
import dayjs from "dayjs";

const CourtCalendar = ({
  availability = {},
  selectedDate,
  onDateSelect = () => {},
}) => {
  const today = dayjs();

  const months = [
    today.startOf("month"),
    today.add(1, "month").startOf("month"),
  ];

  const weekDays = ["M", "T", "W", "T", "F", "S", "S"]; // Monday first

  const generateMonthDays = (month) => {
    const startOfMonth = month.startOf("month");
    const endOfMonth = month.endOf("month");

    const leadingEmptyDays = (startOfMonth.day() + 6) % 7;
    const days = [];

    for (let i = 0; i < leadingEmptyDays; i++) days.push(null);

    for (let d = 1; d <= endOfMonth.date(); d++) {
      const dateString = month.date(d).format("YYYY-MM-DD");
      days.push(dateString);
    }

    return days;
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow mb-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Select Date</h2>

      {months.map((month, idx) => {
        const monthName = month.format("MMMM YYYY");
        const days = generateMonthDays(month);

        return (
          <div key={idx} className="mb-8">
            {/* Month Title */}
            <h3 className="text-lg sm:text-xl font-semibold mb-3">
              {monthName}
            </h3>

            {/* Weekday header */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-gray-700 font-semibold mb-2 text-xs sm:text-sm">
              {weekDays.map((d, idx) => (
                <div key={idx}>{d}</div>
              ))}
            </div>

            {/* Dates grid */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {days.map((date, i) => {
                if (!date) {
                  return (
                    <div key={i} className="aspect-square h-auto"></div>
                  );
                }

                const isAvailable = availability[date] ?? true;
                const isSelected = selectedDate === date;

                return (
                  <div
                    key={date}
                    onClick={() => isAvailable && onDateSelect(date)}
                    className={`aspect-square flex items-center justify-center rounded-md sm:rounded-lg cursor-pointer 
                      transition-all duration-200 text-white text-xs sm:text-base select-none
                      ${isAvailable ? "bg-green-500 hover:scale-105" : "bg-red-500 opacity-70 cursor-not-allowed"}
                      ${isSelected ? "bg-green-700 shadow-lg scale-105" : ""}
                    `}
                  >
                    {dayjs(date).date()}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 text-sm sm:text-base">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full"></span>
          <span className="text-gray-700">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full"></span>
          <span className="text-gray-700">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 sm:w-5 sm:h-5 bg-green-700 rounded-full"></span>
          <span className="text-gray-700">Selected</span>
        </div>
      </div>
    </div>
  );
};

export default CourtCalendar;

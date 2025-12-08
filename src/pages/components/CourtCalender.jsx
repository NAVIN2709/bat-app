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

  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

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
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow mb-6 max-w-3xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Select Date</h2>

      {months.map((month, idx) => {
        const monthName = month.format("MMMM YYYY");
        const days = generateMonthDays(month);

        return (
          <div key={idx} className="mb-10">
            {/* Month Title */}
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">
              {monthName}
            </h3>

            {/* Weekday header */}
            <div className="grid grid-cols-7 gap-2 text-center text-gray-600 font-medium text-xs sm:text-sm mb-2">
              {weekDays.map((d, idx) => (
                <div key={idx}>{d}</div>
              ))}
            </div>

            {/* Dates grid */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((date, i) => {
                if (!date) {
                  return <div key={i} className="aspect-square"></div>;
                }

                const isAvailable = availability[date] ?? true;
                const isSelected = selectedDate === date;

                return (
                  <div
                    key={date}
                    onClick={() => isAvailable && onDateSelect(date)}
                    className={`aspect-square flex items-center justify-center 
                      rounded-lg cursor-pointer transition-all duration-200 
                      text-xs sm:text-sm lg:text-base font-medium select-none
                      border 
                      ${
                        isAvailable
                          ? "bg-green-100 text-green-700 border-green-300 hover:bg-green-200 hover:shadow-sm"
                          : "bg-red-100 text-red-600 border-red-300 opacity-60 cursor-not-allowed"
                      }
                      ${
                        isSelected
                          ? "bg-green-600 text-white border-green-700 shadow-lg scale-105"
                          : ""
                      }
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
          <span className="w-4 h-4 bg-green-200 border border-green-400 rounded-full"></span>
          <span className="text-gray-700">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-red-200 border border-red-400 rounded-full"></span>
          <span className="text-gray-700">Not Available</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-green-600 rounded-full"></span>
          <span className="text-gray-700">Selected</span>
        </div>
      </div>
    </div>
  );
};

export default CourtCalendar;

import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const BusinessTiming = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const selectAllDays = () => {
    if (selectedDays.length === 7) setSelectedDays([]);
    else setSelectedDays(days);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-10 py-8">
      <div className="flex justify-center"></div>

      <div>
        <h1 className="font-bold text-2xl mt-2">Add Business Timings</h1>
        <p className="text-md mt-2 text-gray-600">
          Let your customers know when you are open for business
        </p>

        <div className="mt-6">
          <h2 className="text-lg font-medium mb-2">Select Days of the Week</h2>
          <div className="flex flex-wrap gap-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`px-2 py-2 w-fit rounded-full border text-sm ${
                  selectedDays.includes(day)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <label className="flex items-center mt-3 cursor-pointer text-sm text-blue-600">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedDays.length === 7}
              onChange={selectAllDays}
            />
            Select All Days
          </label>
        </div>

        <div className="flex gap-4 mt-6">
          <div className="relative w-full mt-4">
            <select
              id="openTime"
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
              required
              className={`peer w-full h-[48px] px-2.5 pt-4 pb-1 text-sm text-gray-900 bg-white border appearance-none rounded-md focus:outline-none focus:ring-0
      ${openTime ? "border-blue-600" : "border-gray-300"} 
      focus:border-blue-600
    `}
            >
              <option value="">Select</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="01:00 PM">01:00 PM</option>
            </select>

            <label
              htmlFor="openTime"
              className={`absolute left-2.5 top-3 text-sm text-gray-500 bg-white px-1 transition-all duration-200 ease-in-out 
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600
      ${openTime ? "-top-2 text-xs text-blue-600" : ""}
    `}
            >
              Open at
            </label>
          </div>

          <div className="relative w-full">
            <label className="block mb-1 text-sm text-gray-600">Close at</label>
            <select
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="8:00 PM">8:00 PM</option>
              <option value="9:00 PM">9:00 PM</option>
              <option value="10:00 PM">10:00 PM</option>
            </select>
            <FaChevronDown className="absolute right-3 top-9 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <button className="mt-4 text-sm text-blue-600 hover:underline">
          + Add Another Time Slot
        </button>

        <div className="mt-6">
          <button className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition">
            Save and Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessTiming;

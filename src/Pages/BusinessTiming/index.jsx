import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const openTimeOptions = [
  "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM",
  "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM"
];
const closeTimeOptions = [
  "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM",
  "10:00 PM", "11:00 PM", "12:00 AM"
];

const BusinessTiming = () => {
  const [timeSlots, setTimeSlots] = useState([
    {
      id: 1,
      selectedDays: [],
      openTime: "",
      closeTime: ""
    }
  ]);

  const toggleDay = (slotId, day) => {
    setTimeSlots(prev => prev.map(slot => {
      if (slot.id === slotId) {
        const isDayInOtherSlots = timeSlots.some(
          otherSlot => otherSlot.id !== slotId &&
            otherSlot.selectedDays.includes(day) &&
            otherSlot.openTime === slot.openTime
        );

        if (isDayInOtherSlots) {
          alert("This day and time combination already exists!");
          return slot;
        }

        return {
          ...slot,
          selectedDays: slot.selectedDays.includes(day)
            ? slot.selectedDays.filter(d => d !== day)
            : [...slot.selectedDays, day]
        };
      }
      return slot;
    }));
  };

  const selectAllDays = (slotId) => {
    setTimeSlots(prev => prev.map(slot => {
      if (slot.id === slotId) {
        return {
          ...slot,
          selectedDays: slot.selectedDays.length === 7 ? [] : [...days]
        };
      }
      return slot;
    }));
  };

  const handleTimeChange = (slotId, type, value) => {
    // Check for time conflicts before updating
    const checkTimeConflict = (currentSlot, newTime, timeType) => {
      const getMinutes = (time) => {
        if (!time) return 0;
        const [hours, minutes] = time.split(':');
        const isPM = time.includes('PM');
        let hour = parseInt(hours);
        if (isPM && hour !== 12) hour += 12;
        if (!isPM && hour === 12) hour = 0;
        return hour * 60 + parseInt(minutes || 0);
      };

      return timeSlots.some(otherSlot => {
        if (otherSlot.id !== currentSlot.id) {
          const hasCommonDays = currentSlot.selectedDays.some(day =>
            otherSlot.selectedDays.includes(day)
          );

          if (hasCommonDays) {
            const currentStart = timeType === 'openTime' ? getMinutes(newTime) : getMinutes(currentSlot.openTime);
            const currentEnd = timeType === 'closeTime' ? getMinutes(newTime) : getMinutes(currentSlot.closeTime);
            const otherStart = getMinutes(otherSlot.openTime);
            const otherEnd = getMinutes(otherSlot.closeTime);

            if (currentStart && currentEnd && otherStart && otherEnd) {
              return (currentStart < otherEnd && currentEnd > otherStart);
            }
          }
        }
        return false;
      });
    };

    setTimeSlots(prev => prev.map(slot => {
      if (slot.id === slotId) {
        const updatedSlot = { ...slot, [type]: value };

        if (checkTimeConflict(slot, value, type)) {
          alert("Time conflict! This time overlaps with existing slots for selected days.");
          return slot; // Return original slot if there's a conflict
        }

        return updatedSlot;
      }
      return slot;
    }));
  };

  const addTimeSlot = () => {
    setTimeSlots(prev => [...prev, {
      id: Date.now(),
      selectedDays: [],
      openTime: "",
      closeTime: ""
    }]);
  };

  const removeTimeSlot = (slotId) => {
    setTimeSlots(prev => prev.filter(slot => slot.id !== slotId));
  };

  const handleSave = () => {
    const formattedData = timeSlots.map(slot => ({
      days: slot.selectedDays,
      openTime: slot.openTime,
      closeTime: slot.closeTime
    }));
    console.log('Saved Time Slots:', formattedData);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-10 py-8">
      <div className="flex justify-center"></div>

      <div>
        <h1 className="font-bold text-2xl mt-2">Add Business Timings</h1>
        <p className="text-md mt-2 text-gray-600">
          Let your customers know when you are open for business
        </p>

        {timeSlots.map((slot, index) => (
          <div key={slot.id} className="mt-6 p-4 border rounded-lg relative">
            {index > 0 && (
              <button
                onClick={() => removeTimeSlot(slot.id)}
                className="absolute right-2 top-2 text-gray-500 hover:text-red-500"
              >
                <IoClose size={20} />
              </button>
            )}

            <div className="mt-2">
              <h2 className="text-lg font-medium mb-2">Select Days of the Week</h2>
              <div className="flex flex-wrap gap-2">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(slot.id, day)}
                    className={`px-2 py-2 w-fit rounded-full border text-sm ${slot.selectedDays.includes(day)
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
                  checked={slot.selectedDays.length === 7}
                  onChange={() => selectAllDays(slot.id)}
                />
                Select All Days
              </label>
            </div>

            <div className="flex gap-4 mt-6">
              <div className="relative w-full mt-4">
                <select
                  id={`openTime-${slot.id}`}
                  value={slot.openTime}
                  onChange={(e) => handleTimeChange(slot.id, 'openTime', e.target.value)}
                  required
                  className={`peer w-full h-[48px] px-2.5 pt-4 pb-1 text-sm text-gray-900 bg-white border appearance-none rounded-md focus:outline-none focus:ring-0
                    ${slot.openTime ? "border-blue-600" : "border-gray-300"} 
                    focus:border-blue-600`}
                >
                  <option value="" disabled hidden></option>
                  {openTimeOptions.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                <label
                  htmlFor={`openTime-${slot.id}`}
                  className={`absolute left-2.5 bg-white px-1 transition-all duration-200 ease-in-out
                    text-sm text-gray-500 
                    ${slot.openTime ? '-top-2 text-xs text-blue-600' : 'top-3'}
                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600`}
                >
                  Open at
                </label>
              </div>

              <div className="relative w-full">
                <label className="block mb-1 text-sm text-gray-600">Close at</label>
                <select
                  value={slot.closeTime}
                  onChange={(e) => handleTimeChange(slot.id, 'closeTime', e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  {closeTimeOptions.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-3 top-9 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addTimeSlot}
          className="mt-4 text-sm text-blue-600 hover:underline"
        >
          + Add Another Time Slot
        </button>

        <div className="mt-6">
          <button
            onClick={handleSave}
            className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
          >
            Save and Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessTiming;
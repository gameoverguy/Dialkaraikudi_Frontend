import React from 'react';
import { MdAccessTime } from 'react-icons/md';

const BusinessHours = ({ formData }) => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  // Get current day in Indian timezone
  const getCurrentIndianDay = () => {
    const indiaTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const indiaDate = new Date(indiaTime);
    let dayIndex = indiaDate.getDay() - 1; // Convert Sunday(0) to Monday(0)
    if (dayIndex < 0) dayIndex = 6; // If Sunday, set to last index
    return days[dayIndex];
  };

  const today = getCurrentIndianDay();
  
  const formatTime = (time) => {
    if (!time) return '';
    try {
      const [hours, minutes] = time.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      return time;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center gap-2 mb-4">
        <MdAccessTime className="text-xl text-gray-600" />
        <h2 className="text-lg font-semibold">Business Hours</h2>
      </div>
      
      <div className="space-y-2">
        {days.map((day) => {
          const timing = formData?.business?.businessTimings?.[day];
          const isToday = day === today;
          
          return (
            <div 
              key={day}
              className={`flex items-center justify-between p-2 rounded ${isToday ? 'bg-blue-50' : ''}`}
            >
              <div className="flex items-center gap-4">
                <span className="capitalize w-24 font-medium">{day}</span>
                {timing?.isOpen ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {formatTime(timing.openTime)} - {formatTime(timing.closeTime)}
                    </span>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
                      Open
                    </span>
                  </div>
                ) : (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800">
                    Closed
                  </span>
                )}
              </div>
              {isToday && (
                <span className="text-xs text-blue-600 font-medium">Today</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BusinessHours;
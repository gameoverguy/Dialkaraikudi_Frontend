import React from 'react';
import { MdAccessTime } from 'react-icons/md';

const BusinessHours = ({ formData }) => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const today = days[new Date().getDay()];

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
                      {timing.openTime} - {timing.closeTime}
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
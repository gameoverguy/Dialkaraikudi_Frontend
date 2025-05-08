import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import CustomModal from '../../../../Components/modal';
import FloatingInput from '../../../../Components/FloatingInput';

const BusinessHours = ({ business, onEdit, fetchBusinessDetails, onSubmit }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  useEffect(() => {
    // Initialize form data with existing business timings
    if (business?.business?.businessTimings) {
      setFormData(business.business.businessTimings);
    }
  }, [business]);

  const convertTo12Hour = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    let period = 'AM';
    let hour = parseInt(hours);

    if (hour >= 12) {
      period = 'PM';
      if (hour > 12) hour -= 12;
    }
    if (hour === 0) hour = 12;

    return `${hour}:${minutes} ${period}`;
  };

  const handleChange = (day, field, value) => {
    if (field === 'openTime' || field === 'closeTime') {
      const time12Hour = convertTo12Hour(value);
      setFormData(prev => ({
        ...prev,
        [day]: {
          ...prev[day],
          [field]: time12Hour
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [day]: {
          ...prev[day],
          [field]: value,
          openTime: value ? prev[day]?.openTime || '10:00 AM' : '',
          closeTime: value ? prev[day]?.closeTime || '8:00 PM' : ''
        }
      }));
    }
  };

  const convertTo24Hour = (time12h) => {
    if (!time12h) return '';
    const [timeStr, period] = time12h.split(' ');
    let [hours, minutes] = timeStr.split(':');
    hours = parseInt(hours);

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        businessTimings: formData
      };
      await onSubmit(updatedData);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating business hours:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Business Hours</h2>
        <button
          onClick={() => setShowModal(true)}
          className="text-blue-600 hover:text-blue-700 cursor-pointer"
        >
          <FaEdit className="text-xl" />
        </button>
      </div>

      <div className="space-y-2">
        {days.map((day) => {
          const timing = business?.business?.businessTimings?.[day];
          return (
            <div key={day} className="flex justify-between items-center py-2 border-b">
              <span className="capitalize font-medium">{day}</span>
              <span className="text-gray-600">
                {timing?.isOpen ? (
                  `${timing.openTime} - ${timing.closeTime}`
                ) : (
                  <span className="text-red-500">Closed</span>
                )}
              </span>
            </div>
          );
        })}
      </div>

      <CustomModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Edit Business Hours"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='grid grid-cols-2 xl:grid-cols-3 gap-7'>
            {days.map((day) => (
              <div key={day} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="capitalize font-medium">{day}</span>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`isOpen-${day}`}
                      checked={formData[day]?.isOpen}
                      onChange={(e) => handleChange(day, 'isOpen', e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`isOpen-${day}`}>Open</label>
                  </div>
                </div>
                
                {formData[day]?.isOpen && (
                  <div className="flex flex-col gap-4">
                    <FloatingInput
                      type="time"
                      id={`openTime-${day}`}
                      value={convertTo24Hour(formData[day]?.openTime)}
                      onChange={(e) => handleChange(day, 'openTime', e.target.value)}
                      placeholder="Opening Time"
                    />
                    <FloatingInput
                      type="time"
                      id={`closeTime-${day}`}
                      value={convertTo24Hour(formData[day]?.closeTime)}
                      onChange={(e) => handleChange(day, 'closeTime', e.target.value)}
                      placeholder="Closing Time"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default BusinessHours;
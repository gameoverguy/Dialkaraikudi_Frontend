import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import CustomModal from "../../../../Components/modal";
import FloatingInput from "../../../../Components/FloatingInput";

const BusinessHours = ({
  business,
  onEdit,
  fetchBusinessDetails,
  onSubmit,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({});

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  useEffect(() => {
    if (showModal && business?.business?.businessTimings) {
      const initialData = {};
      days.forEach((day) => {
        const timing = business.business.businessTimings[day] || {};
        initialData[day] = {
          isOpen: timing.isOpen || false,
          openTime: timing.openTime || "",
          closeTime: timing.closeTime || "",
        };
      });
      setFormData(initialData);
    }
  }, [showModal]);

  const handleChange = (day, field, value) => {
    setFormData((prev) => {
      const updatedDay = {
        ...prev[day],
        [field]: value,
      };

      // Handle checkbox change
      if (field === "isOpen") {
        if (!value) {
          updatedDay.openTime = "";
          updatedDay.closeTime = "";
        } else if (!updatedDay.openTime && !updatedDay.closeTime) {
          updatedDay.openTime = "09:00";
          updatedDay.closeTime = "17:00";
        }
      }

      return {
        ...prev,
        [day]: updatedDay,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSubmit({ businessTimings: formData });
      setShowModal(false);
    } catch (error) {
      console.error("Error updating business hours:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const formatTimeForDisplay = (time) => {
    if (!time) return "";
    try {
      const [hours, minutes] = time.split(":");
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      return time;
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
            <div
              key={day}
              className="flex justify-between items-center py-2 border-b"
            >
              <span className="capitalize font-medium">{day}</span>
              <span className="text-gray-600">
                {timing?.isOpen ? (
                  `${formatTimeForDisplay(
                    timing.openTime
                  )} - ${formatTimeForDisplay(timing.closeTime)}`
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
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-7">
            {days.map((day) => (
              <div key={day} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="capitalize font-medium">{day}</span>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`isOpen-${day}`}
                      checked={formData[day]?.isOpen || false}
                      onChange={(e) =>
                        handleChange(day, "isOpen", e.target.checked)
                      }
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
                      value={formData[day]?.openTime || ""}
                      onChange={(e) =>
                        handleChange(day, "openTime", e.target.value)
                      }
                      placeholder="Opening Time"
                    />
                    <FloatingInput
                      type="time"
                      id={`closeTime-${day}`}
                      value={formData[day]?.closeTime || ""}
                      onChange={(e) =>
                        handleChange(day, "closeTime", e.target.value)
                      }
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
              disabled={isSaving}
              className="cursor-pointer px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default BusinessHours;

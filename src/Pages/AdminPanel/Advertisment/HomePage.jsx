import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomModal from "../../../Components/modal";
import FloatingInput from "../../../Components/FloatingInput";
import FloatingTextarea from "../../../Components/FloatingInput/FloatingTextarea";
import { API } from "../../../../config/config";
import { useNavigate } from "react-router-dom";
import SlotAds from "./SlotAds";

const HomePage = () => {
  const [adSlots, setAdSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    adDurationInDays: "",
    slotType: "Image",
    maxAds: "",
    page: "home",
    interval: 5000
  });

  useEffect(() => {
    const fetchAdSlots = async () => {
      try {
        const response = await axios.get(
          `${API}/advertslots`
        );
        console.log(response.data);        
        setAdSlots(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ad slots:", error);
        setLoading(false);
      }
    };

    fetchAdSlots();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API}/advertslots`,
        formData
      );
      setAdSlots([...adSlots, response.data]);
      setShowModal(false);
      setFormData({
        name: "",
        description: "",
        adDurationInDays: "",
        slotType: "",
        maxAds: ""
      });
    } catch (error) {
      console.error("Error creating slot:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const navigate = useNavigate();

  const handleManageAds = (slotId) => {
    const slot = adSlots.find(slot => slot._id === slotId);
    setSelectedSlot(slot);
  };

  if (selectedSlot) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Managing Slot: {selectedSlot.name}</h1>
          <button
            onClick={() => setSelectedSlot(null)}
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <span>←</span> Back to Slots
          </button>
        </div>
        <SlotAds slotId={selectedSlot._id} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Info Section */}
      <div className="shadow bg-white p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Advertisement Management</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Add New Slot
          </button>
        </div>
        <div className="space-y-4 text-gray-600">
          <p>
            Welcome to the Advertisement Management dashboard. Here you can
            manage and monitor all advertisement slots across the platform.
          </p>
          <div className="bg-emerald-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-emerald-700 mb-2">
              Key Features:
            </h2>
            <ul className="list-disc list-inside space-y-2 text-emerald-600">
              <li>View all available advertisement slots</li>
              <li>Monitor slot status and configurations</li>
              <li>Track advertisement durations and intervals</li>
              <li>Manage maximum ad limits per slot</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Slots Section */}
      <div className="shadow bg-white p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Available Slots</h2>
          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
            {adSlots.length} Total Slots
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {adSlots.map((slot) => (
              <div
                key={slot._id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 relative group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-base font-semibold text-gray-800 truncate">
                      {slot.name}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                      {slot.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleManageAds(slot._id)}
                    className="bg-emerald-100 text-emerald-600 px-3 py-1.5 rounded-lg hover:bg-emerald-200 transition-all duration-300 flex items-center gap-2 font-medium text-sm"
                  >
                    Manage Ads
                    <span className="transform transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>
                <div className="mt-2 flex gap-2 text-xs">
                  <span className="bg-gray-50 px-2 py-1 rounded flex-1 text-center">
                    <span className="text-emerald-700 block">Duration</span>
                    <span className="text-gray-600">
                      {slot.adDurationInDays}d
                    </span>
                  </span>
                  <span className="bg-gray-50 px-2 py-1 rounded flex-1 text-center">
                    <span className="text-emerald-700 block">Type</span>
                    <span className="text-gray-600">{slot.slotType}</span>
                  </span>
                  <span className="bg-gray-50 px-2 py-1 rounded flex-1 text-center">
                    <span className="text-emerald-700 block">Max</span>
                    <span className="text-gray-600">{slot.maxAds}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Slot Modal */}
      <CustomModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add New Advertisement Slot"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FloatingInput
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Slot Name"
            required
          />
          <FloatingTextarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Slot Description"
            required
          />
          <FloatingInput
            type="number"
            name="adDurationInDays"
            value={formData.adDurationInDays}
            onChange={handleChange}
            placeholder="Duration (in days)"
            required
          />

          {/* Slot Type Radio Buttons */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Slot Type</label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="slotType"
                  value="Image"
                  checked={formData.slotType === "Image"}
                  onChange={handleChange}
                  className="form-radio text-emerald-500 focus:ring-emerald-500"
                />
                <span className="ml-2">Image</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="slotType"
                  value="Video"
                  checked={formData.slotType === "Video"}
                  onChange={handleChange}
                  className="form-radio text-emerald-500 focus:ring-emerald-500"
                />
                <span className="ml-2">Video</span>
              </label>
            </div>
          </div>

          {/* Page Radio Buttons */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Page</label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="page"
                  value="home"
                  checked={formData.page === "home"}
                  onChange={handleChange}
                  className="form-radio text-emerald-500 focus:ring-emerald-500"
                />
                <span className="ml-2">Home</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="page"
                  value="businesslisting"
                  checked={formData.page === "businesslisting"}
                  onChange={handleChange}
                  className="form-radio text-emerald-500 focus:ring-emerald-500"
                />
                <span className="ml-2">Business List</span>
              </label>
            </div>
          </div>

          <FloatingInput
            type="number"
            name="maxAds"
            value={formData.maxAds}
            onChange={handleChange}
            placeholder="Maximum Ads"
            required
          />

          <FloatingInput
            type="number"
            name="interval"
            value={formData.interval}
            onChange={handleChange}
            placeholder="Interval (in milliseconds)"
            required
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-emerald-500 rounded-lg hover:bg-emerald-600"
            >
              Create Slot
            </button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default HomePage;

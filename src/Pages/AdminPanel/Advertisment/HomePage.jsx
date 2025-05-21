import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
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
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    adDurationInDays: "",
    slotType: "",
    maxAds: "",
    page: "",
    interval: "",
    isActive: true,
    price: "",
  });

  useEffect(() => {
    const fetchAdSlots = async () => {
      try {
        const response = await axios.get(`${API}/advertslots`);
        console.log(response.data);
        setAdSlots(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ad slots:", error);
        setLoading(false);
        toast.error("Failed to fetch advertisement slots");
      }
    };

    fetchAdSlots();
  }, []);

  const handleEdit = (slot) => {
    setIsEditing(true);
    setErrors({
      name: "",
      description: "",
      adDurationInDays: "",
      maxAds: "",
      interval: "",
    });
    setFormData({
      name: slot.name,
      description: slot.description,
      adDurationInDays: slot.adDurationInDays,
      slotType: slot.slotType,
      maxAds: slot.maxAds,
      page: slot.page,
      interval: slot.interval,
      isActive: slot.isActive,
      price: slot.price,
    });
    setShowModal(true);
    setSelectedSlot(slot);
  };

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    adDurationInDays: "",
    maxAds: "",
    interval: "",
    price: "",
  });

  const validateForm = () => {
    let tempErrors = {
      name: "",
      description: "",
      adDurationInDays: "",
      maxAds: "",
      interval: "",
      price: "",
    };
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      tempErrors.name = "Slot name is required";
      isValid = false;
    } else if (formData.name.length < 5) {
      tempErrors.name = "Name must be at least 5 characters";
      isValid = false;
    } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.name)) {
      tempErrors.name = "Name can only contain letters, numbers and spaces";
      isValid = false;
    }

    // Description validation
    if (!formData.description.trim()) {
      tempErrors.description = "Description is required";
      isValid = false;
    } else if (
      formData.description.length < 25 ||
      formData.description.length > 50
    ) {
      tempErrors.description =
        "Description must be between 25 and 50 characters";
      isValid = false;
    }

    // Duration validation
    if (!formData.adDurationInDays) {
      tempErrors.adDurationInDays = "Duration is required";
      isValid = false;
    } else if (formData.adDurationInDays <= 0) {
      tempErrors.adDurationInDays = "Duration must be greater than 0";
      isValid = false;
    } else if (formData.adDurationInDays > 30) {
      tempErrors.adDurationInDays = "Duration cannot exceed 30 days";
      isValid = false;
    }

    // Max Ads validation
    if (!formData.maxAds) {
      tempErrors.maxAds = "Maximum ads is required";
      isValid = false;
    } else if (formData.maxAds < 1) {
      tempErrors.maxAds = "Maximum ads must be at least 1";
      isValid = false;
    }

    // Interval validation
    if (!formData.interval) {
      tempErrors.interval = "Interval is required";
      isValid = false;
    } else if (formData.interval < 1000) {
      tempErrors.interval = "Interval must be at least 1000ms";
      isValid = false;
    }
    // Slot Type validation
    if (!formData.slotType) {
      tempErrors.slotType = "Please select a slot type";
      isValid = false;
    }

    // Page validation
    if (!formData.page) {
      tempErrors.page = "Please select a page";
      isValid = false;
    }

    if (!formData.price) {
      tempErrors.price = "Price is required";
      isValid = false;
    } else if (formData.price <= 0) {
      tempErrors.price = "Price must be greater than 0";
      isValid = false;
    }
    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      if (isEditing && selectedSlot) {
        const response = await axios.put(
          `${API}/advertslots/${selectedSlot._id}`,
          formData
        );
        setAdSlots(
          adSlots.map((slot) =>
            slot._id === selectedSlot._id ? response.data : slot
          )
        );
        setIsEditing(false);
        toast.success("Advertisement slot updated successfully!");
      } else {
        const response = await axios.post(`${API}/advertslots`, formData);
        setAdSlots([...adSlots, response.data]);
        toast.success("New advertisement slot created successfully!");
      }
      setShowModal(false);
      setFormData({
        name: "",
        description: "",
        adDurationInDays: "",
        slotType: "",
        maxAds: "",
        page: "",
        interval: "",
        isActive: true,
        price: "",
      });
      setSelectedSlot(null);
    } catch (error) {
      console.error("Error handling slot:", error);
      toast.error(
        error.response?.data?.message || "Failed to process your request"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      const sanitizedValue = value.replace(/[^a-zA-Z0-9\s]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: sanitizedValue,
      }));
      let error = "";
      if (sanitizedValue.trim().length < 5) {
        error = "Name must be at least 5 characters";
      } else if (sanitizedValue.trim().length > 30) {
        error = "Name cannot exceed 30 characters";
      }
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation
    let error = "";
    switch (name) {
      case "name":
        if (value.trim().length > 30) {
          error = "Name cannot exceed 30 characters";
        } else if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
          error = "Name can only contain letters, numbers and spaces";
        }
        break;

      case "description":
        if (value.trim().length < 25) {
          error = "Description must be at least 25 characters";
        } else if (value.trim().length > 50) {
          error = "Description cannot exceed 50 characters";
        }
        break;

      case "adDurationInDays":
        if (value && Number(value) <= 0) {
          error = "Duration must be greater than 0";
        } else if (value && Number(value) > 30) {
          error = "Duration cannot exceed 30 days";
        }
        break;

      case "maxAds":
        if (value && Number(value) < 1) {
          error = "Maximum ads must be at least 1";
        } else if (value && Number(value) > 30) {
          error = "Maximum ads cannot exceed 30";
        }
        break;

      case "interval":
        if (value && Number(value) < 1000) {
          error = "Interval must be at least 1000ms";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const navigate = useNavigate();

  const handleManageAds = (slotId) => {
    const slot = adSlots.find((slot) => slot._id === slotId);
    setSelectedSlot(slot);
  };

  if (selectedSlot && !isEditing) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">
            Managing Slot: {selectedSlot.name}
          </h1>
          <button
            onClick={() => setSelectedSlot(null)}
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <span>←</span> Back to Slots
          </button>
        </div>
        <SlotAds slotId={selectedSlot._id} type={selectedSlot.slotType} />
      </div>
    );
  }

  return (
    <>
      <div className="p-6 space-y-6">
        {/* Info Section */}
        <div className="shadow bg-white p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Advertisement Management</h1>
            <button
              onClick={() => {
                setShowModal(true);
                setErrors({
                  name: "",
                  description: "",
                  adDurationInDays: "",
                  maxAds: "",
                  interval: "",
                });
                setFormData({
                  name: "",
                  description: "",
                  adDurationInDays: "",
                  slotType: "",
                  maxAds: "",
                  page: "",
                  interval: "",
                  isActive: true,
                });
              }}
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
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(slot);
                        }}
                        className="bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition-all duration-300 flex items-center gap-2"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => handleManageAds(slot._id)}
                        className="bg-emerald-100 text-emerald-600 px-3 py-1.5 rounded-lg hover:bg-emerald-200 transition-all duration-300 flex items-center gap-2 font-medium text-sm"
                      >
                        Manage Ads
                        <span className="transform transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </button>
                    </div>
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

        {/* Add/Edit Slot Modal */}
        <CustomModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setIsEditing(false);
            setSelectedSlot(null);
            setFormData({
              name: "",
              description: "",
              adDurationInDays: "",
              slotType: "",
              maxAds: "",
              page: "",
              interval: "",
              isActive: true,
              price: "",
            });
          }}
          title={isEditing ? "Edit Advertisement" : "Add New Slot "}
          classname="w-[25%]"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <FloatingInput
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Slot Name"
              error={errors.name}
              maxLength={30}
            />
            <div className="mb-3">
              <FloatingTextarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Slot Description"
                error={errors.description}
                maxLength={50}
              />
            </div>
            <FloatingInput
              type="number"
              name="adDurationInDays"
              value={formData.adDurationInDays}
              onChange={handleChange}
              placeholder="Duration (in days)"
              error={errors.adDurationInDays}
              maxLength={30}
            />

            {/* Slot Type Radio Buttons */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Slot Type
              </label>
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
              <div className="h-2">
                {errors.slotType && (
                  <p className="text-red-500 text-[12px] text-right text-sm mt-1">
                    {errors.slotType}
                  </p>
                )}
              </div>
            </div>

            {/* Page Radio Buttons */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Page
              </label>
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
              <div className="h-2">
                {errors.page && (
                  <p className="text-red-500 text-right text-[12px] text-sm mt-1">
                    {errors.page}
                  </p>
                )}
              </div>
            </div>

            <FloatingInput
              type="number"
              name="maxAds"
              value={formData.maxAds}
              onChange={handleChange}
              placeholder="Maximum Ads"
              error={errors.maxAds}
              maxLength={30}
            />

            <FloatingInput
              type="number"
              name="interval"
              value={formData.interval}
              onChange={handleChange}
              placeholder="Interval (in milliseconds)"
              error={errors.interval}
            />

            <FloatingInput
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              error={errors.price}
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
                {isEditing ? "Update Slot" : "Create Slot"}
              </button>
            </div>
          </form>
        </CustomModal>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default HomePage;

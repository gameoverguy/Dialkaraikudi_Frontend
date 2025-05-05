import React, { useEffect, useState } from "react";
import axios from "axios";
import { uploadMultipleToCloudinary } from "../../../utils/cloudinaryUpload";
import { API } from "../../../../config/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadForm from "./components/UploadForm";
import ExistingAds from "./components/ExistingAds";

const AdManager = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [slots, setSlots] = useState([]);
  const [activeTab, setActiveTab] = useState("upload");
  const [newSlot, setNewSlot] = useState({
    heading: "",
    type: 1,
    interval: 5,
    mediaItems: [],
    htmlContent: "",
  });
  const [editingSlot, setEditingSlot] = useState(null);
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    const res = await axios.get(`${API}/ads/pages`);
    setPages(res.data.pages);
    setSelectedPage(res.data.pages[0] || "");
  };

  useEffect(() => {
    if (selectedPage) fetchSlots(selectedPage);
  }, [selectedPage]);

  const fetchSlots = async (page) => {
    const res = await axios.get(`${API}/ads/${page}`);
    setSlots(res.data.slots);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newSlot.heading.trim()) newErrors.heading = "Heading is required";
    if (!newSlot.type) newErrors.type = "Type is required";
    if (
      (newSlot.type === 2 || newSlot.type === 3) &&
      (!newSlot.interval || newSlot.interval < 1)
    ) {
      newErrors.interval = "Valid interval is required for carousel/video";
    }
    if (
      newSlot.type === 1 &&
      !newSlot.htmlContent &&
      newSlot.mediaItems.length === 0
    ) {
      newErrors.media = "Either HTML content or media is required";
    }
    if (
      (newSlot.type === 2 || newSlot.type === 3) &&
      newSlot.mediaItems.length === 0
    ) {
      newErrors.media = "Media is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddSlot = async () => {
    if (!validateForm()) return;

    try {
      const urls = await uploadMultipleToCloudinary(newSlot.mediaItems);
      const payload = {
        heading: newSlot.heading,
        type: newSlot.type,
        interval: newSlot.interval,
        mediaItems: urls.map((url) => ({
          url,
          type: newSlot.type === 3 ? "video" : "image",
          enabled: true,
          priority: 1,
          htmlContent: newSlot.type === 1 ? newSlot.htmlContent : "",
        })),
      };

      if (editingSlot) {
        await axios.put(
          `${API}/ads/${selectedPage}/slot/${editingSlot._id}`,
          payload
        );
        toast.success("Slot updated successfully");
      } else {
        await axios.post(`${API}/ads/${selectedPage}/slot`, payload);
        toast.success("Slot added successfully");
      }

      setNewSlot({
        heading: "",
        type: 1,
        interval: 5,
        mediaItems: [],
        htmlContent: "",
      });
      setEditingSlot(null);
      fetchSlots(selectedPage);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to process slot");
    }
  };

  const handleMediaToggle = async (slotId, mediaIndex, enabled) => {
    await axios.patch(
      `${API}/ads/${selectedPage}/slot/${slotId}/media/${mediaIndex}`,
      { enabled }
    );
    fetchSlots(selectedPage);
  };

  const handleDeleteMedia = async (slotId, mediaIndex) => {
    await axios.delete(
      `${API}/ads/${selectedPage}/slot/${slotId}/media/${mediaIndex}`
    );
    fetchSlots(selectedPage);
  };

  const handleDeleteSlot = async (slotId) => {
    if (window.confirm("Are you sure you want to delete this advertisement?")) {
      try {
        await axios.delete(`${API}/ads/${selectedPage}/slot/${slotId}`);
        toast.success("Advertisement deleted successfully");
        fetchSlots(selectedPage);
      } catch (error) {
        toast.error("Failed to delete advertisement");
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Advertisement Manager</h1>
        <p className="text-gray-600 mb-4">
          Manage your advertisements across different pages with our intuitive
          interface.
        </p>

        <div className="flex items-center space-x-4 mb-6">
          <label className="text-gray-700 font-medium">Select Page:</label>
          <select
            className="border border-gray-300 rounded-md p-2 flex-grow max-w-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
          >
            {pages.map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </div>

        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`${
                activeTab === "upload"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab("upload")}
            >
              Upload New
            </button>
            <button
              className={`${
                activeTab === "existing"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab("existing")}
            >
              Existing Ads
            </button>
          </nav>
        </div>
      </div>

      {activeTab === "upload" && (
        <UploadForm
          newSlot={newSlot}
          setNewSlot={setNewSlot}
          handleAddSlot={handleAddSlot}
          errors={errors}
          dragActive={dragActive}
          setDragActive={setDragActive}
          editingSlot={editingSlot}
        />
      )}

      {activeTab === "existing" && (
        <ExistingAds
          slots={slots}
          handleMediaToggle={handleMediaToggle}
          handleDeleteMedia={handleDeleteMedia}
          setEditingSlot={setEditingSlot}
          setActiveTab={setActiveTab}
          setNewSlot={setNewSlot}
          handleDeleteSlot={handleDeleteSlot}
        />
      )}
    </div>
  );
};

export default AdManager;

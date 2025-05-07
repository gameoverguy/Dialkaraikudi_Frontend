import React, { useEffect, useState } from "react";
import axios from "axios";
import { uploadMultipleToCloudinary } from "../../../utils/cloudinaryUpload";
import { API } from "../../../../config/config";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdManager = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [slots, setSlots] = useState([]);
  const [activeTab, setActiveTab] = useState('upload');
  const [newSlot, setNewSlot] = useState({
    heading: "",
    type: 1,
    interval: 5,
    mediaItems: [],
    htmlContent: ""
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
    if ((newSlot.type === 2 || newSlot.type === 3) && (!newSlot.interval || newSlot.interval < 1)) {
      newErrors.interval = "Valid interval is required for carousel/video";
    }
    if (newSlot.type === 1 && !newSlot.htmlContent && newSlot.mediaItems.length === 0) {
      newErrors.media = "Either HTML content or media is required";
    }
    if ((newSlot.type === 2 || newSlot.type === 3) && newSlot.mediaItems.length === 0) {
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
        await axios.put(`${API}/ads/${selectedPage}/slot/${editingSlot._id}`, payload);
        toast.success("Slot updated successfully");
      } else {
        await axios.post(`${API}/ads/${selectedPage}/slot`, payload);
        toast.success("Slot added successfully");
      }

      setNewSlot({ heading: "", type: 1, interval: 5, mediaItems: [], htmlContent: "" });
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

  const renderMedia = (media, index, slotId) => {
    return (
      <div key={index} className="relative w-24 h-24 border p-1">
        {media.type === "video" ? (
          <video
            src={media.url}
            className="w-full h-full object-cover"
            controls
          />
        ) : (
          <img
            src={media.url}
            alt="ad"
            className="w-full h-full object-contain"
          />
        )}
        <div className="flex justify-between mt-1 text-xs">
          <label>
            <input
              type="checkbox"
              checked={media.enabled}
              onChange={() => handleMediaToggle(slotId, index, !media.enabled)}
            />
            Enable
          </label>
          <button
            className="text-red-500"
            onClick={() => handleDeleteMedia(slotId, index)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Advertisement Manager</h1>
        <p className="text-gray-600 mb-4">Manage your advertisements across different pages with our intuitive interface.</p>

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
              className={`${activeTab === 'upload' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('upload')}
            >
              Upload New
            </button>
            <button
              className={`${activeTab === 'existing' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('existing')}
            >
              Existing Ads
            </button>
          </nav>
        </div>

      </div>
      {activeTab === 'upload' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Advertisement</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Advertisement Title</label>
              <input
                type="text"
                placeholder="Enter a descriptive title"
                value={newSlot.heading}
                onChange={(e) => setNewSlot({ ...newSlot, heading: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Advertisement Type</label>
              <select
                value={newSlot.type}
                onChange={(e) => setNewSlot({ ...newSlot, type: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value={1}>Single Image / HTML</option>
                <option value={2}>Image Carousel</option>
                <option value={3}>Video / GIF</option>
              </select>
            </div>

            {newSlot.type === 1 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">HTML Content (Optional)</label>
                <textarea
                  placeholder="Enter custom HTML content"
                  value={newSlot.htmlContent}
                  onChange={(e) => setNewSlot({ ...newSlot, htmlContent: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none h-32 resize-none"
                />
              </div>
            )}

            {(newSlot.type === 2 || newSlot.type === 3) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Interval (seconds)</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={newSlot.interval}
                  onChange={(e) => setNewSlot({ ...newSlot, interval: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {newSlot.type === 1 ? 'Upload Image' : newSlot.type === 2 ? 'Upload Images' : 'Upload Video'}
              </label>
              <div
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${dragActive ? 'border-blue-500 bg-blue-50' : ''}`}
                onDragEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(false);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(false);
                  const files = Array.from(e.dataTransfer.files);
                  setNewSlot({ ...newSlot, mediaItems: files });
                }}
              >
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload files</span>
                      <input
                        type="file"
                        multiple={newSlot.type === 2}
                        accept={newSlot.type === 3 ? "video/*" : "image/*"}
                        onChange={(e) => setNewSlot({ ...newSlot, mediaItems: Array.from(e.target.files) })}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {newSlot.type === 3 ? 'MP4, WebM up to 10MB' : 'PNG, JPG, GIF up to 5MB'}
                  </p>
                </div>
              </div>
              {newSlot.mediaItems.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">{newSlot.mediaItems.length} file(s) selected</p>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(newSlot.mediaItems).map((file, index) => (
                      <div key={index} className="text-sm text-gray-500">{file.name}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-end space-x-3">
              {editingSlot && (
                <button
                  onClick={() => {
                    setEditingSlot(null);
                    setNewSlot({ heading: "", type: 1, interval: 5, mediaItems: [], htmlContent: "" });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleAddSlot}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {editingSlot ? "Update Advertisement" : "Add Advertisement"}
              </button>
            </div>
            {Object.keys(errors).length > 0 && (
              <div className="text-red-500 mb-4">
                {Object.values(errors).map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      {activeTab === 'existing' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Existing Advertisements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {slots.map((slot) => (
              <div key={slot._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{slot.heading}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        {slot.type === 1 ? "Single" : slot.type === 2 ? "Carousel" : "Video"}
                      </span>
                      {slot.type !== 1 && (
                        <span className="inline-flex items-center">
                          {slot.interval}s interval
                        </span>
                      )}
                    </div>
                  </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingSlot(slot);
                      setActiveTab('upload');
                      setNewSlot({
                        heading: slot.heading,
                        type: slot.type,
                        interval: slot.interval,
                        mediaItems: [],
                        htmlContent: slot.mediaItems[0]?.htmlContent || "",
                      });
                    }}
                    className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                    title="Edit Advertisement"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={async () => {
                      if (window.confirm("Are you sure you want to delete this advertisement?")) {
                        try {
                          await axios.delete(`${API}/ads/${selectedPage}/slot/${slot._id}`);
                          toast.success("Advertisement deleted successfully");
                          fetchSlots(selectedPage);
                        } catch (error) {
                          toast.error("Failed to delete advertisement");
                        }
                      }
                    }}
                    className="p-2 text-red-600 hover:text-red-800 transition-colors"
                    title="Delete Advertisement"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {slot.mediaItems?.map((media, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
                        {media.type === "video" ? (
                          <video
                            src={media.url}
                            className="w-full h-full object-cover"
                            controls
                          />
                        ) : (
                          <img
                            src={media.url}
                            alt={`Ad ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-2">
                          <label className="cursor-pointer bg-white rounded-full p-2 shadow-sm hover:bg-gray-100 transition-colors">
                            <input
                              type="checkbox"
                              checked={media.enabled}
                              onChange={() => handleMediaToggle(slot._id, index, !media.enabled)}
                              className="sr-only"
                            />
                            <span className={`block w-6 h-6 rounded-full ${media.enabled ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                          </label>
                          <button
                            onClick={() => handleDeleteMedia(slot._id, index)}
                            className="bg-white rounded-full p-2 text-red-500 shadow-sm hover:bg-gray-100 transition-colors"
                            title="Delete Media"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      {activeTab === 'existing' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Existing Advertisements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {slots.map((slot) => (
              <div key={slot._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{slot.heading}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        {slot.type === 1 ? "Single" : slot.type === 2 ? "Carousel" : "Video"}
                      </span>
                      {slot.type !== 1 && (
                        <span className="inline-flex items-center">
                          {slot.interval}s interval
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingSlot(slot);
                        setActiveTab('upload');
                        setNewSlot({
                          heading: slot.heading,
                          type: slot.type,
                          interval: slot.interval,
                          mediaItems: [],
                          htmlContent: slot.mediaItems[0]?.htmlContent || "",
                        });
                      }}
                      className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                      title="Edit Advertisement"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={async () => {
                        if (window.confirm("Are you sure you want to delete this advertisement?")) {
                          try {
                            await axios.delete(`${API}/ads/${selectedPage}/slot/${slot._id}`);
                            toast.success("Advertisement deleted successfully");
                            fetchSlots(selectedPage);
                          } catch (error) {
                            toast.error("Failed to delete advertisement");
                          }
                        }
                      }}
                      className="p-2 text-red-600 hover:text-red-800 transition-colors"
                      title="Delete Advertisement"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {slot.mediaItems?.map((media, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
                          {media.type === "video" ? (
                            <video
                              src={media.url}
                              className="w-full h-full object-cover"
                              controls
                            />
                          ) : (
                            <img
                              src={media.url}
                              alt={`Ad ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex space-x-2">
                            <label className="cursor-pointer bg-white rounded-full p-2 shadow-sm hover:bg-gray-100 transition-colors">
                              <input
                                type="checkbox"
                                checked={media.enabled}
                                onChange={() => handleMediaToggle(slot._id, index, !media.enabled)}
                                className="sr-only"
                              />
                              <span className={`block w-6 h-6 rounded-full ${media.enabled ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                            </label>
                            <button
                              onClick={() => handleDeleteMedia(slot._id, index)}
                              className="bg-white rounded-full p-2 text-red-500 shadow-sm hover:bg-gray-100 transition-colors"
                              title="Delete Media"
                            >
                              <FaTrash size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>);
};

export default AdManager;
};

export default AdManager;

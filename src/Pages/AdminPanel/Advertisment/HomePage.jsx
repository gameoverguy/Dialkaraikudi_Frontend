// src/pages/AdManager.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { uploadMultipleToCloudinary } from "../../../utils/cloudinaryUpload";
import { API } from "../../../../config/config";

const AdManager = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({
    heading: "",
    type: "single",
    interval: 5,
    media: [],
  });

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

  const handleAddSlot = async () => {
    const urls = await uploadMultipleToCloudinary(newSlot.media);
    const payload = {
      heading: newSlot.heading,
      type: newSlot.type,
      interval: newSlot.interval,
      media: urls.map((url) => ({
        url,
        type: newSlot.type === "video" ? "video" : "image",
        enabled: true,
        priority: 1,
        html: "",
      })),
    };
    await axios.post(`${API}/ads/${selectedPage}/slot`, payload);
    setNewSlot({ heading: "", type: "single", interval: 5, media: [] });
    fetchSlots(selectedPage);
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
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Advertisement Manager</h1>

      <div className="mb-6">
        <label className="mr-2 font-semibold">Select Page:</label>
        <select
          className="border p-2"
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

      <div className="mb-6 border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Add New Slot</h2>
        <input
          type="text"
          placeholder="Heading"
          value={newSlot.heading}
          onChange={(e) => setNewSlot({ ...newSlot, heading: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <select
          value={newSlot.type}
          onChange={(e) => setNewSlot({ ...newSlot, type: e.target.value })}
          className="border p-2 mb-2 w-full"
        >
          <option value="single">Single Image / HTML</option>
          <option value="carousel">Carousel (Images Only)</option>
          <option value="video">Video / GIF</option>
        </select>

        {(newSlot.type === "carousel" || newSlot.type === "video") && (
          <input
            type="number"
            placeholder="Interval in seconds"
            value={newSlot.interval}
            onChange={(e) =>
              setNewSlot({ ...newSlot, interval: parseInt(e.target.value) })
            }
            className="border p-2 mb-2 w-full"
          />
        )}

        <input
          type="file"
          multiple
          accept={newSlot.type === "video" ? "video/*" : "image/*"}
          onChange={(e) =>
            setNewSlot({ ...newSlot, media: Array.from(e.target.files) })
          }
          className="mb-2"
        />
        <button
          onClick={handleAddSlot}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Slot
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Existing Slots</h2>
        <div className="space-y-4">
          {slots.map((slot) => (
            <div key={slot._id} className="border p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-1">{slot.heading}</h3>
              <p className="text-sm italic">Type: {slot.type}</p>
              {slot.type !== "single" && (
                <p className="text-sm">Interval: {slot.interval} seconds</p>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {slot.mediaItems?.map((media, index) =>
                  renderMedia(media, index, slot._id)
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdManager;

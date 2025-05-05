import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ExistingAds = ({
  slots,
  handleMediaToggle,
  handleDeleteMedia,
  setEditingSlot,
  setActiveTab,
  setNewSlot,
  handleDeleteSlot,
}) => {
  const renderMedia = (media, index, slotId) => {
    return (
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
                onChange={() =>
                  handleMediaToggle(slotId, index, !media.enabled)
                }
                className="sr-only"
              />
              <span
                className={`block w-6 h-6 rounded-full ${
                  media.enabled ? "bg-green-500" : "bg-gray-300"
                }`}
              ></span>
            </label>
            <button
              onClick={() => handleDeleteMedia(slotId, index)}
              className="bg-white rounded-full p-2 text-red-500 shadow-sm hover:bg-gray-100 transition-colors"
              title="Delete Media"
            >
              <FaTrash size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Existing Advertisements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slots.map((slot) => (
          <div
            key={slot._id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {slot.heading}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    {slot.type === 1
                      ? "Single"
                      : slot.type === 2
                      ? "Carousel"
                      : "Video"}
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
                    setActiveTab("upload");
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
                  onClick={() => handleDeleteSlot(slot._id)}
                  className="p-2 text-red-600 hover:text-red-800 transition-colors"
                  title="Delete Advertisement"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
            <div className="mt-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {slot.mediaItems?.map((media, index) =>
                  renderMedia(media, index, slot._id)
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExistingAds;

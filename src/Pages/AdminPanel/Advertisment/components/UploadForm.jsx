import React from "react";
import { toast } from "react-toastify";

const UploadForm = ({
  newSlot,
  setNewSlot,
  handleAddSlot,
  errors,
  dragActive,
  setDragActive,
  editingSlot,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Advertisement</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Advertisement Title
          </label>
          <input
            type="text"
            placeholder="Enter a descriptive title"
            value={newSlot.heading}
            onChange={(e) =>
              setNewSlot({ ...newSlot, heading: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Advertisement Type
          </label>
          <select
            value={newSlot.type}
            onChange={(e) =>
              setNewSlot({ ...newSlot, type: parseInt(e.target.value) })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value={1}>Single Image / HTML</option>
            <option value={2}>Image Carousel</option>
            <option value={3}>Video / GIF</option>
          </select>
        </div>

        {newSlot.type === 1 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              HTML Content (Optional)
            </label>
            <textarea
              placeholder="Enter custom HTML content"
              value={newSlot.htmlContent}
              onChange={(e) =>
                setNewSlot({ ...newSlot, htmlContent: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none h-32 resize-none"
            />
          </div>
        )}

        {(newSlot.type === 2 || newSlot.type === 3) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Interval (seconds)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={newSlot.interval}
              onChange={(e) =>
                setNewSlot({ ...newSlot, interval: parseInt(e.target.value) })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {newSlot.type === 1
              ? "Upload Image"
              : newSlot.type === 2
              ? "Upload Images"
              : "Upload Video"}
          </label>
          <div
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${
              dragActive ? "border-blue-500 bg-blue-50" : ""
            }`}
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
                    onChange={(e) =>
                      setNewSlot({
                        ...newSlot,
                        mediaItems: Array.from(e.target.files),
                      })
                    }
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                {newSlot.type === 3
                  ? "MP4, WebM up to 10MB"
                  : "PNG, JPG, GIF up to 5MB"}
              </p>
            </div>
          </div>
          {newSlot.mediaItems.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">
                {newSlot.mediaItems.length} file(s) selected
              </p>
              <div className="flex flex-wrap gap-2">
                {Array.from(newSlot.mediaItems).map((file, index) => (
                  <div key={index} className="text-sm text-gray-500">
                    {file.name}
                  </div>
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
                setNewSlot({
                  heading: "",
                  type: 1,
                  interval: 5,
                  mediaItems: [],
                  htmlContent: "",
                });
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
  );
};

export default UploadForm;

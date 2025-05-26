import React, { useState, useCallback } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "../../../../utils/cloudinaryUpload";

const BusinessImages = ({ business, onEdit, onSubmit }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const validateImage = (file) => {
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      toast.error(`${file.name} is too large. Max size is 2MB`);
      return false;
    }
    return true;
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFiles = (files) => {
    const validFiles = files.filter(validateImage);
    const totalImages =
      (business?.business?.photos?.length || 0) +
      selectedImages.length +
      validFiles.length;

    if (totalImages > 6) {
      toast.warning("Maximum 6 images allowed");
      return;
    }

    setSelectedImages((prev) => [...prev, ...validFiles]);
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleImageDelete = async (imageUrl, isPreview = false, index = -1) => {
    if (isPreview) {
      setSelectedImages((prev) => prev.filter((_, i) => i !== index));
      setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      try {
        const updatedPhotos = business.business.photos.filter(
          (photo) => photo !== imageUrl
        );
        await onSubmit({ photos: updatedPhotos });
        toast.success("Image deleted successfully");
      } catch (error) {
        toast.error("Failed to delete image");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedImages.length === 0) return;

    try {
      setIsUploading(true);
      const uploadPromises = selectedImages.map((image) =>
        uploadToCloudinary(image)
      );
      const uploadedUrls = await Promise.all(uploadPromises);
      const updatedPhotos = [
        ...(business?.business?.photos || []),
        ...uploadedUrls,
      ];
      await onSubmit({ photos: updatedPhotos });

      setIsEditing(false);
      setSelectedImages([]);
      setPreviewImages([]);
      toast.success("Images uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload images");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Business Images</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-600 hover:text-blue-800"
        >
          <FaEdit size={20} />
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div
            className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50 hover:bg-blue-50"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById('file-input').click()}
          >
            <input
              id="file-input"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={isUploading}
            />
            <div className="space-y-4">
              <div className="flex justify-center">
                <FaPlus className="text-gray-400 text-4xl hover:text-blue-500 transition-colors" />
              </div>
              <div className="text-lg font-medium text-gray-700">
                Drop your images here
              </div>
              <div className="text-sm text-gray-500">
                or <span className="text-blue-500 hover:text-blue-600 font-medium">click to select</span>
              </div>
              <div className="text-xs text-gray-400">
                Maximum 6 images, 2MB each
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {business?.business?.photos?.map((photo, index) => (
              <div key={`existing-${index}`} className="relative group aspect-square">
                <img
                  src={photo}
                  alt={`Business ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(photo)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 shadow-lg"
                >
                  <MdDelete size={16} />
                </button>
              </div>
            ))}
            {previewImages.map((preview, index) => (
              <div key={`preview-${index}`} className="relative group aspect-square">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(null, true, index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 shadow-lg"
                >
                  <MdDelete size={16} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`}
            disabled={isUploading}
          >
            {isUploading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
            ) : 'Upload Images'}
          </button>
        </form>
      ) : (
        <div className="flex flex-row gap-4">
          {business?.business?.photos?.map((photo, index) => (
            <div key={index} className="relative group">
              <img
                src={photo}
                alt={`Business ${index + 1}`}
                className="w-40 h-40 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleImageDelete(photo)}
                className="absolute z-50 -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <MdDelete size={20} />
              </button>
            </div>
          ))}
          {business?.business?.photos?.length < 6 && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <FaPlus className="text-gray-400 text-3xl hover:text-blue-500" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BusinessImages;

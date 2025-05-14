import React, { useState, useCallback } from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { uploadToCloudinary } from '../../../../utils/cloudinaryUpload';

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
    const totalImages = (business?.business?.photos?.length || 0) + selectedImages.length + validFiles.length;
    
    if (totalImages > 6) {
      toast.warning('Maximum 6 images allowed');
      return;
    }

    setSelectedImages(prev => [...prev, ...validFiles]);
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages(prev => [...prev, reader.result]);
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
      setSelectedImages(prev => prev.filter((_, i) => i !== index));
      setPreviewImages(prev => prev.filter((_, i) => i !== index));
    } else {
      try {
        const updatedPhotos = business.business.photos.filter(photo => photo !== imageUrl);
        await onSubmit({ photos: updatedPhotos });
        toast.success('Image deleted successfully');
      } catch (error) {
        toast.error('Failed to delete image');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedImages.length === 0) return;

    try {
      setIsUploading(true);
      const uploadPromises = selectedImages.map(image => uploadToCloudinary(image));
      const uploadedUrls = await Promise.all(uploadPromises);
      const updatedPhotos = [...(business?.business?.photos || []), ...uploadedUrls];
      await onSubmit({ photos: updatedPhotos });
      
      setIsEditing(false);
      setSelectedImages([]);
      setPreviewImages([]);
      toast.success('Images uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload images');
      console.error('Upload error:', error);
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
            className="border-2 border-dashed border-gray-300 p-4 rounded-lg"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
              disabled={isUploading}
            />
            <p className="text-center text-gray-500 mt-2">Drag and drop images here or click to select</p>
          </div>

          <div className="flex flex-row gap-4 flex-wrap">
            {business?.business?.photos?.map((photo, index) => (
              <div key={`existing-${index}`} className="relative group">
                <img
                  src={photo}
                  alt={`Business ${index + 1}`}
                  className="w-40 h-40 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(photo)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <MdDelete size={20} />
                </button>
              </div>
            ))}
            {previewImages.map((preview, index) => (
              <div key={`preview-${index}`} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-40 h-40 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(null, true, index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <MdDelete size={20} />
                </button>
              </div>
            ))}
            {Array.from({ length: 6 - ((business?.business?.photos?.length || 0) + previewImages.length) }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
              >
                <FaPlus className="text-gray-400 text-3xl" />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload Images'}
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
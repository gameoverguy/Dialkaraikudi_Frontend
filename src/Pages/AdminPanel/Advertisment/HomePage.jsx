import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import FloatingInput from '../../../Components/FloatingInput';
import { uploadToCloudinary } from '../../../utils/cloudinaryUpload';

const HomePage = () => {
  const [sections, setSections] = useState([
    { id: 1, heading: '', images: [] }
  ]);

  const handleHeadingChange = (id, value) => {
    setSections(prev => prev.map(section => 
      section.id === id ? { ...section, heading: value } : section
    ));
  };

  const handleImageDrop = async (id, e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    
    try {
      const uploadedUrls = await Promise.all(
        files.map(file => uploadToCloudinary(file))
      );

      setSections(prev => prev.map(section => {
        if (section.id === id) {
          return {
            ...section,
            images: [...section.images, ...uploadedUrls]
          };
        }
        return section;
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const handleImageClick = (id) => {
    document.getElementById(`fileInput-${id}`).click();
  };

  const handleFileChange = async (id, e) => {
    const files = Array.from(e.target.files);
    
    try {
      const uploadedUrls = await Promise.all(
        files.map(file => uploadToCloudinary(file))
      );

      setSections(prev => prev.map(section => {
        if (section.id === id) {
          return {
            ...section,
            images: [...section.images, ...uploadedUrls]
          };
        }
        return section;
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const removeImage = (sectionId, imageIndex) => {
    setSections(prev => prev.map(section => {
      if (section.id === sectionId) {
        const newImages = [...section.images];
        newImages.splice(imageIndex, 1);
        return { ...section, images: newImages };
      }
      return section;
    }));
  };

  const addNewSection = () => {
    setSections(prev => [...prev, {
      id: Date.now(),
      heading: '',
      images: []
    }]);
  };

  const removeSection = (id) => {
    setSections(prev => prev.filter(section => section.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Advertisement Management</h1>
      
      {sections.map((section) => (
        <div key={section.id} className="mb-8 p-6 border rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <FloatingInput
              placeholder="Enter Heading"
              value={section.heading}
              onChange={(e) => handleHeadingChange(section.id, e.target.value)}
              className="w-full"
            />
            {sections.length > 1 && (
              <button
                onClick={() => removeSection(section.id)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            )}
          </div>

          <div
            onDrop={(e) => handleImageDrop(section.id, e)}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed p-4 rounded-lg min-h-[200px] relative"
          >
            <input
              type="file"
              id={`fileInput-${section.id}`}
              multiple
              onChange={(e) => handleFileChange(section.id, e)}
              className="hidden"
              accept="image/*"
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {section.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-40 object-cover rounded"
                  />
                  <button
                    onClick={() => removeImage(section.id, index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
              
              <div
                onClick={() => handleImageClick(section.id)}
                className="border-2 border-dashed rounded flex items-center justify-center h-40 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <FaPlus className="text-gray-400 text-3xl" />
              </div>
            </div>

            {section.images.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
                <p>Drag and drop images here or click the plus icon to upload</p>
              </div>
            )}
          </div>
        </div>
      ))}

      <button
        onClick={addNewSection}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
      >
        Add New Section
      </button>
    </div>
  );
};

export default HomePage;
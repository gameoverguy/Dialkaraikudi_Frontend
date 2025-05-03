import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import FloatingInput from '../../../Components/FloatingInput';
import { uploadToCloudinary } from '../../../utils/cloudinaryUpload';
import axios from 'axios';
import { API } from '../../../../config/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      const response = await axios.get(`${API}/advertisement/slots/home`);
      const transformedData = response.data.data.map(ad => ({
        id: ad._id,
        heading: ad.heading,
        images: ad.images
      }));
      setSections(transformedData.length > 0 ? transformedData : [{ id: Date.now(), heading: '', images: [] }]);
    } catch (error) {
      console.error('Error fetching advertisements:', error);
      toast.error('Failed to fetch advertisements');
      setSections([{ id: Date.now(), heading: '', images: [] }]);
    } finally {
      setLoading(false);
    }
  };

  const handleHeadingChange = async (id, value) => {
    setSections(prev => prev.map(section => 
      section.id === id ? { ...section, heading: value } : section
    ));

    try {
      const section = sections.find(s => s.id === id);
      if (section._id) {
        await axios.put(`${API}/advertisement/slots/${section._id}`, {
          heading: value,
          images: section.images
        });
      }
    } catch (error) {
      console.error('Error updating heading:', error);
      toast.error('Failed to update heading');
    }
  };

  const handleImageDrop = async (id, e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    
    try {
      const uploadedUrls = await Promise.all(
        files.map(file => uploadToCloudinary(file))
      );

      const section = sections.find(s => s.id === id);
      const updatedImages = [...section.images, ...uploadedUrls];

      setSections(prev => prev.map(section => {
        if (section.id === id) {
          return {
            ...section,
            images: updatedImages
          };
        }
        return section;
      }));

      if (section._id) {
        await axios.put(`${API}/advertisement/slots/${section._id}`, {
          heading: section.heading,
          images: updatedImages
        });
        toast.success('Images uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images');
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

      const section = sections.find(s => s.id === id);
      const updatedImages = [...section.images, ...uploadedUrls];

      setSections(prev => prev.map(section => {
        if (section.id === id) {
          return {
            ...section,
            images: updatedImages
          };
        }
        return section;
      }));

      if (section._id) {
        await axios.put(`${API}/advertisement/slots/${section._id}`, {
          heading: section.heading,
          images: updatedImages
        });
        toast.success('Images uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images');
    }
  };

  const removeImage = async (sectionId, imageIndex) => {
    try {
      const section = sections.find(s => s.id === sectionId);
      const newImages = [...section.images];
      newImages.splice(imageIndex, 1);

      setSections(prev => prev.map(section => {
        if (section.id === sectionId) {
          return { ...section, images: newImages };
        }
        return section;
      }));

      if (section._id) {
        await axios.put(`${API}/advertisement/slots/${section._id}`, {
          heading: section.heading,
          images: newImages
        });
        toast.success('Image removed successfully');
      }
    } catch (error) {
      console.error('Error removing image:', error);
      toast.error('Failed to remove image');
    }
  };

  const addNewSection = async () => {
    try {
      const newSection = {
        heading: '',
        images: []
      };

      const response = await axios.post(`${API}/advertisement/slots`, newSection);
      const createdSection = response.data.data;

      setSections(prev => [...prev, {
        id: Date.now(),
        _id: createdSection._id,
        heading: createdSection.heading,
        images: createdSection.images
      }]);

      toast.success('New section added successfully');
    } catch (error) {
      console.error('Error adding new section:', error);
      toast.error('Failed to add new section');
    }
  };

  const removeSection = async (id) => {
    try {
      const section = sections.find(s => s.id === id);
      if (section._id) {
        await axios.delete(`${API}/advertisement/slots/${section._id}`);
      }
      setSections(prev => prev.filter(section => section.id !== id));
      toast.success('Section removed successfully');
    } catch (error) {
      console.error('Error removing section:', error);
      toast.error('Failed to remove section');
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

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
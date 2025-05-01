import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import CustomTable from '../../../Components/Table';
import CustomModal from '../../../Components/modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt, FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import {API} from '../../../../config/config'
import FloatingInput from '../../../Components/FloatingInput';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { MdCancel } from 'react-icons/md';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    image: null
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const columns = [
    {
      key: 'serialNo',
      label: 'S.No',
      render: (_, index) => index + 1
    },
    {
      key: 'name',
      label: 'Category Name'
    },
    {
      key: 'image',
      label: 'Image',
      render: (row) => (
        <img 
          src={row.imageUrl} 
          alt={row.name} 
          className="w-16 h-16 object-cover rounded"
        />
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2 justify-center">
        
          <button
            onClick={() => handleEdit(row)}
            className="p-2 text-green-500 transition-colors"
            title="Edit"
          >
            <FaEdit className="text-sm cursor-pointer" />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="p-2 text-red-500 transition-colors"
            title="Delete"
          >
            <FaTrashAlt className="text-sm cursor-pointer" />
          </button>
        </div>
      )
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Category name is required';
    } else if (formData.name.length > 25) {
      newErrors.name = 'Name must be less than 25 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Only letters and spaces are allowed';
    }

    // Only validate image if it's a new category or if user is changing the image
    if (!selectedCategory && !formData.image) {
      newErrors.image = 'Image is required';
    } else if (formData.image && formData.image.size > 2 * 1024 * 1024) {
      newErrors.image = 'Image size must be less than 2MB';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'name') {
      // Only allow letters and spaces
      const onlyLetters = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: onlyLetters
      }));
      
      if (value !== onlyLetters) {
        setErrors(prev => ({
          ...prev,
          name: 'Only letters and spaces are allowed'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          name: ''
        }));
      }
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          image: 'Image size must be less than 2MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        image: file
      }));
      setImagePreview(URL.createObjectURL(file));
      setErrors(prev => ({
        ...prev,
        image: ''
      }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API}/categories`);
      const transformedData = response.data.data.map(category => ({
        id: category._id,
        name: category.displayName,
        imageUrl: category.iconUrl || 'placeholder-image-url'
      }));
      setCategories(transformedData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Convert display name to category name format (lowercase with underscores)
        const categoryName = formData.name
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '_');
  
        // Build plain object for JSON
        const payload = {
          categoryName: categoryName,
          displayName: formData.name.trim(),
          isActive: true,
          // iconUrl: formData.image (not supported unless base64)
        };
  
        // If sending an image, you must base64 encode it manually (optional):
        if (formData.image) {
          const base64 = await toBase64(formData.image);
          payload.iconBase64 = base64; // send this instead
        }
  
        if (selectedCategory) {
          // Update existing category
          await axios.put(
            `${API}/categories/${selectedCategory.id}`,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          toast.success('Category updated successfully');
        } else {
          // Create new category
          const response = await axios.post(
            `${API}/categories`,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
  
          if (response.data) {
            toast.success('Category added successfully');
          }
        }
  
        // Refresh categories list
        await fetchCategories();
  
        // Reset form
        setShowModal(false);
        setImagePreview(null);
        setErrors({});
        setFormData({ name: '', image: null });
        setSelectedCategory(null);
      } catch (error) {
        console.error('Error handling category:', error);
        toast.error(error.response?.data?.message || 'Failed to process category');
      }
    }
  };
  
  // Helper: convert image file to base64 string
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API}/categories/${categoryToDelete.id}`);
      await fetchCategories();
      toast.success('Category deleted successfully');
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      image: null
    });
    setImagePreview(category.imageUrl);
    setShowModal(true);
  };

  const handleDelete = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };



  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <button
          onClick={() => {
            setSelectedCategory(null);
            setShowModal(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative flex items-center bg-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-2 min-w-[120px]"
          >
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 px-4">
                {category.name}
              </h3>
            </div>
            <button
              onClick={() => handleDelete(category)}
              className="cursor-pointer bg-white rounded-full text-red-500 shadow-md hover:bg-red-500 hover:text-white transition-all duration-200"
              title="Delete"
            >
              <MdCancel className="text-base" />
            </button>
          </div>
        ))}
        
        <div
          onClick={() => {
            setSelectedCategory(null);
            setShowModal(true);
          }}
          className="relative flex items-center bg-green-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-2 min-w-[120px] cursor-pointer"
        >
          <div className="flex-1 text-center">
            <span className="text-sm font-medium">+ Add</span>
          </div>
          
        </div>
      </div>

      {/* Add/Edit Modal */}
      <CustomModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setFormData({ name: '', image: null });
          setImagePreview(null);
          setErrors({});
          setSelectedCategory(null);
        }}
        title={selectedCategory ? "Edit Category" : "Add Category"}
      >
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <FloatingInput
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
              placeholder="Category Name"
              maxLength={25}
              error={errors.name}
            />

         </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Image
            </label>
            {!imagePreview ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition duration-200 ${
                  isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
                }`}
              >
                <input {...getInputProps()} />
                <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  {isDragActive
                    ? "Drop the image here"
                    : "Drag 'n' drop an image here, or click to select"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: JPG, PNG (Max size: 2MB)
                </p>
              </div>
            ) : (
              <div className=" flex justify-center">
                <span className='relative'>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setFormData(prev => ({ ...prev, image: null }));
                  }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-200 cursor-pointer"
                >
                 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                </span>
              </div>
            )}
            <div className='h-6'>
            {errors.image && (
              <p className="mt-2 text-xs text-red-500 text-right">{errors.image}</p>
            )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setFormData({ name: '', image: null });
                setImagePreview(null);
                setErrors({});
                setSelectedCategory(null);
              }}
              className="px-6 py-2.5 cursor-pointer rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg cursor-pointer text-white bg-blue-600 hover:bg-blue-700 transition duration-200"
            >
              {selectedCategory ? "Update Category" : "Add"}
            </button>
          </div>
        </form>
      </CustomModal>

      {/* View Modal */}
      {/* <CustomModal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedCategory(null);
        }}
        title="Category Details"
      >
        {selectedCategory && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <img
                src={selectedCategory.imageUrl}
                alt={selectedCategory.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">Category Name</h3>
              <p className="mt-1 text-gray-600">{selectedCategory.name}</p>
            </div>
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => {
                  setViewModalOpen(false);
                  setSelectedCategory(null);
                }}
                className="px-6 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </CustomModal> */}

      <CustomModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setCategoryToDelete(null);
        }}
        title="Delete Category"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete this category? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setCategoryToDelete(null);
              }}
              className="px-6 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-6 py-2.5 rounded-lg text-white bg-red-600 hover:bg-red-700 transition duration-200"
            >
              Yes
            </button>
          </div>
        </div>
      </CustomModal>
      <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      style={{ zIndex: 9999 }}  // This ensures toast appears above modals
    />
    </div>
  );
};

export default CategoryManagement;

 
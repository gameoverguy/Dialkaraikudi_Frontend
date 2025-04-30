import React, { useState, useCallback, useEffect } from 'react';
import CustomTable from '../../../Components/Table';
import CustomModal from '../../../Components/modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt, FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';

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
          {/* <button
            onClick={() => handleView(row)}
            className="p-2 text-blue-500   transition-colors"
            title="View"
          >
            <FaEye className="text-sm" />
          </button> */}
          <button
            onClick={() => handleEdit(row)}
            className="p-2 text-green-500 transition-colors"
            title="Edit"
          >
            <FaEdit className="text-sm" />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="p-2 text-red-500 transition-colors"
            title="Delete"
          >
            <FaTrashAlt className="text-sm" />
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

    if (!formData.image) {
      newErrors.image = 'Image is required';
    } else if (formData.image.size > 2 * 1024 * 1024) {
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

  // Mock API data
  const mockCategories = [
    {
      id: 1,
      name: "Electronics",
      imageUrl: "https://picsum.photos/200/200?random=1"
    },
    {
      id: 2,
      name: "Fashion",
      imageUrl: "https://picsum.photos/200/200?random=2"
    },
    {
      id: 3,
      name: "Home Decor",
      imageUrl: "https://picsum.photos/200/200?random=3"
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchCategories = () => {
      setTimeout(() => {
        setCategories(mockCategories);
      }, 500);
    };

    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (selectedCategory) {
        // Update existing category
        const updatedCategories = categories.map(cat => {
          if (cat.id === selectedCategory.id) {
            return {
              ...cat,
              name: formData.name,
              imageUrl: formData.image ? URL.createObjectURL(formData.image) : selectedCategory.imageUrl
            };
          }
          return cat;
        });
        
        setCategories(updatedCategories);
        toast.success('Category updated successfully');
      } else {
        // Create new category
        const newCategory = {
          id: categories.length + 1,
          name: formData.name,
          imageUrl: URL.createObjectURL(formData.image)
        };
        setCategories([...categories, newCategory]);
        toast.success('Category added successfully');
      }
      
      // Reset form
      setShowModal(false);
      setImagePreview(null);
      setErrors({});
      setFormData({ name: '', image: null });
      setSelectedCategory(null);
    }
  };

  // const handleView = (category) => {
  //   setSelectedCategory(category);
  //   setViewModalOpen(true);
  // };

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
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(c => c.id !== category.id));
      toast.success('Category deleted successfully');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Category Management</h1>
      <CustomTable
        columns={columns}
        data={categories}
        itemsPerPage={5}
        addButton="Add Category"
        onAddClick={() => {
          setSelectedCategory(null);
          setShowModal(true);
        }}
        searchPlaceholder="Search by category name..."
      />

      {/* Edit/Add Modal */}
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
              placeholder="Enter category name"
              maxLength={25}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-500">{errors.name}</p>
            )}
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
              <div className="relative">
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
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
            {errors.image && (
              <p className="mt-2 text-sm text-red-500">{errors.image}</p>
            )}
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
              className="px-6 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-200"
            >
              {selectedCategory ? "Update Category" : "Add Category"}
            </button>
          </div>
        </form>
      </CustomModal>

      {/* View Modal */}
      <CustomModal
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
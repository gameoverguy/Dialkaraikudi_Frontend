import React, { useState, useCallback, useEffect } from 'react';
import CustomTable from '../../../Components/Table';
import CustomModal from '../../../Components/modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt, FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import ConfirmationModal from '../../../Components/ConfirmationModal';
import axios from 'axios';

const BusinessManagement = () => {
  const [businesses, setBusinesses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    phone: '',
    email: '',
    address: '',  // Changed to simple string
    photos: []
  });

  // Add API endpoints
  const API_BASE_URL = 'http://192.168.1.33:5000';

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/business`);
      console.log(response.data);
            const transformedData = response.data.data.map(business => ({
        id: business._id,
        name: business.businessName,
        description: business.description,
        category: business.category,
        phone: business.contactDetails.phone,
        email: business.contactDetails.email,
        address: business.address.addressArea,
        photos: business.photos
      }));

console.log(transformedData, "Geteddd");


      setBusinesses(transformedData);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      toast.error('Failed to fetch businesses');
    }
  };


  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      phone: '',
      email: '',
      address: '',
      photos: []
    });
    setImagePreview([]);
    setErrors({});
  };

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // Mock categories data
  const mockCategories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Fashion" },
    { id: 3, name: "Home Decor" }
  ];

  const columns = [
    {
      key: 'serialNo',
      label: 'S.No',
      render: (_, index) => index + 1
    },
    {
      key: 'name',
      label: 'Business Name'
    },
    {
      key: 'category',
      label: 'Category',
      render: (row) => row.category?.displayName || 'N/A'
    },
    {
      key: 'phone',
      label: 'Phone'
    },
    {
      key: 'email',
      label: 'Email'
    },

    
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => handleView(row)}
            className="p-2 text-blue-500 transition-colors"
            title="View"
          >
            <FaEye className="text-sm" />
          </button>
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
      newErrors.name = 'Business name is required';
    } else if (formData.name.length > 30) {
      newErrors.name = 'Name must be less than 30 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Only letters and spaces are allowed';
    }

    if (!formData.description) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number. Must start with 6-9 and be 10 digits';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.address) {
      newErrors.address = 'Address is required';
    }

    if (!formData.photos.length) {
      newErrors.photos = 'At least one photo is required';
    } else if (formData.photos.length > 6) {
      newErrors.photos = 'Maximum 6 photos allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let validatedValue = value;
    let error = '';

    switch (name) {
      case 'name':
        const onlyLetters = value.replace(/[^a-zA-Z\s]/g, '');
        validatedValue = onlyLetters;
        if (value !== onlyLetters) {
          error = 'Only letters and spaces are allowed';
        }
        break;

      case 'description':
        if (value.length < 20) {
          error = 'Description must be at least 20 characters';
        }
        break;

      case 'phone':
        if (value && !/^[6-9]\d{0,9}$/.test(value)) {
          error = 'Invalid phone number format';
          validatedValue = formData.phone;
        }
        break;

      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Invalid email format';
        }
        break;
    }

    setFormData(prev => ({
      ...prev,
      [name]: validatedValue
    }));

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length + formData.photos.length > 6) {
      setErrors(prev => ({
        ...prev,
        photos: 'Maximum 6 photos allowed'
      }));
      return;
    }

    const validFiles = acceptedFiles.filter(file => file.size <= 2 * 1024 * 1024);

    if (validFiles.length !== acceptedFiles.length) {
      setErrors(prev => ({
        ...prev,
        photos: 'Some files were skipped (max size: 2MB)'
      }));
    }

    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...validFiles]
    }));

    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setImagePreview(prev => [...prev, ...newPreviews]);
  }, [formData.photos]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 6
  });

  console.log(businesses, "Geteddd");

  const handleView = (business) => {
    setSelectedBusiness(business);
    setViewModalOpen(true);
  };

  const handleEdit = (business) => {
    setSelectedBusiness(business);
    setFormData({
      name: business.name,
      description: business.description,
      category: business.category?.displayName || '',
      phone: business.phone,
      email: business.email,
      address: business.address,
      photos: [...business.photos]
    });
    setImagePreview([...business.photos]);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const requestBody = {
          businessName: formData.name,
          description: formData.description,
          category: {
            displayName: formData.category
          },
          contactDetails: {
            phone: formData.phone,
            email: formData.email
          },
          address: {
            addressArea: formData.address
          },
          photos: formData.photos.map(photo =>
            typeof photo === 'string' ? photo : URL.createObjectURL(photo)
          )
        };

        if (selectedBusiness) {
          // Handle update with Axios
          await axios.put(`${API_BASE_URL}/business/${selectedBusiness.id}`, requestBody);
          toast.success('Business updated successfully');
        } else {
          // Handle new business with Axios
          await axios.post(`${API_BASE_URL}/business`, requestBody);
          toast.success('Business added successfully');
        }

        await fetchBusinesses();
        setShowModal(false);
        resetForm();
        setSelectedBusiness(null);
      } catch (error) {
        console.error('Error handling business:', error);
        toast.error('Failed to process business');
      }
    }
  };

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
    setImagePreview(prev => prev.filter((_, i) => i !== index));
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [businessToDelete, setBusinessToDelete] = useState(null);

  const handleDelete = (business) => {
    setBusinessToDelete(business);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/business/${businessToDelete.id}`);
      setBusinesses(businesses.filter(b => b.id !== businessToDelete.id));
      toast.success('Business deleted successfully');
    } catch (error) {
      console.error('Error deleting business:', error);
      toast.error('Failed to delete business');
    } finally {
      setShowConfirmModal(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Business Management</h1>
      <CustomTable
        columns={columns}
        data={businesses}
        itemsPerPage={5}
        addButton="Add Business"
        onAddClick={() => {
          setSelectedBusiness(null);
          setShowModal(true);
        }}
        searchPlaceholder="Search by business detail"
      />

      {/* Edit/Add Modal */}
      <CustomModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setFormData({ name: '', description: '', category: '', phone: '', email: '', address: '', photos: [] });
          setImagePreview([]);
          setErrors({});
          setSelectedBusiness(null);
        }}
        title={selectedBusiness ? "Edit Business" : "Add Business"}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
              placeholder="Enter business name"
              maxLength={30}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
              placeholder="Enter business description"
              rows={4}
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <input
              type="text"
              list="categories"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border ${errors.category ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
              placeholder="Search and select category"
            />
            <datalist id="categories">
              {mockCategories.map(category => (
                <option key={category.id} value={category.name} />
              ))}
            </datalist>
            {errors.category && (
              <p className="mt-2 text-sm text-red-500">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
              placeholder="Enter phone number"
              maxLength={10}
            />
            {errors.phone && (
              <p className="mt-2 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
              placeholder="Enter business address"
              rows={3}
            />
            {errors.address && (
              <p className="mt-2 text-sm text-red-500">{errors.address}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Photos (Max 6)
            </label>
            {imagePreview.length < 6 && (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition duration-200 ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
                  }`}
              >
                <input {...getInputProps()} />
                <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  {isDragActive
                    ? "Drop the images here"
                    : "Drag 'n' drop images here, or click to select"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: JPG, PNG (Max size: 2MB)
                </p>
              </div>
            )}
            {imagePreview.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {imagePreview.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="h-32 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.photos && (
              <p className="mt-2 text-sm text-red-500">{errors.photos}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setFormData({ name: '', description: '', category: '', phone: '', email: '', address: '', photos: [] });
                setImagePreview([]);
                setErrors({});
                setSelectedBusiness(null);
              }}
              className="px-6 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-200"
            >
              {selectedBusiness ? "Update Business" : "Add Business"}
            </button>
          </div>
        </form>
      </CustomModal>

      {/* View Modal */}
      <CustomModal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedBusiness(null);
        }}
        title="Business Details"
      >
        {selectedBusiness && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Business Name</h3>
                <p className="mt-1 text-gray-600">{selectedBusiness.name}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Category</h3>
                <p className="mt-1 text-gray-600">{selectedBusiness.category?.displayName || 'N/A'}</p>
              </div>
              <div className="col-span-2">
                <h3 className="text-lg font-medium text-gray-900">Description</h3>
                <p className="mt-1 text-gray-600">{selectedBusiness.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                <p className="mt-1 text-gray-600">{selectedBusiness.phone}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                <p className="mt-1 text-gray-600">{selectedBusiness.email}</p>
              </div>
              <div className="col-span-2">
                <h3 className="text-lg font-medium text-gray-900">Address</h3>
                <p className="mt-1 text-gray-600">{selectedBusiness.address}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Photos</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedBusiness.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={photo}
                      alt={`${selectedBusiness.name} photo ${index + 1}`}
                      className="h-32 w-full object-cover rounded-lg transition-transform duration-200 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs py-1 px-2 rounded-b-lg">
                      Photo {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => {
                  setViewModalOpen(false);
                  setSelectedBusiness(null);
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
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        title="Delete Business"
        message="Are you sure you want to delete this business? This action cannot be undone."
      />
    </div>
  );
};

export default BusinessManagement;



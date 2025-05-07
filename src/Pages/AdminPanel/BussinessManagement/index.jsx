import React, { useState, useCallback, useEffect } from 'react';
import CustomTable from '../../../Components/Table';
import CustomModal from '../../../Components/modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt, FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import ConfirmationModal from '../../../Components/ConfirmationModal';
import axios from 'axios';
import { API } from '../../../../config/config'
import FloatingInput from '../../../Components/FloatingInput';
import FloatingSelect from '../../../Components/FloatingInput/DropDown';
import { uploadMultipleToCloudinary } from '../../../utils/cloudinaryUpload';
import { MdCancel } from 'react-icons/md';
import FloatingTextarea from '../../../Components/FloatingInput/FloatingTextarea';

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
  // const API = 'http://192.168.1.33:5000';

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API}/categories`);
      setCategories(response.data.data);
      
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    }
  };



  const fetchBusinesses = async () => {
    try {
      const response = await axios.get(`${API}/business`);
      console.log(response.data);
      const transformedData = response.data.data.map(business => ({
        id: business._id,
        name: business.businessName,
        description: business.description,
        category: business.category,
        phone: business.contactDetails.phone,
        email: business.contactDetails.email,
        address: business.address.formattedAddress || business.address.addressArea,
        photos: business.photos
      }));

      console.log(transformedData, "Geteddd");


      setBusinesses(transformedData);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      toast.error('Failed to fetch businesses');
    }
  };

  useEffect(() => {
    fetchBusinesses();
    fetchCategories();
  }, []);

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
  const [categories, setCategories] = useState([]);


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
            <FaEye className="text-sm cursor-pointer" />
          </button>
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
      newErrors.phone = 'Invalid phone number';
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
      category: business.category?._id || '', // Make sure we're using the category ID
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
        const uploadedUrls = await uploadMultipleToCloudinary(formData.photos);

        const requestBody = {
          businessName: formData.name,
          description: formData.description,
          category: formData.category,
          contactDetails: {
            phone: formData.phone,
            email: formData.email
          },
          address: {
            formattedAddress: formData.address
          },
          photos: uploadedUrls
        };

        if (selectedBusiness) {
          await axios.put(`${API}/business/${selectedBusiness.id}`, requestBody);
          toast.success('Business updated successfully');
        } else {
          await axios.post(`${API}/business`, requestBody);
          toast.success('Business added successfully');
        }

        await fetchBusinesses();
        setShowModal(false);
        resetForm();
        setSelectedBusiness(null);
      } catch (error) {
        console.error('Error handling business:', error);
        toast.error(error.response?.data?.message || 'Failed to process business');
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
      await axios.delete(`${API}/business/${businessToDelete.id}`);
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
      <div className='shadow bg-white p-6 rounded-lg'>
        <h1 className="text-2xl font-bold mb-6">Business Management</h1>
        <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui atque iure reprehenderit harum tempora ex voluptas dolor recusandae aliquam nostrum mollitia totam deleniti reiciendis consequuntur odio, nam eaque voluptatibus eius maxime. Repellat alias quas distinctio voluptatem molestiae quasi nulla nemo!</span>
      </div>
      <CustomTable
        columns={columns}
        data={businesses}
        itemsPerPage={10}
        addButton="Add"
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
        <form onSubmit={handleSubmit} className="">

          <div className="flex gap-2">
            <div>
              <FloatingInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Business Name"
                maxLength={30}
                error={errors.name}
              />
            </div>

            <div>
              <FloatingSelect
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="Select Category"
                error={errors.category}
                options={categories.map(category => ({
                  value: category._id,
                  label: category.displayName
                }))}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div>
              <FloatingInput
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                maxLength={10}
                error={errors.phone}
              />

            </div>

            <div>
              <FloatingInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                error={errors.email}
              />
            </div>
          </div>

          <div className='mt-4'>

            <FloatingTextarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Business Description"
              error={errors.description}
              rows={4}
            />
          </div>

          <div className='mt-4'>
            <FloatingTextarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Business Address"
              error={errors.address}
              rows={4}
            />
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
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute cursor-pointer -top-2 right-5 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
                    >
                      <MdCancel />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className='mt-1 h-4'>
              {errors.photos && (
                <p className="text-xs text-red-500 text-right">{errors.photos}</p>
              )}
            </div>
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
                      className="h-32 w-32  object-cover rounded-lg transition-transform duration-200 hover:scale-105"
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
        message="Are you sure you want to delete this business?"
      />
    </div>
  );
};

export default BusinessManagement;



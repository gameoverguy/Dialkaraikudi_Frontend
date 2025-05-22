import React, { useState, useCallback, useEffect } from 'react';
import CustomModal from '../../../Components/modal';
import { toast, ToastContainer } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { API } from '../../../../config/config';
import { uploadMultipleToCloudinary } from '../../../utils/cloudinaryUpload';
import Loader from '../../../Components/Loader';
import BusinessForm from './components/BusinessForm';
import BusinessDetails from './components/BusinessDetails';
import BusinessTable from './components/BusinessTable';
import ConfirmationModal from '../../../Components/ConfirmationModal';

const BusinessManagement = () => {
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    phone: '',
    email: '',
    address: '',  // Changed to simple string
    photos: [],
    verified: ''
  });

  // Add API endpoints
  // const API = 'http://192.168.1.33:5000';

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API}/categories`);
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  };



  const fetchBusinesses = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API}/business/allbusiness`);
      const transformedData = response.data.data.map(business => ({
        id: business._id,
        name: business.businessName,
        description: business.description,
        category: business.category,
        phone: business.contactDetails?.phone,
        email: business.email,
        address: business.address?.formattedAddress || business.address?.addressArea,
        photos: business.photos,
        verified: business.verified
      }));

      console.log(transformedData, "Geteddd");


      setBusinesses(transformedData);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      toast.error('Failed to fetch businesses');
    } finally {
      setIsLoading(false);
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
      photos: [],
      verified: ''
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
      key: 'verified',
      label: 'Verified',
      render: (row) => (
        <div className="flex justify-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={row.verified}
              onChange={() => handleVerifiedToggle(row)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      )
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

  const handleVerifiedToggle = async (business) => {
    try {
      setIsLoading(true);
      await axios.put(`${API}/business/${business.id}`, {
        verified: !business.verified
      });

      // Update the local state
      setBusinesses(prev => prev.map(b => {
        if (b.id === business.id) {
          return { ...b, verified: !b.verified };
        }
        return b;
      }));

      toast.success(`Business ${!business.verified ? 'verified' : 'unverified'} successfully`);
    } catch (error) {
      console.error('Error updating verification status:', error);
      toast.error('Failed to update verification status');
    } finally {
      setIsLoading(false);
    }
  };

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
      photos: [...business.photos],
      verified: business.verified
    });
    setImagePreview([...business.photos]);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsLoading(true);
        const uploadedUrls = await uploadMultipleToCloudinary(formData.photos);

        const requestBody = {
          email: formData.email,
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
          photos: uploadedUrls,
          verified: formData.verified
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
      } finally {
        setIsLoading(false);
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
      setIsLoading(true);
      await axios.delete(`${API}/business/${businessToDelete.id}`);
      setBusinesses(businesses.filter(b => b.id !== businessToDelete.id));
      toast.success('Business deleted successfully');
    } catch (error) {
      console.error('Error deleting business:', error);
      toast.error('Failed to delete business');
    } finally {
      setIsLoading(false);
      setShowConfirmModal(false);
    }
  };

  return (
    <div className="p-6 relative">
      {isLoading && <Loader />}
      <ToastContainer />
      <div className='shadow bg-white p-6 rounded-lg'>
        <h1 className="text-2xl font-bold mb-6">Business Management</h1>
        <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui atque iure reprehenderit harum tempora ex voluptas dolor recusandae aliquam nostrum mollitia totam deleniti reiciendis consequuntur odio, nam eaque voluptatibus eius maxime. Repellat alias quas distinctio voluptatem molestiae quasi nulla nemo!</span>
      </div>
      <BusinessTable
        businesses={businesses}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleVerifiedToggle={handleVerifiedToggle}
      />

      {/* Edit/Add Modal */}
      <CustomModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
          setSelectedBusiness(null);
        }}
        title={selectedBusiness ? "Edit Business" : "Add Business"}
      >
        <BusinessForm 
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          categories={categories}
          imagePreview={imagePreview}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          removePhoto={removePhoto}
          setShowModal={setShowModal}
          setFormData={setFormData}
          setImagePreview={setImagePreview}
          setErrors={setErrors}
          setSelectedBusiness={setSelectedBusiness}
          selectedBusiness={selectedBusiness}
        />
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
        {selectedBusiness &&
         <BusinessDetails
         selectedBusiness={selectedBusiness}
         setSelectedBusiness={setSelectedBusiness}
          setViewModalOpen={setViewModalOpen}
                    />}
      </CustomModal>

      {/* Confirmation Modal */}
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



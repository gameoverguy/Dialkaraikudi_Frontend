import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../config/config';
import FloatingInput from '../Components/FloatingInput';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import FloatingSelect from '../Components/FloatingInput/DropDown';
import FloatingTextarea from '../Components/FloatingInput/FloatingTextarea';
import { uploadToCloudinary } from '../utils/cloudinaryUpload';
import { toast, ToastContainer } from 'react-toastify';

const BusinessDetailForm = () => {
    const [formData, setFormData] = useState({
        businessName: '',
        ownerName: '',
        address1: '',
        address2: '',
        city: '',
        pincode: '',
        description: '',
        categoryId: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        photos: []
    });
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [photosPreviews, setPhotosPreviews] = useState([]);

    // Update the validateForm function with new regex and rules
    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const phoneRegex = /^[6-9]\d{9}$/;
        const nameRegex = /^[a-zA-Z\s]+$/;
        const cityRegex = /^[a-zA-Z\s]+$/;

        // Business Name validation
        if (!formData.businessName.trim()) {
            newErrors.businessName = 'Business name is required';
        } else if (!nameRegex.test(formData.businessName)) {
            newErrors.businessName = 'Only letters and spaces are allowed';
        }

        // Owner Name validation
        if (!formData.ownerName.trim()) {
            newErrors.ownerName = 'Owner name is required';
        } else if (!nameRegex.test(formData.ownerName)) {
            newErrors.ownerName = 'Only letters and spaces are allowed';
        }

        // Phone validation
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Enter valid 10 digit phone number';
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Enter valid email address';
        }

        // Address validation
        if (!formData.address1.trim()) {
            newErrors.address1 = 'Address is required';
        }

        // City validation
        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        } else if (!cityRegex.test(formData.city)) {
            newErrors.city = 'Only letters and spaces are allowed';
        }

        // Pincode validation
        if (!formData.pincode) {
            newErrors.pincode = 'Pincode is required';
        } else if (!/^\d{6}$/.test(formData.pincode)) {
            newErrors.pincode = 'Enter valid 6 digit pincode';
        }

        // Category validation
        if (!formData.categoryId) {
            newErrors.categoryId = 'Category is required';
        }

        // Description validation
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.length < 25) {
            newErrors.description = 'Description must be at least 25 characters';
        }

        // Password validation - only check for minimum 8 characters
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        // Confirm Password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Photos validation
        if (formData.photos.length === 0) {
            newErrors.photos = 'At least one photo is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API}/categories`);
                setCategories(response.data.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    // Update handleChange to include real-time validation
    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;
        let error = '';

        switch (name) {
            case 'businessName':
                if (!/^[a-zA-Z\s]*$/.test(value)) {
                    error = 'Only letters and spaces are allowed';
                    newValue = formData.businessName; // Keep old value
                }
                break;

            case 'phone':
                if (!/^[6-9]\d{0,9}$/.test(value)) {
                    error = 'Phone number must start with 6-9 and have 10 digits';
                    newValue = formData.phone; // Keep old value
                }
                break;

            case 'email':
                if (value && !/^[a-zA-Z0-9._-]+@?[a-zA-Z0-9.-]*\.?[a-zA-Z]*$/.test(value)) {
                    error = 'Enter valid email address';
                    newValue = formData.email; // Keep old value
                }
                break;

            case 'city':
                if (!/^[a-zA-Z\s]*$/.test(value)) {
                    error = 'Only letters and spaces are allowed';
                    newValue = formData.city; // Keep old value
                }
                break;

            case 'pincode':
                if (!/^\d{0,6}$/.test(value)) {
                    error = 'Enter valid 6 digit pincode';
                    newValue = formData.pincode; // Keep old value
                }
                break;

            case 'description':
                if (value && value.length < 25) {
                    error = 'Description must be at least 25 characters';
                }
                break;
            case 'ownerName':
                if (!/^[a-zA-Z\s]*$/.test(value)) {
                    error = 'Only letters and spaces are allowed';
                    newValue = formData.ownerName;
                }
                break;

            case 'password':
                if (value && value.length < 8) {
                    error = 'Password must be at least 8 characters';
                }
                break;

            case 'confirmPassword':
                if (formData.password && value && formData.password !== value) {
                    error = 'Passwords do not match';
                }
                break;

            default:
                break;
        }

        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));

        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const onDropPhotos = (acceptedFiles) => {
        if (photosPreviews.length + acceptedFiles.length > 6) {
            setErrors(prev => ({ ...prev, photos: 'Maximum 6 photos allowed' }));
            return;
        }
        const newPhotos = acceptedFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setPhotosPreviews(prev => [...prev, ...newPhotos]);
        setFormData(prev => ({
            ...prev,
            photos: [...prev.photos, ...acceptedFiles]
        }));
    };

    const { getRootProps: getPhotosRootProps, getInputProps: getPhotosInputProps } = useDropzone({
        onDrop: onDropPhotos,
        accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
        maxFiles: 6
    });

    const removePhoto = (index) => {
        const newPreviews = photosPreviews.filter((_, i) => i !== index);
        const newPhotos = formData.photos.filter((_, i) => i !== index);
        setPhotosPreviews(newPreviews);
        setFormData(prev => ({ ...prev, photos: newPhotos }));
    };

    const uploadMultipleToCloudinary = async (files) => {
        try {
            const uploadPromises = files.map(file => uploadToCloudinary(file));
            const uploadedUrls = await Promise.all(uploadPromises);
            return uploadedUrls;
        } catch (error) {
            console.error('Error uploading images:', error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error('Please fix the errors before submitting');
            return;
        }

        try {
            // Upload photos to Cloudinary
            const photoUrls = await uploadMultipleToCloudinary(formData.photos);

            // Prepare the data for submission
            const submitData = {
                email: formData.email,
                businessName: formData.businessName,
                ownerName: formData.ownerName,
                description: formData.description,
                category: formData.categoryId,
                contactDetails: {
                    phone: formData.phone,                   
                },
                address: {
                    addressArea: formData.address1,
                    city: formData.city,
                    pincode: formData.pincode,
                    formatedAddress: formData.address1 + ', ' + formData.city + ', ' + formData.pincode
                },
                password: formData.password,
                photos: photoUrls
            };

            // Make the API call
            const response = await axios.post(`${API}/business/signup`, submitData);

            if (response.data.message) {
                toast.success('Business registered successfully!');
                // Reset form or redirect
                setFormData({
                    businessName: '',
                    ownerName: '',
                    address1: '',
                    address2: '',
                    city: '',
                    pincode: '',
                    description: '',
                    categoryId: '',
                    phone: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    photos: []
                });
                setPhotosPreviews([]);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(error.response?.data?.message || 'Error registering business');
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-8">
            <form onSubmit={handleSubmit} className="">
                <h1 className="text-2xl font-bold mb-6">Enter Your Business Details</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <FloatingInput
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Business Name"
                        error={errors.businessName}
                    />

                    <FloatingInput
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        type="text"
                        error={errors.phone}
                    />

                    <FloatingInput
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        type="text"
                        error={errors.email}
                    />

                    <FloatingInput
                        name="address2"
                        value={formData.address2}
                        onChange={handleChange}
                        placeholder="Address Line 2 (Optional)"
                    />

                    <FloatingInput
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="Pincode"
                        maxLength={6}
                        error={errors.pincode}
                    />

                    <FloatingInput
                        name="address1"
                        value={formData.address1}
                        onChange={handleChange}
                        placeholder="Address Line 1"
                        error={errors.address1}
                    />

                    <FloatingInput
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        error={errors.city}
                    />

                    <FloatingInput
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        placeholder="Owner Name"
                        error={errors.ownerName}
                    />

                    <FloatingInput
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        type="password"
                        error={errors.password}
                    />

                    <FloatingInput
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        type="password"
                        error={errors.confirmPassword}
                    />

                    <FloatingSelect
                        id="category"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        placeholder="Select Category"
                        error={errors.categoryId}
                        options={categories.map(category => ({
                            value: category._id,
                            label: category.displayName
                        }))}
                    />

                </div>

                <div className="w-full">
                    <FloatingTextarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Business Description"
                        error={errors.description}
                        rows={4}
                    />
                </div>

                {/* Photos Upload */}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Photos (Min 1, Max 6)
                    </label>
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {photosPreviews.map((photo, index) => (
                            <div key={index} className="relative aspect-square">
                                <img
                                    src={photo.preview}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-full object-cover rounded absolute inset-0"
                                />
                                <button
                                    type="button"
                                    onClick={() => removePhoto(index)}
                                    className="absolute cursor-pointer top-1 right-1 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                                >
                                    <MdCancel className="text-sm" />
                                </button>
                            </div>
                        ))}
                        {photosPreviews.length < 6 && (
                            <div
                                {...getPhotosRootProps()}
                                className={`aspect-square relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer ${errors.photos ? 'border-red-500' : 'border-gray-300'} hover:border-blue-500 transition-colors`}
                            >
                                <input {...getPhotosInputProps()} />
                                <FaCloudUploadAlt className="h-8 w-8 text-gray-400" />
                                <p className="mt-1 text-xs text-gray-500">Add Photo</p>
                            </div>
                        )}
                    </div>
                    {errors.photos && <p className="mt-1 text-xs text-right text-red-500">{errors.photos}</p>}
                </div>

                <button
                    type="submit"
                    className=" mt-2 inline-flex bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl  items-center justify-center gap-2 transition-all hover:shadow-lg text-lg font-medium"
                >
                    Register Business
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default BusinessDetailForm;
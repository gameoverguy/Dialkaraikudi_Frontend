import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../config/config";
import FloatingInput from "../Components/FloatingInput";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import FloatingSelect from "../Components/FloatingInput/DropDown";
import FloatingTextarea from "../Components/FloatingInput/FloatingTextarea";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";
import CustomModal from "../Components/modal";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CiCircleInfo } from "react-icons/ci";

const BusinessDetailForm = ({
  isOpen,
  onClose,
  setShowLoginModal,
  setShowBusinessDetailForm,
}) => {
  const [errorOverall, setErrorOverall] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    address1: "",
    address2: "",
    city: "",
    pincode: "",
    description: "",
    categoryId: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    photos: [],
    agreeToTerms: false,
  });
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [photosPreviews, setPhotosPreviews] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Update the validateForm function with new regex and rules
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const cityRegex = /^[a-zA-Z\s]+$/;

    // Business Name validation
    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    } else if (!nameRegex.test(formData.businessName)) {
      newErrors.businessName = "Only letters and spaces are allowed";
    }

    // Owner Name validation
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "Owner name is required";
    } else if (!nameRegex.test(formData.ownerName)) {
      newErrors.ownerName = "Only letters and spaces are allowed";
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter valid 10 digit phone number";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter valid email address";
    }

    // Address validation
    if (!formData.address1.trim()) {
      newErrors.address1 = "Address is required";
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    } else if (!cityRegex.test(formData.city)) {
      newErrors.city = "Only letters and spaces are allowed";
    }

    // Pincode validation
    if (!formData.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter valid 6 digit pincode";
    }

    // Category validation
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 25) {
      newErrors.description = "Description must be at least 25 characters";
    }

    // Password validation - only check for minimum 8 characters
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Photos validation
    if (formData.photos.length === 0) {
      newErrors.photos = "At least one photo is required";
    }
    // Terms and Conditions validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the Terms and Conditions";
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
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setErrors({});
      setErrorOverall("");
      setSuccessMessage("");
      setFormData({
        businessName: "",
        ownerName: "",
        address1: "",
        address2: "",
        city: "",
        pincode: "",
        description: "",
        categoryId: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        photos: [],
      });
      setPhotosPreviews([]);
    }
  }, [isOpen]);

  // Update handleChange to include real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    let error = "";

    switch (name) {
      case "businessName":
        if (!/^[a-zA-Z\s]*$/.test(value)) {
          // error = 'Only letters and spaces are allowed';
          newValue = formData.businessName; // Keep old value
        }
        break;

      case "phone":
        if (!/^[6-9]\d{0,9}$/.test(value)) {
          // error = 'Phone number must start with 6-9 and have 10 digits';
          newValue = formData.phone; // Keep old value
        }
        break;

      case "email":
        if (
          value &&
          !/^[a-zA-Z0-9._-]+@?[a-zA-Z0-9.-]*\.?[a-zA-Z]*$/.test(value)
        ) {
          // error = 'Enter valid email address';
          newValue = formData.email; // Keep old value
        }
        break;

      case "city":
        if (!/^[a-zA-Z\s]*$/.test(value)) {
          // error = 'Only letters and spaces are allowed';
          newValue = formData.city; // Keep old value
        }
        break;

      case "pincode":
        if (!/^\d{0,6}$/.test(value)) {
          // error = 'Enter valid 6 digit pincode';
          newValue = formData.pincode; // Keep old value
        }
        break;

      case "description":
        if (value && value.length < 25) {
          error = "Description must be at least 25 characters";
        }
        break;
      case "ownerName":
        if (!/^[a-zA-Z\s]*$/.test(value)) {
          // error = 'Only letters and spaces are allowed';
          newValue = formData.ownerName;
        }
        break;

      case "password":
        if (value && value.length < 8) {
          // error = 'Password must be at least 8 characters';
        }
        break;

      case "confirmPassword":
        if (formData.password && value && formData.password !== value) {
          error = "Passwords do not match";
        }
        break;

      default:
        break;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const onDropPhotos = (acceptedFiles) => {
    if (photosPreviews.length + acceptedFiles.length > 6) {
      setErrors((prev) => ({ ...prev, photos: "Maximum 6 photos allowed" }));
      return;
    }
    const newPhotos = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setPhotosPreviews((prev) => [...prev, ...newPhotos]);
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...acceptedFiles],
    }));
  };

  const {
    getRootProps: getPhotosRootProps,
    getInputProps: getPhotosInputProps,
  } = useDropzone({
    onDrop: onDropPhotos,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    maxFiles: 6,
  });

  const removePhoto = (index) => {
    const newPreviews = photosPreviews.filter((_, i) => i !== index);
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    setPhotosPreviews(newPreviews);
    setFormData((prev) => ({ ...prev, photos: newPhotos }));
  };

  const uploadMultipleToCloudinary = async (files) => {
    try {
      const uploadPromises = files.map((file) => uploadToCloudinary(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      return uploadedUrls;
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorOverall("");
    setIsSubmitting(true);
    if (!validateForm()) {
      setIsSubmitting(false);
      // toast.error('Please fix the errors before submitting');
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
          formatedAddress:
            formData.address1 + ", " + formData.city + ", " + formData.pincode,
        },
        password: formData.password,
        photos: photoUrls,
      };

      // Make the API call
      const response = await axios.post(`${API}/business/signup`, submitData);
      console.log(response.data);

      if (response.data.message) {
        setSuccessMessage("Business registered successfully!");
        setFormData({
          businessName: "",
          ownerName: "",
          address1: "",
          address2: "",
          city: "",
          pincode: "",
          description: "",
          categoryId: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
          photos: [],
        });
        setPhotosPreviews([]);

        setTimeout(() => {
          setShowBusinessDetailForm(false);
          setShowLoginModal(true);
        }, 1000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorOverall(
        error.response?.data?.message || "Error registering business"
      );
      // toast.error(error.response?.data?.message || 'Error registering business');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      classname="w-[95%] sm:w-full max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="p-2 sm:p-4">
        <div className="space-y-4 sm:space-y-4">
          {/* Business Information Section */}
          <div className="rounded-lg space-y-2 sm:space-y-3">
            <h3 className="text-lg font-bold text-gray-700">
              Business Registration
            </h3>
            <FloatingInput
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Business Name"
              error={errors.businessName}
            />
            <FloatingInput
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              placeholder="Owner Name"
              error={errors.ownerName}
            />
            <FloatingSelect
              id="category"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              placeholder="Select Category"
              error={errors.categoryId}
              options={categories.map((category) => ({
                value: category._id,
                label: category.displayName,
              }))}
            />
            <FloatingTextarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Business Description"
              error={errors.description}
              rows={4}
            />
          </div>

          {/* Contact Information Section */}
          <div className="">
            {/* <h3 className="text-lg font-bold text-gray-700">Contact Information</h3> */}
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
          </div>

          {/* Address Section */}
          <div className="">
            {/* <h3 className="text-lg font-semibold text-gray-700">Business Address</h3> */}
            <FloatingInput
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              placeholder="Address Line 1"
              error={errors.address1}
            />
            <FloatingInput
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              placeholder="Address Line 2 (Optional)"
            />
            <div className="grid grid-cols-2 gap-2">
              <FloatingInput
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                error={errors.city}
              />
              <FloatingInput
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                maxLength={6}
                error={errors.pincode}
              />
            </div>
          </div>

          {/* Account Security Section */}
          <div className="">
            <div className="relative">
              <FloatingInput
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                error={errors.password}
              />
              {formData.password && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-6 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <AiOutlineEye className="w-5 h-5" />
                  ) : (
                    <AiOutlineEyeInvisible className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>
            <div className="relative">
              <FloatingInput
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                error={errors.confirmPassword}
              />
              {formData.confirmPassword && (
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-6 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  title={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <AiOutlineEye className="w-5 h-5" />
                  ) : (
                    <AiOutlineEyeInvisible className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Photos Section */}
          <div className="">
            {/* <h3 className="text-lg font-semibold text-gray-700">Business Photos</h3> */}
            <p className="text-xs text-gray-500">
              Upload 1-6 photos of your business
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3">
              {photosPreviews.map((photo, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={photo.preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                  >
                    <MdCancel className="text-lg" />
                  </button>
                </div>
              ))}
              {photosPreviews.length < 6 && (
                <div
                  {...getPhotosRootProps()}
                  className={`aspect-square flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer ${
                    errors.photos ? "border-red-500" : "border-gray-300"
                  } hover:border-blue-500 transition-colors`}
                >
                  <input {...getPhotosInputProps()} />
                  <FaCloudUploadAlt className="h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Add Photo</p>
                </div>
              )}
            </div>
          </div>
          <div className="">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    agreeToTerms: e.target.checked,
                  }))
                }
                className="mr-2"
              />
              <label htmlFor="agreeToTerms" className="text-xs text-gray-600">
                I agree to the{" "}
                <a href="/terms" className="blue-link">
                  Terms and Conditions
                </a>
              </label>
            </div>
            <div className="h-2">
              {errors.agreeToTerms && (
                <p className="text-red-500 text-[10px] sm:text-xs mt-0.5">
                  {errors.agreeToTerms}
                </p>
              )}
            </div>
            <div className="h-2 mb-2">
              {successMessage && (
                <>
                  <p className="flex justify-center items-center text-green-600 text-[10px] sm:text-xs">
                    <CiCircleInfo className="mr-2 text-green-600 w-3 h-3 flex-shrink-0" />
                    {successMessage}
                  </p>
                </>
              )}
              {errorOverall && (
                <>
                  <p className="flex justify-center items-center text-red-500 text-[10px] sm:text-xs">
                    <CiCircleInfo className="mr-2 text-red-600 w-3 h-3 flex-shrink-0" />
                    {errorOverall}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full text-[11px] sm:text-xs font-semibold py-2.5 sm:py-3 rounded-lg transition-all duration-200 ${
            isSubmitting
              ? "bg-gray-300 cursor-not-allowed text-gray-500"
              : "bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
          }`}
        >
          {isSubmitting ? "REGISTERING..." : "REGISTER"}
        </button>
        <div className="text-center mt-4 text-xs text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => {
              onClose();
              setShowLoginModal(true);
            }}
            className="text-purple-600 hover:text-purple-700 font-medium cursor-pointer"
          >
            Login
          </button>
        </div>
      </form>
    </CustomModal>
  );
};

export default BusinessDetailForm;

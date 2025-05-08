import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import CustomTable from '../../../Components/Table';
import CustomModal from '../../../Components/modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { API } from '../../../../config/config';
import FloatingInput from '../../../Components/FloatingInput';
import { MdCancel, MdEdit } from 'react-icons/md';
import { uploadToCloudinary } from '../../../utils/cloudinaryUpload';
import FloatingTextarea from '../../../Components/FloatingInput/FloatingTextarea';
import Loader from '../../../Components/Loader';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    icon: null,
    description: '',
    categoryType: ''
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(null);

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
        <img src={row.imageUrl} alt={row.name} className="w-16 h-16 object-cover rounded" />
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2 justify-center">
          <button onClick={() => handleEdit(row)} className="p-2 text-green-500 transition-colors" title="Edit">
            <FaEdit className="text-sm cursor-pointer" />
          </button>
          <button onClick={() => handleDelete(row)} className="p-2 text-red-500 transition-colors" title="Delete">
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
    } else if (formData.name.length > 50) {
      newErrors.name = 'Name must be less than 50 characters';
    } else if (!/^[a-zA-Z0-9\s&]+$/.test(formData.name)) {
      newErrors.name = 'Only letters, numbers, spaces, and & are allowed';
    }

    if (!formData.description) {
      newErrors.description = 'Description is required';
    }

    if (!formData.categoryType) {
      newErrors.categoryType = 'Category type is required';
    }

    if (!selectedCategory) {
      if (!formData.image) {
        newErrors.image = 'Image is required';
      }
      if (!formData.icon) {
        newErrors.icon = 'Icon is required';
      }
    }

    if (formData.image && formData.image.size > 2 * 1024 * 1024) {
      newErrors.image = 'Image size must be less than 2MB';
    }

    if (formData.icon && formData.icon.size > 2 * 1024 * 1024) {
      newErrors.icon = 'Icon size must be less than 2MB';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      const onlyLetters = value.replace(/[^a-zA-Z\s&]/g, '');
      setFormData(prev => ({ ...prev, [name]: onlyLetters }));
      setErrors(prev => ({ ...prev, name: value !== onlyLetters ? 'Only letters and spaces are allowed' : '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };


  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size must be less than 2MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, image: '' }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    maxFiles: 1
  });

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API}/categories`);
      const transformedData = response.data.data.map(category => ({
        id: category._id,
        name: category.displayName,
        imageUrl: category.imageUrl,
        iconUrl: category.iconUrl,
        description: category.description,
        categoryType: category.categoryType
      }));
      setCategories(transformedData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const [iconPreview, setIconPreview] = useState(null);

  // Add separate onDrop handler for icon
  const onDropIcon = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, icon: 'Icon size must be less than 2MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, icon: file }));
      setIconPreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, icon: '' }));
    }
  }, []);

  // Add separate dropzone for icon
  const { getRootProps: getIconRootProps, getInputProps: getIconInputProps, isDragActive: isIconDragActive } = useDropzone({
    onDrop: onDropIcon,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    maxFiles: 1
  });

  // Update handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        let imageUrl = null;
        let iconUrl = null;

        if (formData.image) {
          imageUrl = await uploadToCloudinary(formData.image);
        }
        if (formData.icon) {
          iconUrl = await uploadToCloudinary(formData.icon);
        }

        const payload = {
          categoryName: formData.name.toLowerCase().trim().replace(/\s+/g, '_'),
          displayName: formData.name.trim(),
          description: formData.description,
          categoryType: formData.categoryType,
          isActive: true,
          iconUrl: selectedCategory ? (iconUrl || selectedCategory.iconUrl) : iconUrl,
          imageUrl: selectedCategory ? (imageUrl || selectedCategory.imageUrl) : imageUrl
        };

        if (selectedCategory) {
          await axios.put(`${API}/categories/${selectedCategory.id}`, payload);
          toast.success('Category updated successfully');
          console.log(formData);

        } else {
          await axios.post(`${API}/categories`, payload);
          toast.success('Category added successfully');
        }

        await fetchCategories();
        setShowModal(false);
        resetForm();
      } catch (error) {
        console.error('Error handling category:', error);
        toast.error(error.response?.data?.message || 'Failed to process category');
      }
    }
  };

  // Update resetForm
  const resetForm = () => {
    setImagePreview(null);
    setIconPreview(null);
    setErrors({});
    setFormData({
      name: '',
      image: null,
      icon: null,
      description: '',
      categoryType: ''
    });
    setSelectedCategory(null);
  };

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
      image: null,
      icon: null,
      description: category.description || '',
      categoryType: category.categoryType || ''
    });
    setImagePreview(category.imageUrl);
    setIconPreview(category.iconUrl);
    setShowModal(true);
  };

  const handleDelete = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  return (
    <div className="p-6">
      {isLoading && <Loader />}
      <div className='shadow bg-white p-6 rounded-lg'>
        <h1 className="text-2xl font-bold mb-6">Category Management</h1>
        <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui atque iure reprehenderit harum tempora ex voluptas dolor recusandae aliquam nostrum mollitia totam deleniti reiciendis consequuntur odio, nam eaque voluptatibus eius maxime. Repellat alias quas distinctio voluptatem molestiae quasi nulla nemo!</span>

        {/* <button
          onClick={() => {
            setSelectedCategory(null);
            setShowModal(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add
        </button> */}
      </div>

      <div className="flex flex-wrap mt-4 bg-white p-4 shadow rounded gap-4">
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
              onClick={() => handleEdit(category)}
              className="cursor-pointer mr-2 text-green-500  hover:text-green-800 transition-all duration-200"
              title="Edit"
            >
              <FaEdit className="text-base" />
            </button>
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
          resetForm();
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
              className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Category Name"
              maxLength={50}
              error={errors.name}
            />
          </div>

          <div>
            <FloatingTextarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
              className={`w-full px-4 py-3 rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
              error={errors.description}
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category Type</label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="categoryType"
                  value="product"
                  checked={formData.categoryType === 'product'}
                  onChange={handleInputChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Product</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="categoryType"
                  value="service"
                  checked={formData.categoryType === 'service'}
                  onChange={handleInputChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Service</span>
              </label>
            </div>
            {errors.categoryType && (
              <p className="mt-1 text-xs text-red-500">{errors.categoryType}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
            >
              <input {...getInputProps()} />
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-32 h-32 mx-auto object-cover rounded" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImagePreview(null);
                      setFormData(prev => ({ ...prev, image: null }));
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <MdCancel />
                  </button>
                </div>
              ) : (
                <div>
                  <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Drag & drop or click to upload image</p>
                </div>
              )}
            </div>
            {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image}</p>}
          </div>

          {/* Icon Upload */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Icon</label>
            <div
              {...getIconRootProps()}
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${isIconDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
            >
              <input {...getIconInputProps()} />
              {iconPreview ? (
                <div className="relative">
                  <img src={iconPreview} alt="Icon Preview" className="w-16 h-16 mx-auto object-cover rounded" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIconPreview(null);
                      setFormData(prev => ({ ...prev, icon: null }));
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <MdCancel />
                  </button>
                </div>
              ) : (
                <div>
                  <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Drag & drop or click to upload icon</p>
                </div>
              )}
            </div>
            {errors.icon && <p className="mt-1 text-xs text-red-500">{errors.icon}</p>}
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
              className="px-6 py-2.5 cursor-pointer rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-6 py-2.5 cursor-pointer rounded-lg text-white bg-red-600 hover:bg-red-700 transition duration-200"
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


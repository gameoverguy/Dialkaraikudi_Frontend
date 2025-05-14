import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../../../config/config';
import CustomModal from '../../../Components/modal';
import BusinessDetails from './components/BusinessDetails';
import BusinessAddress from './components/BusinessAddress';
import BusinessHours from './components/BusinessHours';
import VerificationStatus from './components/VerificationStatus';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../../Components/Loader';
import BusinessImages from './components/BusinessImages';

const VendorProfile = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [formData, setFormData] = useState({});


  const fetchBusinessDetails = async () => {
    try {
      const response = await axios.get(`${API}/business/${id}`);
      setBusiness(response.data.data);
      console.log(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching business details:', error);
    }
  };

  useEffect(() => {
    fetchBusinessDetails();
  }, [id]);

  const handleEdit = (section, data) => {
    setEditSection(section);
    setFormData(data);
    setShowModal(true);
  };

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.put(`${API}/business/${id}`, formData);
      if (response.data.success) {
        toast.success('Business details updated successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          toastId: 'success1' // Prevent duplicate toasts
        });
        await fetchBusinessDetails();
        return response.data;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating business details', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId: 'error1' // Prevent duplicate toasts
      });
      throw error;
    }
  };

  if (loading) return <div><Loader/></div>;

  return (
    <>
      <ToastContainer />
      <div className="p-2">
        <div className='bg-white shadow rounded mb-4 p-4'>
          <h1 className='mb-2 text-2xl font-bold'>Profile</h1>
          <p>The profile section allows vendors to manage business details and update address information, ensuring accurate contact data and a professional presence on the platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BusinessDetails
            business={business}
            onEdit={handleEdit}
            fetchBusinessDetails={fetchBusinessDetails}
            onSubmit={handleSubmit}
          />
          <BusinessHours
            business={business}
            onEdit={handleEdit}
            fetchBusinessDetails={fetchBusinessDetails}
            onSubmit={handleSubmit}
          />
          <BusinessAddress
            business={business}
            onEdit={handleEdit}
            fetchBusinessDetails={fetchBusinessDetails}
            onSubmit={handleSubmit}
          />
         
          <VerificationStatus business={business} />
        </div>
        
        <BusinessImages
            business={business}
            onEdit={handleEdit}
            onSubmit={handleSubmit}
          />
      </div>
    </>
  );
};

export default VendorProfile;
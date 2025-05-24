import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../../config/config";
import BusinessDetails from "./components/BusinessDetails";
import BusinessAddress from "./components/BusinessAddress";
import BusinessHours from "./components/BusinessHours";
import VerificationStatus from "./components/VerificationStatus";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Components/Loader";
import BusinessImages from "./components/BusinessImages";

const VendorProfile = ({ businessData }) => {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBusinessDetails = async () => {
    try {
      const response = await axios.get(`${API}/business/${businessData.user_id}`);
      setBusiness(response.data.data);      
      setLoading(false);
      console.log(response.data.data);
      
    } catch (error) {
      console.error("Error fetching business details:", error);
    }
  };

  useEffect(() => {
    fetchBusinessDetails();
  }, []); // Added dependency array to prevent infinite loop

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.put(
        `${API}/business/${businessData.user_id}`,
        formData
      );
      console.log(formData);
      
      if (response.data.success) {
        toast.success("Business details updated successfully");
        await fetchBusinessDetails();
        return response.data;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating business details");
      throw error;
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <ToastContainer />
      <div className="p-2">
        <div className="bg-white shadow rounded mb-4 p-4">
          <h1 className="mb-2 text-2xl font-bold">Profile</h1>
          <p>The profile section allows vendors to manage business details and update address information.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <BusinessDetails
            business={business}
            fetchBusinessDetails={fetchBusinessDetails}
            onSubmit={handleSubmit}
          />
          <BusinessHours
            business={business}
            fetchBusinessDetails={fetchBusinessDetails}
            onSubmit={handleSubmit}
          />
          <BusinessAddress
            business={business}
            onSubmit={handleSubmit}
            fetchBusinessDetails={fetchBusinessDetails}
          />
          <VerificationStatus business={business} />
        </div>

        <BusinessImages
          business={business}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default VendorProfile;

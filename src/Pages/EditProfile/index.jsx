import axios from "axios";
import FloatingInput from "../../Components/FloatingInput";
import { useEffect, useState } from "react";
import { API } from "../../../config/config";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    user_id: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (userData?.user_id) {
          const response = await axios.get(`${API}/user/${userData.user_id}`);
          const user = response.data;

          setFormData({
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            user_id: userData.user_id,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Only allow name field to be changed
    if (name === 'name') {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      // Only send name in the update request
      const updateData = {
        name: formData.name,
      };
      
      const response = await axios.put(
        `${API}/user/${userData.user_id}`,
        updateData
      );
      
      if (response?.data && (response.data.success || response.status === 200)) {
        const updatedUserData = {
          ...userData,
          name: formData.name, // Only update the name
        };
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
        window.location.href = '/';
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Edit Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FloatingInput
              type="text"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <FloatingInput
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={true}
              className="bg-gray-50 cursor-not-allowed"
            />

            <FloatingInput
              type="tel"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={true}
              className="bg-gray-50 cursor-not-allowed"
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 text-white rounded-lg transition-all duration-200 ${
                isLoading
                  ? "bg-emerald-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Updating...
                </div>
              ) : (
                "Update Profile"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../../config/config";
import axios from "axios";
axios.defaults.withCredentials = true;

export const AdminRoute = ({ children }) => {
  const [isVerified, setIsVerified] = useState(null); // null: loading, true/false: known

  useEffect(() => {
    const verifyAdminToken = async () => {
      try {
        const response = await axios.get(`${API}/authentication/verifytoken`);
        setIsVerified(response.data.isTokenValid);
      } catch (error) {
        console.error("Admin token verification failed:", error);
        setIsVerified(false);
      }
    };

    verifyAdminToken();
  }, []);

  if (isVerified === null) {
    return null; // or a spinner/loading UI
  }

  if (!isVerified) {
    sessionStorage.clear();
    localStorage.clear();
    return <Navigate to="/adminlogin" replace />;
  }

  return children;
};

export const BusinessRoute = ({ children }) => {
  const [isVerified, setIsVerified] = useState(null); // null: loading, true/false: known

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`${API}/authentication/verifytoken`);
        setIsVerified(response.data.isTokenValid);
      } catch (error) {
        console.error("Token verification failed:", error);
        setIsVerified(false);
      }
    };

    verifyToken();
  }, []);

  if (isVerified === null) {
    return null; // or a spinner while verifying
  }

  if (!isVerified) {
    sessionStorage.clear();
    localStorage.clear();
    return <Navigate to="/" replace />;
  }

  return children;
};

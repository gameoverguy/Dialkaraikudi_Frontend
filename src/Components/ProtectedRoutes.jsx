import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const AdminRoute = ({ children }) => {
  const [adminData, setAdminData] = useState(undefined);

  useEffect(() => {
    setAdminData(sessionStorage.getItem("adminData"));
  }, []);

  if (adminData === undefined) {
    return null; // or a loading spinner while checking sessionStorage
  }

  if (!adminData) {
    return <Navigate to="/adminlogin" replace />;
  }

  return children;
};

export const BusinessRoute = ({ children }) => {
  const [businessData, setBusinessData] = useState(undefined);

  useEffect(() => {
    setBusinessData(sessionStorage.getItem("businessData"));
  }, []);

  if (businessData === undefined) {
    return null; // or a loading spinner while checking sessionStorage
  }

  if (!businessData) {
    return <Navigate to="/" replace />;
  }

  return children;
};

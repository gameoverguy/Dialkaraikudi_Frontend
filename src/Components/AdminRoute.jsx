import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const AdminRoute = ({ children }) => {
  const adminToken = Cookies.get('adminToken');
  console.log(adminToken);
  
  if (!adminToken) {
    return <Navigate to="/adminlogin" replace />;
  } 
  return children;
};

export const VendorRoute = ({ children }) => {
  const businessToken = Cookies.get('businessToken');
  console.log(businessToken);
  
  if (!businessToken) {
    return <Navigate to="/" replace />;
  } 
  return children;
};
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const AdminRoute = ({ children }) => {
  const adminToken = Cookies.get('adminToken');
  console.log(adminToken);
  
  // const isDirectAccess = !document.referrer.includes(window.location.host);

  if ( !adminToken) {
    return <Navigate to="/adminlogin" replace />;
  } return children;
};



export const VendorRoute = ({ children }) => {
  const businessToken = Cookies.get('businessToken');
  console.log(businessToken);
  
  // const isDirectAccess = !document.referrer.includes(window.location.host);

  if ( !businessToken) {
    return <Navigate to="/" replace />;
  } return children;
};

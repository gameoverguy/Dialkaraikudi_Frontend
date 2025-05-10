import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminRoute = ({ children }) => {
  const adminToken = Cookies.get('adminToken');
  const businessToken = Cookies.get('businessToken');
  
  // const isDirectAccess = !document.referrer.includes(window.location.host);

  if ( !adminToken) {
    return <Navigate to="/adminlogin" replace />;
  }
  else if (!businessToken) {
    return <Navigate to="/" replace />;
  }


  return children;
};

export default AdminRoute;
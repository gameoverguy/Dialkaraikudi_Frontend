import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminRoute = ({ children }) => {
  const adminToken = Cookies.get('adminToken');
  const isDirectAccess = !document.referrer.includes(window.location.host);

  if (isDirectAccess || !adminToken) {
    return <Navigate to="/adminlogin" replace />;
  }

  return children;
};

export default AdminRoute;
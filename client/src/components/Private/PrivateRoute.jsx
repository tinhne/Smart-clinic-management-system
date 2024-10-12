import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("access_token"); // Check for token in localStorage
  const role = localStorage.getItem("role");
  // eslint-disable-next-line react/prop-types
  if (!token || !allowedRoles.includes(role)) {
    // Redirect to login page if not authenticated or role not allowed
    return <Navigate to="/admin/login" />;
  }
  return <Outlet />;
};

export default PrivateRoute;

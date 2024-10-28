import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

// eslint-disable-next-line react/prop-types
const PrivateRouteDoctor = ({ allowedRoles }) => {
  const token = Cookies.get("access_token");
  const role = Cookies.get("role");

  // eslint-disable-next-line react/prop-types
  if (!token || !allowedRoles.includes(role)) {
    return <Navigate to="/login-register" />;
  }

  return <Outlet />;
};

export default PrivateRouteDoctor;

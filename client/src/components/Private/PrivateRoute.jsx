import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("access_token"); // Check for token in localStorage
  const role = localStorage.getItem("role");
  if (!token || role !== "admin") {
    return <Navigate to="/admin/login" />;
  }
  return <Outlet />;
};

export default PrivateRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("access_token"); // Check for token in localStorage

  return token ? <Outlet /> : <Navigate to="/admin/login" />; // Redirect to login if not authenticated
};

export default PrivateRoute;

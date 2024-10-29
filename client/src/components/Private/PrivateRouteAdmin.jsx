import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie"; // Thư viện quản lý Cookies

// eslint-disable-next-line react/prop-types
const PrivateRouteAdmin = ({ allowedRoles }) => {
  const token = Cookies.get("access_token"); // Lấy token từ Cookies
  const role = Cookies.get("role"); // Lấy role từ Cookies

  // Kiểm tra xem token và vai trò có hợp lệ hay không
  // eslint-disable-next-line react/prop-types
  if (!token || !allowedRoles.includes(role)) {
    // Nếu không hợp lệ, điều hướng về trang đăng nhập
    return <Navigate to="/admin/login" />;
  }

  // Nếu hợp lệ, render các thành phần con
  return <Outlet />;
};



export default PrivateRouteAdmin;

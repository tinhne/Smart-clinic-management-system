import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");

    navigate("/admin/login");
  }, [navigate]);

  return (
    <div>
      <h2>Đang đăng xuất...</h2>{" "}
    </div>
  );
};

export default Logout;

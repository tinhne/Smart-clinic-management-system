import React, { useState } from "react";
import "../../style/userProfile/profileSidebar.scss";
import "../../style/userProfile/ChangePassword.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons

const ChangePassword = () => {
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);

  const toggleCurrentPasswordVisibility = () => {
    setCurrentPasswordVisible(!currentPasswordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  return (
    <div className="change-password-container">
      <h2>Thay đổi mật khẩu</h2>
      <form>
        <div className="form-group">
          <label>Mật khẩu hiện tại</label>
          <div className="password-input-container">
            <input
              type={currentPasswordVisible ? "text" : "password"}
              placeholder="Mật khẩu hiện tại"
            />
            <span
              className="toggle-password-icon"
              onClick={toggleCurrentPasswordVisibility}
            >
              {currentPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="form-group">
          <label>Mật khẩu mới</label>
          <div className="password-input-container">
            <input
              type={newPasswordVisible ? "text" : "password"}
              placeholder="Nhập mật khẩu mới"
            />
            <span
              className="toggle-password-icon"
              onClick={toggleNewPasswordVisibility}
            >
              {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Thay đổi
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/adminStyle/loginAdmin.scss";
import logoAdmin from "../../assets/img/logoAdmin.png";
import { loginAdmin } from "../../services/loginAdmin";
import Cookies from "js-cookie"; // Thư viện quản lý Cookies

function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = "Email không được để trống.";
    } else if (!emailPattern.test(email)) {
      errors.email = "Email không hợp lệ.";
    }

    if (!password) {
      errors.password = "Mật khẩu không được để trống.";
    } else if (password.length < 6) {
      errors.password = "Mật khẩu phải chứa ít nhất 6 ký tự.";
    }

    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    } else {
      setValidationErrors({});
    }

    try {
      const response = await loginAdmin(email, password);
      console.log("Login response:", response);

      if (response && response.EC === 0) {
        Cookies.set("access_token", response.token, {
          secure: true,
          sameSite: "Strict",
        });
        const usernameSafe = response.username.replace(/ /g, "_");
        Cookies.set("username", usernameSafe, {
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("role", response.role, { secure: true, sameSite: "Strict" });
        const role = Cookies.get('role');

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          setErrorMessage("Bạn không có quyền truy cập vào trang này.");
        }
      } else {
        setErrorMessage(
          response?.EM || "Đăng nhập thất bại. Vui lòng thử lại."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <div className="login-page">
      {/* Left Side - Login Form */}
      <div className="login-form-container">
        <div className="login-form">
          <h1>
            Caps<span>tone1</span>
          </h1>
          <p>Đăng nhập</p>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleLogin}>
            <div>
              <input
                type="email"
                placeholder="Tài khoản"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {validationErrors.email && (
                <p className="error-message">{validationErrors.email}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {validationErrors.password && (
                <p className="error-message">{validationErrors.password}</p>
              )}
            </div>
            <button type="submit">Đăng nhập</button>
          </form>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="login-illustration">
        <img src={logoAdmin} alt="Illustration" />
      </div>
    </div>
  );
}

export default LoginAdmin;

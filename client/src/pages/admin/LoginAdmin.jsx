import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/adminStyle/loginAdmin.scss";
import logoAdmin from "../../assets/img/logoAdmin.png";
import { loginAdmin } from "../../services/loginAdmin";

function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginAdmin(email, password);
      console.log("Login response:", response);

      if (response && response.EC === 0) {
        localStorage.setItem("access_token", response.token);
        navigate("/admin/dashboard");
      } else {
        setErrorMessage(
          response?.EM || "Đăng nhập thất bại. Vui lòng thử lại."
        ); // Display error message
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
          {/* Display error message */}
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Tài khoản"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              required
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              required
            />
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

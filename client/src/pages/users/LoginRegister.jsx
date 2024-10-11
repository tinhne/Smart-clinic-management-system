import React, { useState } from "react";
import "../../style/LoginRegister.scss"; // Đảm bảo bạn đã tạo file CSS này
import { LoginApi, ResgisterApi } from "../../utils/AuthAPI/LoginRegisterAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginRegister = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const navigate = useNavigate();

  // Arrow function for toggling the form between login and register
  const toggleForm = () => {
    setIsRegistering(prevState => !prevState);
  };

  // Arrow function for login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      if (!email) toast.error("Vui lòng nhập email.");
      if (!password) toast.error("Vui lòng nhập mật khẩu.");
      return;
    }

    try {
      const res = await LoginApi(email, password);
      if (res && res.EC === 0) {
        localStorage.setItem("access_token", res.token);
        localStorage.setItem("username", res.username);
        toast.success(res.EM);
        navigate("/");
      } else {
        toast.error(res.EM || "Đăng nhập không thành công!");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(
        error.response?.data?.message ||
        "Có lỗi xảy ra trong quá trình đăng nhập!"
      );
    }
  };

  // Arrow function for register
  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phone ||
      !address ||
      !gender ||
      !birthdate
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Email không hợp lệ.");
      return;
    }

    const phonePattern = /^[0-9]{10,15}$/;
    if (!phonePattern.test(phone)) {
      toast.error("Số điện thoại không hợp lệ. Nó phải từ 10 đến 15 ký tự số.");
      return;
    }

    if (password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    const birthdatePattern = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
    if (!birthdatePattern.test(birthdate)) {
      toast.error("Ngày sinh không hợp lệ. Định dạng phải là YYYY-MM-DD.");
      return;
    }

    try {
      const res = await ResgisterApi(
        firstName,
        lastName,
        email,
        password,
        phone,
        address,
        gender,
        birthdate
      );
      if (res && res.EC === 0) {
        toast.success(res.EM);
        setIsRegistering(false);
      } else {
        toast.error(res.EM || "Đăng ký không thành công!");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(
        error.response?.data?.message ||
        "Có lỗi xảy ra trong quá trình đăng ký!"
      );
    }
  };

  return (
    <div className="container">
      <div className="form-left">
        <h2>Welcome back</h2>
        <p>Chào mừng bạn đến với phòng khám của chúng tôi</p>
        <button className="sign-in-btn" onClick={toggleForm}>
          {isRegistering ? "Sign in" : "Sign up"}
        </button>
      </div>
      <div className="form-right">
        <h2>{isRegistering ? "Sign up" : "Sign in"}</h2>
        <div className="social-icons">{/* Social login icons */}</div>
        {isRegistering ? (
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="" disabled>
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="sign-up-btn">
              Sign up
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="sign-in-btn">
              Sign in
            </button>
            <p className="forgot-password">
              <a href="#">Forgot Password?</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;

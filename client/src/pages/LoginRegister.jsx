import React, { useState } from 'react';
import '../style/LoginRegister.scss'; // Đảm bảo bạn đã tạo file CSS này

function LoginRegister() {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="container">
      <div className="form-left">
        <h2>Welcome back</h2>
        <p>Chào mừng bạn đến với phòng khám của chúng tôi</p>
        <button className="sign-in-btn" onClick={toggleForm}>
          {isRegistering ? 'Sign in' : 'Sign up'}
        </button>
      </div>
      <div className="form-right">
        <h2>{isRegistering ? 'Sign up' : 'Sign in'}</h2>
        <div className="social-icons">
          {/* <a href="#"><img src="src/assets/img/fb2.png" alt="Facebook" /></a>
          <a href="#"><img src="src/assets/img/gg1.png" alt="Google" /></a>
          <a href="#"><img src="src/assets/img/git.png" alt="LinkedIn" /></a> */}
        </div>
        {isRegistering ? (
          <form>
            <div className="input-group">
              <input type="text" placeholder="First Name" required />
              <input type="text" placeholder="Last Name" required />
            </div>
            <div className="input-group">
              <input type="email" placeholder="Email" required />
              <input type="text" placeholder="Phone" required />
            </div>
            <div className="input-group">
              <input type="text" placeholder="Address" required />
              <select required>
                <option value="" disabled selected>Gender</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>
            <div className="input-group">
              <input type="password" placeholder="Password" required />
              <input type="date" required />
            </div>
            <button type="submit" className="sign-up-btn">Sign up</button>
          </form>
        ) : (
          <form>
            <div className="form-group">
              <input type="email" placeholder="Email" required />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Password" required />
            </div>
            <button type="submit" className="sign-in-btn">Sign in</button>
            <p className="forgot-password"><a href="#">Forgot Password?</a></p>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginRegister;
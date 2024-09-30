const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Đăng ký tài khoản mới
const register = async (
  first_name,
  last_name,
  phone,
  address,
  gender,
  password,
  role,
  email,
  birthdate
) => {
  try {
    // Kiểm tra nếu email đã tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: "Email đã tồn tại" };
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo bệnh nhân mới
    const patient = await User.create({
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      address: address,
      gender: gender,
      password: hashedPassword, // Lưu mật khẩu đã hash
      role: role,
      email: email,
      birthdate: birthdate,
    });

    return { success: true, patient: patient };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Lỗi đăng ký" };
  }
};

module.exports = { register };

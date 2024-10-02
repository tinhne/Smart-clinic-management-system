const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.register = async (userData) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    address,
    gender,
    password,
    birthdate,
    role,
  } = userData;

  // Chỉ cho phép đăng ký với role là "patient"
  if (role && role !== "patient") {
    throw new Error("Chỉ bệnh nhân mới có thể đăng ký tài khoản");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email đã tồn tại trong hệ thống");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    first_name,
    last_name,
    email,
    phone,
    address,
    gender,
    password: hashedPassword,
    birthdate,
    role: "patient",
  });

  await newUser.save();

  return newUser;
};

// Đăng nhập cho tất cả người dùng
exports.login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Tài khoản không tồn tại");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Mật khẩu không chính xác");
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token, role: user.role };
  } catch (error) {
    throw new Error(error.message);
  }
};

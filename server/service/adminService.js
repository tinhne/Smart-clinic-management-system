const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Tạo tài khoản bac si
// src/service/adminService.js
exports.createDoctor = async (doctorData) => {
  const { email, password, imageUrl, ...restData } = doctorData;

  if (!password) {
    return { success: false, message: "Mật khẩu không được để trống" };
  }

  if (!email) {
    return { success: false, message: "Email không được để trống" };
  }

  console.log("Dữ liệu bác sĩ trước khi lưu vào DB: ", {
    ...restData,
    email,
    imageUrl,
  });
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: "Tài khoản đã tồn tại" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = new User({
      ...restData,
      password: hashedPassword,
      role: "doctor",
      imageUrl: Buffer.from(imageUrl, "base64"),
      email,
    });

    await newDoctor.save();

    return { success: true, user: newDoctor };
  } catch (error) {
    console.error("Lỗi khi tạo bác sĩ: ", error);
    return { success: false, message: "Lỗi khi tạo bác sĩ" };
  }
};

// Lay tat ca nguoi dung theo role
exports.getAllUsersByRole = async (role, page = 1, limit = 5) => {
  try {
    if (role && role === "admin") {
      return { message: "Bạn không có quyền xem thông tin admin" };
    }

    const skip = (page - 1) * limit; // Bỏ qua số lượng người dùng ở các trang trước
    const users = await User.find({ role })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments({ role }); // Tổng số người dùng có role tương ứng
    const totalPages = Math.ceil(totalUsers / limit); // Tổng số trang

    return { success: true, users, totalUsers, totalPages, currentPage: page };
  } catch (error) {
    console.error(
      `Lỗi khi lấy thông tin người dùng với vai trò ${role}: `,
      error
    );
    return {
      success: false,
      message: `Lỗi khi lấy thông tin người dùng với vai trò ${role}`,
    };
  }
};

// lay tat ca nguoi dung theo role va id
exports.getUserById = async (userId, role) => {
  try {
    const user = await User.findOne({ _id: userId, role });
    if (!user) {
      return {
        success: false,
        message: `Không tìm thấy người dùng với vai trò ${role}`,
      };
    }
    return { success: true, user };
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng: ", error);
    return { success: false, message: "Lỗi khi lấy thông tin người dùng" };
  }
};

// cap nhat thong tin nguoi dung theo id
exports.updateUser = async (userId, userData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { ...userData },
      { new: true }
    );
    if (!updatedUser) {
      return { success: false, message: "Không tìm thấy người dùng" };
    }
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin người dùng: ", error);
    return { success: false, message: "Lỗi khi cập nhật thông tin người dùng" };
  }
};

// Xoa nguoi dung theo id
exports.deleteUser = async (userId) => {
  try {
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    if (!deletedUser) {
      return { success: false, message: "Không tìm thấy người dùng" };
    }
    return { success: true, message: "Xóa người dùng thành công" };
  } catch (error) {
    console.error("Lỗi khi xóa người dùng: ", error);
    return { success: false, message: "Lỗi khi xóa người dùng" };
  }
};

const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Tạo tài khoản người dùng
exports.createUser = async (userData) => {
  const { email, password, role } = userData;

  if (role === "admin") {
    return { success: false, message: "Admin không thể tạo tài khoản admin" };
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: "Tài khoản đã tồn tại" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      ...userData,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    return { success: true, user: newUser };
  } catch (error) {
    console.error("Lỗi khi tạo tài khoản: ", error);
    return { success: false, message: "Lỗi khi tạo tài khoản" };
  }
};

// Lay tat ca nguoi dung theo role
exports.getAllUsersByRole = async (role) => {
  try {
    if (role && role === "admin") {
      return { message: "Bạn không có quyền xem thông tin admin" };
    }
    const users = await User.find({ role });
    return { success: true, users };
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

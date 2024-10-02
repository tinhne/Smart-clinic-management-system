const {
  createUser,
  getAllUsersByRole,
  getUserById,
  updateUser,
  deleteUser,
} = require("../service/adminService");

// tao tai khoan nguoi dung
exports.createUser = async (req, res) => {
  const response = await createUser(req.body);

  if (response.success) {
    return res.status(201).json({
      message: `Tạo tài khoản ${req.body.role} thành công`,
      user: response.user,
    });
  } else {
    return res.status(400).json({ message: response.message });
  }
};

// lay tat ca nguoi dung theo role
exports.getAllUserByRole = async (req, res) => {
  const { role } = req.query;
  try {
    const response = await getAllUsersByRole(role);

    if (response.success) {
      return res.status(200).json({ users: response.users });
    } else {
      return res.status(404).json({ message: response.message });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Lỗi server khi lấy danh sách ${role}`, error });
  }
};

// lay thong tin nguoi dung theo id va role
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const { role } = req.query;

  try {
    const response = await getUserById(id, role);

    if (response.success) {
      return res.status(200).json({ user: response.user });
    } else {
      return res.status(404).json({ message: response.message });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server khi lấy thông tin người dùng", error });
  }
};

// cap nhat thong tin nguoi dung theo id
exports.updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await updateUser(id, req.body);

    if (response.success) {
      return res.status(200).json({
        message: "Cập nhật thông tin tài khoản thành công",
        user: response.user,
      });
    } else {
      return res.status(404).json({ message: response.message });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server khi cập nhật thông tin người dùng", error });
  }
};
// xoa tai khoan nguoi dung theo id
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await deleteUser(id);

    if (response.success) {
      return res.status(200).json({ message: response.message });
    } else {
      return res.status(404).json({ message: response.message });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server khi xóa tài khoản", error });
  }
};

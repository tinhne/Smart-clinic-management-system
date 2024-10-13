const { response } = require("express");
const {
  createDoctor,
  getAllUsersByRole,
  getUserById,
  updateUser,
  deleteUser,
} = require("../service/adminService");

// tao tai khoan bac si
// Tạo tài khoản bác sĩ
exports.createDoctor = async (req, res) => {
  console.log(req.body);

  const { doctorImage, email, ...otherData } = req.body;

  // Kiểm tra trường email
  if (!email) {
    return res.status(400).json({ message: "Email không được để trống." });
  }

  // Kiểm tra xem có ảnh được upload không
  if (!doctorImage) {
    return res
      .status(400)
      .json({ message: "Không có ảnh bác sĩ được tải lên." });
  }

  const imageData = doctorImage.replace(/^data:image\/\w+;base64,/, "");
  const response = await createDoctor({
    ...otherData,
    email,
    doctorImage: imageData,
  });

  if (response.success) {
    return res.status(201).json({
      message: "Tạo bác sĩ thành công",
      user: response.user,
    });
  } else {
    return res.status(400).json({ message: response.message });
  }
};

// lay tat ca nguoi dung theo role
exports.getAllUserByRole = async (req, res) => {
  const { role } = req.query;
  const page = parseInt(req.query.page) || 1; // Mặc định là trang 1 nếu không có page
  const limit = parseInt(req.query.limit) || 5; // Mặc định 10 bản ghi mỗi trang

  try {
    const response = await getAllUsersByRole(role, page, limit);

    if (response.success) {
      return res.status(200).json({
        users: response.users,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
      });
    } else {
      return res.status(404).json({ message: response.message });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Lỗi server khi lấy danh sách ${role}`, error });
  }
};
// exports.getAllUserByRole = async (req, res) => {
//   const { role } = req.query;
//   const page = parseInt(req.query.page) || 1; // Mặc định là trang 1
//   const limit = parseInt(req.query.limit) || 5; // Mặc định là 10 user mỗi trang

//   try {
//     const response = await getAllUsersByRole(role, page, limit);

//     if (response.success) {
//       return res.status(200).json({
//         users: response.users,
//         totalUsers: response.totalUsers,
//         totalPages: response.totalPages,
//         currentPage: response.currentPage,
//       });
//     } else {
//       return res.status(404).json({ message: response.message });
//     }
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: `Lỗi server khi lấy danh sách ${role}`, error });
//   }
// };

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

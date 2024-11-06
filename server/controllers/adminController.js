const { response } = require("express");
const {
  createDoctor,
  createPatient,
  getAllUsersByRole,
  getUserById,
  updateUser,
  deleteUser,
  getAllDoctorsBySpecialty,
} = require("../service/adminService");

// Tạo tài khoản bác sĩ
exports.createDoctor = async (req, res) => {
  const {
    doctorImage,
    email,
    title,
    description,
    certifications,
    ...otherData
  } = req.body;

  // Validate email
  if (!email) {
    return res.status(400).json({ message: "Email không được để trống." });
  }

  // Validate doctor image
  if (!doctorImage) {
    return res
      .status(400)
      .json({ message: "Không có ảnh bác sĩ được tải lên." });
  }

  // Ensure doctor image is a valid Base64 string
  const imageUrl = doctorImage.replace(/^data:image\/\w+;base64,/, "");
  if (!isBase64(imageUrl)) {
    return res
      .status(400)
      .json({ message: "Dữ liệu ảnh bác sĩ không hợp lệ." });
  }

  // Validate certifications (if provided)
  let formattedCertifications = [];
  if (certifications && Array.isArray(certifications)) {
    if (certifications.length > 3) {
      return res
        .status(400)
        .json({ message: "Chỉ có thể tải lên tối đa 3 ảnh giấy chứng nhận." });
    }

    for (const [index, cert] of certifications.entries()) {
      const certImage = cert.replace(/^data:image\/\w+;base64,/, "");
      console.log(`Checking certification image ${index + 1}:`, certImage);

      if (!isBase64(certImage)) {
        return res
          .status(400)
          .json({ message: "Một trong các ảnh giấy chứng nhận không hợp lệ." });
      }
      formattedCertifications.push(certImage);
    }
  }

  const response = await createDoctor({
    ...otherData,
    email,
    imageUrl,
    title,
    description,
    certifications: formattedCertifications,
  });

  if (response.success) {
    const doctorImageBase64 = `data:image/png;base64,${response.user.imageUrl}`;
    const certificationsBase64 = response.user.certifications.map(
      (cert) => `data:image/png;base64,${cert}`
    );

    return res.status(201).json({
      EC: 1,
      success: true,
      EM: "Tạo bác sĩ thành công",
      user: {
        ...response.user._doc,
        imageUrl: doctorImageBase64,
        certifications: certificationsBase64,
      },
    });
  } else {
    return res.status(400).json({ message: response.message });
  }
};

function isBase64(encodedString) {
  // Base64 string validation regex
  const regexBase64 = /^[A-Za-z0-9+/]+={0,2}$/;
  return regexBase64.test(encodedString); // return TRUE if it's a base64 string.
}
// Trong controller của bạn
exports.getDoctorsBySpecialty = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Kiểm tra nội dung body
    const specialty = req.body.specialty; // Lấy specialty từ req.body

    if (!specialty || typeof specialty !== "string") {
      console.error("Invalid specialty:", specialty); // Log giá trị không hợp lệ
      return res
        .status(400)
        .json({ success: false, message: "Chuyên khoa không hợp lệ" });
    }

    // Gọi hàm với specialty
    const result = await getAllDoctorsBySpecialty(specialty);

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Lỗi khi gọi API lấy bác sĩ theo chuyên khoa: ", error);
    return res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

exports.createPatient = async (req, res) => {
  const { patientImage, email, ...otherData } = req.body;

  // Kiểm tra email
  if (!email) {
    return res.status(400).json({ message: "Email không được để trống." });
  }

  // Kiểm tra hình ảnh
  if (!patientImage) {
    return res
      .status(400)
      .json({ message: "Không có ảnh bệnh nhân được tải lên." });
  }

  // Chắc chắn rằng ảnh là một chuỗi Base64 hợp lệ
  const imageUrl = patientImage.replace(/^data:image\/\w+;base64,/, "");

  if (!isValidBase64(imageUrl)) {
    return res.status(400).json({ message: "Dữ liệu ảnh không hợp lệ." });
  }

  const response = await createPatient({
    ...otherData,
    email,
    imageUrl: imageUrl, // Giữ nguyên chuỗi Base64
  });

  if (response.success) {
    // Chuyển đổi patientImage từ Buffer thành Base64
    const patientImageBase64 = response.user.imageUrl.toString("base64");

    return res.status(201).json({
      success: true,
      message: "Tạo bệnh nhân thành công",
      user: {
        ...response.user._doc, // Lấy toàn bộ các field từ user
        imageUrl: `data:image/png;base64,${patientImageBase64}`, // Bao gồm trường ảnh
      },
    });
  } else {
    return res.status(400).json({ message: response.message });
  }
};

// Hàm kiểm tra tính hợp lệ của chuỗi Base64

// lay tat ca nguoi dung theo role
exports.getAllUserByRole = async (req, res) => {
  const { role } = req.query;
  const page = parseInt(req.query.page) || 1; // Mặc định là trang 1 nếu không có page
  const limit = parseInt(req.query.limit) || 5; // Mặc định 10 bản ghi mỗi trang

  try {
    const response = await getAllUsersByRole(role, page, limit);

    if (response.success) {
      return res.status(200).json({
        success: true,
        users: response.users,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalUsers: response.totalUsers,
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
      return res.status(200).json({
        success: true,
        user: response.user,
      });
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
        success: true,
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
      return res.status(200).json({
        success: true,
        message: response.message,
      });
    } else {
      return res.status(404).json({ message: response.message });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server khi xóa tài khoản", error });
  }
};

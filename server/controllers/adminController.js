const {
  createDoctor,
  getDoctorById,
  getAllDoctors,
  updateDoctor,
  deleteDoctor,
} = require("../service/adminService");

// Tạo tài khoản bác sĩ
exports.createDoctor = async (req, res) => {
  const response = await createDoctor(req.body);

  if (response.success) {
    return res.status(201).json({
      message: "Tạo tài khoản bác sĩ thành công",
      doctor: response.doctor,
    });
  } else {
    return res.status(400).json({ message: response.message });
  }
};

// Lấy tất cả thông tin bác sĩ
exports.getAllDoctors = async (req, res) => {
  const response = await getAllDoctors();

  if (response.success) {
    return res.status(200).json({ doctors: response.doctors });
  } else {
    return res.status(404).json({ message: response.message });
  }
};

// Lấy thông tin bác sĩ theo ID
exports.getDoctor = async (req, res) => {
  const response = await getDoctorById(req.params.id);

  if (response.success) {
    return res.status(200).json({ doctor: response.doctor });
  } else {
    return res.status(404).json({ message: response.message });
  }
};

// Cập nhật thông tin bác sĩ
exports.updateDoctor = async (req, res) => {
  const response = await updateDoctor(req.params.id, req.body);

  if (response.success) {
    return res
      .status(200)
      .json({ message: "Cập nhật bác sĩ thành công", doctor: response.doctor });
  } else {
    return res.status(400).json({ message: response.message });
  }
};

// Xóa bác sĩ
exports.deleteDoctor = async (req, res) => {
  const response = await deleteDoctor(req.params.id);

  if (response.success) {
    return res.status(200).json({ message: response.message });
  } else {
    return res.status(400).json({ message: response.message });
  }
};

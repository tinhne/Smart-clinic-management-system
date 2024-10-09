const {
  createMedicine,
  getAllMedicines,
  updateMedicine,
  deleteMedicine,
} = require("../service/medicineService");

// tạo mới một loại thuốc
exports.createMedicine = async (req, res) => {
  const response = await createMedicine(req.body);

  if (response.success) {
    return res.status(201).json({
      message: "Tạo thuốc thành công",
      medicine: response.medicine,
    });
  } else {
    return res.status(400).json({ message: response.message });
  }
};

// lấy tất cả loại thuốc
exports.getAllMedicines = async (req, res) => {
  try {
    const response = await getAllMedicines();

    if (response.success) {
      return res.status(200).json({
        message: "Lấy danh sách thuốc thành công",
        medicines: response.medicines,
      });
    } else {
      return res.status(404).json({ message: response.message });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server khi lấy danh sách thuốc", error });
  }
};

// cập nhật thông tin thuốc theo id
exports.updateMedicine = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await updateMedicine(id, req.body);

    if (response.success) {
      return res.status(200).json({
        message: "Cập nhật thông tin thuốc thành công",
        medicine: response.medicine,
      });
    } else {
      return res.status(404).json({ message: response.message });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server khi cập nhật thông tin thuốc", error });
  }
};

// xóa thuốc theo id
exports.deleteMedicine = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await deleteMedicine(id);

    if (response.success) {
      return res.status(200).json({ message: "Xóa thuốc thành công" });
    } else {
      return res.status(404).json({ message: response.message });
    }
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server khi xóa thuốc", error });
  }
};

const {
  createService,
  getAllServices,
  updateService,
  deleteService,
} = require("../service/clinicService");

// tao dich vu phong kham
exports.createService = async (req, res) => {
  const response = await createService(req.body);

  try {
    if (response.success) {
      return res.status(201).json({
        message: "Tạo dịch vụ thành công",
        service: response.service,
      });
    } else {
      return res.status(400).json({ message: response.message });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server khi tạo dịch vụ", error });
  }
};

// lay tat ca dich vu phong kham
exports.getAllServices = async (req, res) => {
  try {
    const response = await getAllServices();

    if (response.success) {
      return res.status(200).json({ services: response.services });
    } else {
      return res.status(404).json({ message: response.message });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server khi lấy danh sách dịch vụ", error });
  }
};

// cap nhat dich vu phong kham theo id
exports.updateService = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await updateService(id, req.body);

    if (response.success) {
      return res.status(200).json({ service: response.service });
    } else {
      return res.status(404).json({ message: response.message });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server khi cập nhật dịch vụ", error });
  }
};

// xoa dich vu phong kham theo id
exports.deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await deleteService(id);

    if (response.success) {
      return res.status(200).json({ message: "Xóa dịch vụ thành công" });
    } else {
      return res.status(404).json({ message: response.message });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server khi xóa dịch vụ", error });
  }
};

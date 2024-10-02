const User = require("../models/User");
const bcrypt = require("bcryptjs");

// create account doctor
exports.createDoctor = async (doctorData) => {
  const { email, password } = doctorData; // Extract email and password from doctorData
  try {
    const exitsUser = await User.findOne({ email });
    if (exitsUser) {
      return { success: false, message: "Tài khoản đã tồn tại" };
    }

    // Hash password
    const salt = await bcrypt.hash(password, 10);

    // Create new doctor
    const newDoctor = new User({
      ...doctorData,
      password: salt,
      role: "doctor",
    });
    await newDoctor.save();
    return { success: true, doctor: newDoctor };
  } catch (error) {
    console.error("Lỗi khi tạo tài khoản bác sĩ: ", error);
    return { success: false, message: "Lỗi khi tạo tài khoản bác sĩ" };
  }
};

// Lay all thong tin bac si
exports.getAllDoctors = async () => {
  try {
    const doctors = await User.find({ role: "doctor" });
    return { success: true, doctors };
  } catch (error) {
    console.error("Lỗi khi lấy thông tin bác sĩ: ", error);
    return { success: false, message: "Lỗi khi lấy thông tin bác sĩ" };
  }
};

// Lấy thông tin bác sĩ theo ID
exports.getDoctorById = async (doctorId) => {
  try {
    const doctor = await User.findOne({ _id: doctorId, role: "doctor" });
    if (!doctor) {
      return { success: false, message: "Không tìm thấy bác sĩ" };
    }
    return { success: true, doctor };
  } catch (error) {
    console.error("Lỗi khi lấy thông tin bác sĩ: ", error);
    return { success: false, message: "Lỗi khi lấy thông tin bác sĩ" };
  }
};

// Cập nhật thông tin bác sĩ
exports.updateDoctor = async (doctorId, doctorData) => {
  try {
    const updatedDoctor = await User.findByIdAndUpdate(
      { _id: doctorId, role: "doctor" },
      { ...doctorData },
      { new: true }
    );
    if (!updatedDoctor) {
      return { success: false, message: "Không tìm thấy bác sĩ" };
    }
    return { success: true, doctor: updatedDoctor };
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin bác sĩ: ", error);
    return { success: false, message: "Lỗi khi cập nhật thông tin bác sĩ" };
  }
};

// Xóa bác sĩ theo ID
exports.deleteDoctor = async (doctorId) => {
  try {
    const deletedDoctor = await User.findOneAndDelete({
      _id: doctorId,
      role: "doctor",
    });
    if (!deletedDoctor) {
      return { success: false, message: "Không tìm thấy bác sĩ" };
    }
    return { success: true, message: "Xóa bác sĩ thành công" };
  } catch (error) {
    console.error("Lỗi khi xóa bác sĩ: ", error);
    return { success: false, message: "Lỗi khi xóa bác sĩ" };
  }
};

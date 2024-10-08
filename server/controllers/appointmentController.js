const appointmentService = require('../service/appointmentService');

// Bệnh nhân đặt lịch hẹn
exports.bookAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.bookAppointment(req.body, req.user._id);
    res.status(201).json({ msg: "Đặt lịch hẹn thành công!", appointment });
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra khi đặt lịch hẹn", error: error.message });
  }
};

// Admin xác nhận lịch hẹn và gửi SMS
exports.confirmAppointment = async (req, res) => {
  console.log(req.params);

  const { id } = req.params; // Đảm bảo req.params có chứa id

  try {
    const appointment = await appointmentService.confirmAppointment(id);
    res.status(200).json({ msg: "Lịch hẹn đã được xác nhận và SMS đã được gửi", appointment });
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra khi xác nhận lịch hẹn", error: error.message });
  }
};

// Bệnh nhân hủy lịch hẹn
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.cancelAppointment(req.params.id);
    res.status(200).json({ msg: "Lịch hẹn đã bị hủy", appointment });
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra khi hủy lịch hẹn", error: error.message });
  }
};

// Lấy lịch hẹn cho bác sĩ
exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await appointmentService.getDoctorAppointments(req.params.doctorId);
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra khi lấy lịch hẹn của bác sĩ", error: error.message });
  }
};

// Lấy lịch hẹn của bệnh nhân
exports.getPatientAppointments = async (req, res) => {
  try {
    const appointments = await appointmentService.getPatientAppointments(req.user._id);
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra khi lấy lịch hẹn của bệnh nhân", error: error.message });
  }
}
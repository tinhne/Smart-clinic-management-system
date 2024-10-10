const Appointment = require('../models/Appointment');
const Schedule = require('../models/Schedule');
const User = require('../models/User');
const { sendSMS } = require('./smsService'); // Adjust the path if needed

// Bệnh nhân đặt lịch hẹn
exports.bookAppointment = async (appointmentData, patientId) => {
  const { appointment_date, time_slot, doctor_id } = appointmentData;

  // Kiểm tra xem bác sĩ có lịch làm việc trong thời gian đó không
  const schedule = await Schedule.findOne({ doctor_id, date: appointment_date });
  if (!schedule || !schedule.available_slots.includes(time_slot)) {
    throw new Error("Khung giờ không có sẵn");
  }

  // Kiểm tra xem có lịch hẹn nào đã tồn tại không
  const existingAppointment = await Appointment.findOne({ 
    doctor_id, 
    appointment_date, 
    time_slot 
  });
  if (existingAppointment) {
    throw new Error("Lịch hẹn đã tồn tại cho thời gian này");
  }

  const appointment = new Appointment({
    appointment_date,
    time_slot,
    patient_id: patientId,
    doctor_id,
  });

  await appointment.save();
  return appointment;
};

// Admin xác nhận lịch hẹn và gửi SMS
exports.confirmAppointment = async (id) => {
  try {
    // Tìm lịch hẹn theo ID
    const appointment = await Appointment.findById(id); // Kiểm tra id được truyền vào
    if (!appointment) {
      throw new Error("Lịch hẹn không tồn tại");
    }

    // Cập nhật trạng thái của lịch hẹn thành confirmed
    appointment.status = "confirmed";
    await appointment.save();

    // Cập nhật lịch làm việc của bác sĩ để xóa khung giờ đã được đặt
    const schedule = await Schedule.findOne({ doctor_id: appointment.doctor_id, date: appointment.appointment_date });
    if (schedule) {
      // Xóa khung giờ đã đặt từ available_slots
      schedule.available_slots = schedule.available_slots.filter(slot => slot !== appointment.time_slot);
      await schedule.save();
    }

    // Gửi tin nhắn SMS cho bệnh nhân sau khi xác nhận
    const patient = await User.findById(appointment.patient_id); // Tìm thông tin bệnh nhân
    if (!patient) {
      throw new Error("Không tìm thấy thông tin bệnh nhân");
    }

    const message = `Lịch hẹn của bạn vào ngày ${appointment.appointment_date} khung giờ ${appointment.time_slot} đã được xác nhận.`;
    console.log(`Gửi SMS tới số: ${patient.phone} với nội dung: ${message}`);
    await sendSMS([patient.phone], message); // Gửi tin nhắn

    return appointment; // Trả về appointment sau khi xử lý
  } catch (error) {
    console.error('Lỗi khi xác nhận lịch hẹn:', error.message);
    throw new Error(error.message);
  }
};

// Bệnh nhân hủy lịch hẹn
exports.cancelAppointment = async (appointmentId) => {
  const appointment = await Appointment.findByIdAndUpdate(
    appointmentId,
    { status: "cancelled" },
    { new: true }
  );
  if (!appointment) {
    throw new Error("Lịch hẹn không tồn tại");
  }
  return appointment;
};

// Lấy lịch hẹn cho bác sĩ
exports.getDoctorAppointments = async (doctorId) => {
  const appointments = await Appointment.find({ doctor_id: doctorId });
  if (!appointments.length) {
    throw new Error("Không có lịch hẹn nào cho bác sĩ này.");
  }
  return appointments;
};

// Lấy lịch hẹn của bệnh nhân
exports.getPatientAppointments = async (patientId) => {
  const appointments = await Appointment.find({ patient_id: patientId });
  if (!appointments.length) {
    throw new Error("Không có lịch hẹn nào cho bệnh nhân này.");
  }
  return appointments;
};

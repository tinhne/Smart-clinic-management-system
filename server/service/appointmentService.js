const Appointment = require('../models/Appointment');
const Schedule = require('../models/Schedule');
const User = require('../models/User');
const { sendSMS } = require('./smsService'); // Adjust the path if needed

// Bệnh nhân đặt lịch hẹn
exports.BookingAppointment = async (appointmentData) => {
  // Lấy dữ liệu từ appointmentData
  const { appointment_date, time_slot, patient_id, doctor_id, note, appointment_type, video_call_link } = appointmentData;

  // Kiểm tra các trường bắt buộc
  if (!appointment_date || !time_slot || !patient_id || !doctor_id || !appointment_type) {
    throw new Error("Thiếu thông tin bắt buộc");
  }

  // Kiểm tra xem đã có lịch hẹn nào với bác sĩ và khung giờ này chưa
  const existingAppointment = await Appointment.findOne({
    doctor_id,
    appointment_date: new Date(appointment_date),
    time_slot,
  });

  if (existingAppointment) {
    throw new Error("Lịch hẹn này đã được đặt. Vui lòng chọn thời gian khác.");
  }

  // Tạo mới lịch hẹn
  const newAppointment = new Appointment({
    appointment_date,
    time_slot,
    patient_id,
    doctor_id,
    note,
    appointment_type,
    status:"confirmed",
    video_call_link: appointment_type === "online" ? video_call_link : "", // Chỉ lưu link nếu là khám online
  });

  // Lưu vào database
  await newAppointment.save();

  return newAppointment; // Trả về lịch hẹn đã tạo
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



// Lấy lịch hẹn của bệnh nhân
exports.getPatientAppointments = async (patientId) => {
  const appointments = await Appointment.find({ patient_id: patientId });
  if (!appointments.length) {
    throw new Error("Không có lịch hẹn nào cho bệnh nhân này.");
  }
  return appointments;
};


exports.getDoctorAppointments = async (doctorId) => {
  try {
    // Lấy tất cả các lịch hẹn đã đặt cho bác sĩ
    const appointments = await Appointment.find({ doctor_id: doctorId })
      .select('appointment_date time_slot') // Chỉ chọn các trường cần thiết
      .lean();

    // Tạo một đối tượng để chứa các ngày và khung giờ
    const schedule = {};

    appointments.forEach((appointment) => {
      const appointmentDate = appointment.appointment_date.toISOString().split('T')[0]; // Lấy ngày
      const timeSlot = appointment.time_slot;

      // Thêm ngày vào đối tượng nếu chưa có
      if (!schedule[appointmentDate]) {
        schedule[appointmentDate] = {
          timeSlots: [],
        };
      }

      // Thêm khung giờ đã đặt vào mảng
      schedule[appointmentDate].timeSlots.push(timeSlot);
    });

    // Chuyển đổi đối tượng thành mảng
    const availableSchedule = Object.keys(schedule).map((date) => ({
      bookedDates: date,
      bookedSlots: schedule[date].timeSlots,
    }));

    return availableSchedule;
  } catch (error) {
    throw new Error("Error fetching appointments: " + error.message);
  }
};

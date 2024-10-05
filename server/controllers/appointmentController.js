// controllers/appointmentController.js
const Appointment = require("../models/Appointment");
const Schedule = require('../models/Schedule');

// Bệnh nhân đặt lịch hẹn
exports.bookAppointment = async (req, res) => {
  try {
    const { appointment_date, time_slot, doctor_id } = req.body;

    // Kiểm tra xem bác sĩ có lịch làm việc trong thời gian đó không
    const schedule = await Schedule.findOne({ doctor_id, date: appointment_date });
    if (!schedule || !schedule.available_slots.includes(time_slot)) {
      return res.status(400).json({ msg: "Khung giờ không có sẵn" });
    }

    // Kiểm tra xem có lịch hẹn nào đã tồn tại không
    const existingAppointment = await Appointment.findOne({ 
      doctor_id, 
      appointment_date, 
      time_slot 
    });
    if (existingAppointment) {
      return res.status(400).json({ msg: "Lịch hẹn đã tồn tại cho thời gian này" });
    }

    const appointment = new Appointment({
      appointment_date,
      time_slot,
      patient_id: req.user._id, // Lấy ID bệnh nhân từ token
      doctor_id,
    });

    await appointment.save();
    res.status(201).json({ msg: "Đặt lịch hẹn thành công!", appointment });
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra khi đặt lịch hẹn", error: error.message });
  }
};

exports.confirmAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    // Tìm lịch hẹn theo ID
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ msg: "Lịch hẹn không tồn tại" });
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

    res.status(200).json({ msg: "Lịch hẹn đã được xác nhận", appointment });
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra khi xác nhận lịch hẹn", error: error.message });
  }
};

// Bệnh nhân hủy lịch hẹn
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ msg: "Lịch hẹn không tồn tại" });
    }
    res.status(200).json({ msg: "Lịch hẹn đã bị hủy", appointment });
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra khi hủy lịch hẹn", error: error.message });
  }
};

// Lấy lịch hẹn cho bác sĩ
exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor_id: req.params.doctorId });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra khi lấy lịch hẹn", error: error.message });
  }
};

// Lấy lịch hẹn của bệnh nhân
exports.getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient_id: req.user._id });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra khi lấy lịch hẹn", error: error.message });
  }
};

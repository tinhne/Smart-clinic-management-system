// controllers/scheduleController.js
const Schedule = require("../models/Schedule");
const Appointment = require("../models/Appointment");
// Hàm để tạo các khung giờ dựa trên thời gian làm việc và độ dài khung giờ
const generateAvailableSlots = (startTime, endTime, slotDuration) => {
  const slots = [];
  let currentTime = new Date(`1970-01-01T${startTime}:00`); // Thiết lập ngày bất kỳ
  const endTimeDate = new Date(`1970-01-01T${endTime}:00`);

  while (currentTime < endTimeDate) {
    const nextTime = new Date(currentTime.getTime() + slotDuration * 60000); // Thêm slotDuration phút
    if (nextTime <= endTimeDate) {
      const slot = `${currentTime.toTimeString().slice(0, 5)}-${nextTime.toTimeString().slice(0, 5)}`;
      slots.push(slot);
    }
    currentTime = nextTime;
  }

  return slots;
};

// Tạo lịch cho bác sĩ
exports.createSchedule = async (req, res) => {
  try {
    const { doctor_id, date, working_hours, slot_duration } = req.body;

    // Kiểm tra thông tin truyền vào
    if (!doctor_id || !date || !working_hours || !slot_duration) {
      return res.status(400).json({ msg: "Thiếu thông tin cần thiết" });
    }

    // Tạo khung giờ có sẵn
    const available_slots = generateAvailableSlots(working_hours.start_time, working_hours.end_time, slot_duration);

    const newSchedule = new Schedule({
      doctor_id,
      date,
      working_hours,
      slot_duration,
      available_slots,
    });

    await newSchedule.save();
    res.status(201).json({ msg: "Lịch làm việc đã được tạo thành công", schedule: newSchedule });
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra khi tạo lịch", error: error.message });
  }
};

// Lấy lịch làm việc của bác sĩ
// Lấy lịch làm việc của bác sĩ
exports.getScheduleByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Tìm lịch làm việc của bác sĩ
    const schedules = await Schedule.find({ doctor_id: doctorId });

    if (schedules.length === 0) {
      return res.status(404).json({ msg: "Không tìm thấy lịch cho bác sĩ" });
    }

    // Lấy tất cả lịch hẹn của bác sĩ để kiểm tra khung giờ đã đặt
    const appointments = await Appointment.find({ doctor_id: doctorId });
    const bookedSlots = appointments.map(appointment => ({
      date: appointment.appointment_date.toISOString().split('T')[0], // Chỉ lấy ngày
      timeSlot: appointment.time_slot,
    }));
    // Xây dựng lịch khả dụng
    const availableSchedules = schedules.map(schedule => {
      const scheduleDate = schedule.date.toISOString().split('T')[0]; // Định dạng ngày của lịch làm việc
      const available_slots = schedule.available_slots.filter(slot => {
        // Kiểm tra xem có cuộc hẹn nào trong bookedSlots cho cùng một ngày
        const appointmentForDate = bookedSlots.find(booked => booked.date === scheduleDate);
        console.log("apointmentForDate>>>>>>>>>>>>>",appointmentForDate)
        // Nếu không có cuộc hẹn nào cho ngày đó, tất cả khung giờ sẽ khả dụng
        if (!appointmentForDate) return true;
        
        // So sánh slot hiện tại với slot đã đặt
        return slot !== appointmentForDate.timeSlot;
      });
    
      return {
        doctor_id: schedule.doctor_id,
        date: schedule.date,
        working_hours: schedule.working_hours,
        slot_duration: schedule.slot_duration,
        available_slots, // Chỉ các khung giờ còn trống
      };
    });
    console.log("appointments>>>>>>>>>>>>>>>>>>>>>>>>",appointments)
    console.log("availableSchedules>>>>>>>>>>>>>>>>>>>", availableSchedules);

    res.status(200).json(availableSchedules);
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra khi lấy lịch", error: error.message });
  }
};

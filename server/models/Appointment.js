const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  appointment_id: {
    type: String,
    required: true,
    unique: true,
  },
  appointment_date: {
    type: Date, // Sửa thành Date để dễ quản lý thời gian
    required: true,
  },
  status: {
    type: String, // Chuyển từ mảng sang String vì chỉ có một trạng thái tại một thời điểm
    enum: ["confirmed", "cancelled", "pending"],
    default: "confirmed",
  },
  time_slot: {
    type: String,
    required: true,
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Patient",
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Doctor",
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);

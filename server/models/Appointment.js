const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Appointment
const appointmentSchema = new Schema({
  appointment_id: {
    type: String,
    required: true,
    unique: true,
  },
  appointment_date: {
    type: Date,
    required: true,
  },
  statuses: {
    type: [String],
    enum: ["pending", "approved", "rejected"],
    required: true,
  },
  appointment_room: {
    type: String,
    required: true,
    maxlength: 10,
  },
  patient_id: {
    type: String,
    required: true,
    ref: "Patient",
  },
  doctor_id: {
    type: String,
    required: true,
    ref: "Doctor",
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);

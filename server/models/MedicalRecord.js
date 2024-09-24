const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for MedicalRecord

const medicalRecordSchema = new Schema({
  medicalrecord_id: {
    type: String,
    required: true,
    unique: true,
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
  medicalrecord_date: {
    type: Date,
    required: true,
  },
  symptoms: {
    // Triệu chứng
    type: [String],
    required: true,
  },
  diagnosis: {
    // Chuan đoán
    type: String,
    required: true,
  },
  treatment_plan: {
    // Kế hoạch điều trị
    type: String,
    required: true,
  },
  notes: {
    type: [String], // Mảng chứa nhiều ghi chú
    required: true,
  },
});

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Patient
const patientSchema = new Schema({
  patient_id: {
    type: String,
    required: true,
    unique: true,
  },
  patient_first_name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  patent_last_name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  patient_email: {
    type: String,
    required: true,
    unique: true,
  },
  patient_password: {
    type: String,
    required: true,
    minlength: 6,
  },
  patient_phone: {
    type: String,
    required: true,
    unique: true,
    maxlength: 10,
  },
  patient_address: {
    type: String,
    required: true,
    minlegth: 10,
    maxlength: 100,
  },
  patient_gender: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "doctor", "patient"],
    default: "patient",
  },
});

module.exports = mongoose.model("Patient", patientSchema);

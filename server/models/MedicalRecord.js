const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicalRecordSchema = new Schema(
  {
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
    medicalrecord_date: {
      type: Date,
      required: true,
    },
    symptoms: {
      type: [String],
      required: true,
    },
    diagnosis: {
      type: String,
      required: true,
    },
    treatment_plan: {
      type: String,
      required: true,
    },
    notes: {
      type: [String],
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);

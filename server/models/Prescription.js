const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Prescription
const prescriptionSchema = new Schema({
  prescription_id: {
    type: String,
    required: true,
    unique: true,
  },
  prescription_date: {
    type: Date,
    required: true,
  },
  prescription_description: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  medications: [
    {
      medication_id: {
        type: String,
        required: true,
        ref: "Medication",
      },
      medication_quantity_available: {
        type: Number,
        required: true,
      },
      medication_price: {
        type: Number,
        required: true,
      },
    },
  ],
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
  total_price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Prescription", prescriptionSchema);

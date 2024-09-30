const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema(
  {
    prescription_date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    medications: [
      {
        medication_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Medication",
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
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
    total_price: {
      type: Number,
      required: true,
      min: 0, // Tổng giá không được âm
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prescription", prescriptionSchema);

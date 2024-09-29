const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  schedule_id: {
    type: String,
    required: true,
    unique: true,
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  working_hours: {
    start_time: {
      type: String,
      required: true,
    },
    end_time: {
      type: String,
      required: true,
    },
  },
  slot_duration: {
    type: Number,
    required: true,
    min: 5, // Thời gian tối thiểu cho một khung giờ
  },
  available_slots: {
    type: [String],
    required: true,
  },
  booked_slots: [
    {
      patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
      time: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Schedule", scheduleSchema);

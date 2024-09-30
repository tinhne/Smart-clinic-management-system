const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema(
  {
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
        type: Date, // Sử dụng Date để dễ dàng so sánh và quản lý thời gian
        required: true,
      },
      end_time: {
        type: Date,
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
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Schedule", scheduleSchema);

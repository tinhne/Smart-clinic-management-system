const mongoose = require('mongoose')
const schema = mongoose.Schema

const schedulesSchema = new Schema({
  schedules_id: {
    type: String,
    required: true,
    unique: true,
  },
  doctor_id: {
    type: String,
    ref: "Doctor",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  available_slots: {
    type: [String],
    required: true,
  },
  booked_slots: {
    patient_id: {
      type: String,
      ref: "Patient",
    },
    time: {
      type: String,
      required: true,
    }
  }
})
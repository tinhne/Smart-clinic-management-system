const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Doctor
const doctorSchema = new Schema(
  {
    doctor_id: {
      type: String,
      required: true,
      unique: true,
    },
    doctor_name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    doctor_email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    doctor_password: {
      type: String,
      required: true,
      minlength: 6,
    },
    doctor_birthdate: {
      type: Date,
      required: true,
    },
    doctor_phone: {
      type: String,
      required: true,
      unique: true,
      maxlength: 10,
      match: /^[0-9]{10}$/,
    },
    doctor_address: {
      type: String,
      required: true,
      minlegth: 10,
      maxlength: 100,
    },
    doctor_schedule: {
      type: [
        {
          day: {
            type: String,
            required: true,
            enum: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
          },
          time_slots: [
            {
              start_time: {
                type: String,
                required: true,
                match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, // Định dạng HH:mm
              },
              end_time: {
                type: String,
                required: true,
                match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, // Định dạng HH:mm
              },
            },
          ],
        },
      ],
      required: true,
    },
    doctor_specialties: {
      type: [String],
      required: true,
    },
    doctor_gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "doctor", "patient"],
      default: "doctor",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Doctor", doctorSchema, "Doctor");

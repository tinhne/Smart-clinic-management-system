const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    last_name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9]{10,15}$/, // Hỗ trợ số điện thoại quốc tế với độ dài tối đa 15 ký tự
    },
    address: {
      type: String,
      required: true,
      maxlength: 100,
    },
    specialties: {
      type: [String],
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);

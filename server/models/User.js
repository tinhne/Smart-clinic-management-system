const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
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
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9]{10,15}$/,
    },
    address: {
      type: String,
      required: true,
      maxlength: 100,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    role: {
      type: String,
      required: true,
      enum: ["patient", "doctor", "admin"], // Phân biệt vai trò người dùng
      default: "patient",
    },
    password: {
      type: String,
      required: true,
    },
    birthdate: {
      type: String,
      required: true,
    },
    specialties: {
      type: [String], // Chỉ sử dụng cho doctor, không bắt buộc với các vai trò khác
    },
    imageUrl: { type: String }, // New field for user image
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);

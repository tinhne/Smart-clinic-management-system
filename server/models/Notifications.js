const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Notifications
const notificationSchema = new Schema({
  notification_id: {
    type: String,
    required: true,
    unique: true,
  },
  notification_title: {
    type: String,
    required: true,
    maxlength: 200,
  },
  notification_description: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  notification_date: {
    type: Date,
    required: true,
  },
  medicalrecord_id: {
    type: String,
    required: true,
    unique: true,
    ref: "MedicalRecord",
  },
});

module.exports = mongoose.model("Notification", notificationSchema);

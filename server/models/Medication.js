const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Medication
const medicationSchema = new Schema({
  medication_id: {
    type: String,
    required: true,
    unique: true,
  },
  medication_name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  medication_description: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  medication_quantity_available: {
    type: Number,
    required: true,
    maxlength: 200,
  },
  medication_price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Medication", medicationSchema);

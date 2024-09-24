const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Services
const servicesSchema = new Schema({
  service_id: {
    type: String,
    required: true,
    unique: true,
  },
  service_name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  service_price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Services", servicesSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const servicesSchema = new Schema({
  service_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Đảm bảo giá phải lớn hơn hoặc bằng 0
  },
  description: {
    type: String,
    maxlength: 1000,
  },
});

module.exports = mongoose.model("Service", servicesSchema);

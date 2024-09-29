const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const servicesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Service", servicesSchema);

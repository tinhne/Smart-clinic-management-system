const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    category: {
      type: [String],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    author_name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Blog", blogSchema);

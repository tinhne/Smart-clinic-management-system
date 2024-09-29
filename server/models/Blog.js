const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Hook để tự động cập nhật updated_at khi blog được chỉnh sửa
blogSchema.pre(
  "save",
  function (next) {
    this.updated_at = Date.now();
    next();
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Blog", blogSchema);

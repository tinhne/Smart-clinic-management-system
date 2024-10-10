const Blog = require("../models/Blog");

// Hàm tạo blog
exports.createBlog = async (blogData, author_id, author_name) => {
  const newBlog = new Blog({
    ...blogData,
    author_id,
    author_name,
  });

  await newBlog.save(); 
  return newBlog;
};

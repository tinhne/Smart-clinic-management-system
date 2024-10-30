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

// Hàm lấy tất cả blog
exports.getAllBlogs = async () => {
  const blogs = await Blog.find().populate("author_id", "username");
  return blogs;
};

// Hàm lấy blog theo id
exports.getBlogById = async (id) => {
  const blog = await Blog.findById(id).populate("author_id", "username");
  return blog;
};

// Hàm cập nhật blog theo id
exports.updateBlogById = async (id, blogData) => {
  await Blog.findByIdAndUpdate(id, blogData);
};

// Hàm xóa blog theo id
exports.deleteBlogById = async (id) => {
  await Blog.findByIdAndDelete(id);
};

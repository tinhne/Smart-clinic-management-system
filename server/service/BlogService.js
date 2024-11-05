const Blog = require("../models/Blog");

// Create a new blog
exports.createBlog = async (blogData, author_id, author_name) => {
  try {
    const newBlog = new Blog({ ...blogData, author_id, author_name });
    return await newBlog.save();
  } catch (error) {
    throw new Error(`Error creating blog: ${error.message}`);
  }
};

// Get all blogs
exports.getAllBlogs = async () => {
  try {
    return await Blog.find().populate("author_id", "username");
  } catch (error) {
    throw new Error(`Error fetching blogs: ${error.message}`);
  }
};

// Get blog by ID
exports.getBlogById = async (id) => {
  try {
    const blog = await Blog.findById(id).populate("author_id", "username");
    if (!blog) throw new Error("Blog not found");
    return blog;
  } catch (error) {
    throw new Error(`Error fetching blog: ${error.message}`);
  }
};

// Update blog by ID
exports.updateBlogById = async (id, blogData) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blogData, {
      new: true,
      runValidators: true,
    });
    if (!updatedBlog) throw new Error("Blog not found");
    return updatedBlog;
  } catch (error) {
    throw new Error(`Error updating blog: ${error.message}`);
  }
};

// Delete blog by ID
exports.deleteBlogById = async (id) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) throw new Error("Blog not found");
  } catch (error) {
    throw new Error(`Error deleting blog: ${error.message}`);
  }
};

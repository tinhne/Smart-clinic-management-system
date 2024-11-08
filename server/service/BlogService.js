const Blog = require("../models/Blog");
exports.createBlog = async (blogData, author_id, author_name) => {
  try {
    console.log("Received Blog Data:", blogData); // Log data before saving
    const newBlog = new Blog({ ...blogData, author_id, author_name });

    // Check and convert image data
    if (Array.isArray(blogData.images) && blogData.images.length > 0) {
      newBlog.images = blogData.images; // Directly assign if already in Base64
    }

    const savedBlog = await newBlog.save();
    console.log("Saved Blog Entry:", savedBlog); // Log saved data for verification
    return savedBlog;
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

exports.updateBlogById = async (id, blogData) => {
  try {
    if (blogData.image) {
      blogData.image = Buffer.from(blogData.image, "base64"); // Convert base64 to Buffer
    }

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

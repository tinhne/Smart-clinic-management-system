const blogService = require("../service/BlogService");

exports.createBlog = async (req, res) => {
  try {
    const { category, title, summary, author_name, content } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!category || !title || !summary || !author_name || !content) {
      return res.status(400).json({
        success: false,
        message: "Thiếu các trường thông tin bắt buộc",
      });
    }

    // Gửi dữ liệu tới service
    const result = await blogService.createBlog({
      category,
      title,
      summary,

      author_name,
      content,
    });

    if (result.success) {
      return res.status(201).json({
        success: true,
        message: "Tạo blog thành công",
        data: result.data,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Có lỗi xảy ra khi tạo blog",
      });
    }
  } catch (error) {
    console.error("Lỗi trong quá trình tạo blog:", error);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi ngoài ý muốn",
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogs(); // Gọi hàm trong service
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Không thể lấy danh sách blog",
    });
  }
};

exports.getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await blogService.getBlogById(id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateBlogById = async (req, res) => {
  try {
    const { id } = req.params; // Extract blog ID from the URL params
    const updatedData = req.body; // Get updated data from the request body

    // Call the service to update the blog
    const updatedBlog = await blogService.updateBlogById(id, updatedData);

    // If no blog is found, return a 404 response
    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    // Respond with the updated blog
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    await blogService.deleteBlogById(id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

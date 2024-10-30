const blogService = require("../service/BlogService");

exports.createBlog = async (req, res) => {
  const { title, image, content, tags, category } = req.body;

  try {
    const author_id = req.user._id;
    const author_name = req.user.username;

    const newBlog = await blogService.createBlog(
      { title, image, content, tags, category },
      author_id,
      author_name
    );

    res.status(201).json({
      message: "Tạo blog thành công",
      blog: newBlog,
    });
  } catch (error) {
    throw res.status(400).json({ message: error.message });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogs();

    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await blogService.getBlogById(id);

    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBlogById = async (req, res) => {
  const { id } = req.params;
  const { title, image, content, tags, category } = req.body;

  try {
    await blogService.updateBlogById(id, {
      title,
      image,
      content,
      tags,
      category,
    });

    res.status(200).json({ message: "Cập nhật blog thành công" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    await blogService.deleteBlogById(id);

    res.status(200).json({ message: "Xóa blog thành công" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

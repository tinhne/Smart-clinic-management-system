const blogService = require("../service/BlogService");

exports.createBlog = async (req, res) => {
  const { title, image, content, tags, category } = req.body;

  try {
    const author_id = req.user._id; 
    const author_name =req.user.username; 

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

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogById } from "../../utils/BlogManagement/BlogManagement";
import "../../style/Blog/BlogDetails.scss";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await getBlogById(id);
      if (response && response.blog) {
        setBlog(response.blog);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="blog-details">
      <h1 className="blog-title">{blog.title}</h1>
      <p className="blog-meta">
        <strong>Category:</strong> {blog.category.join(", ")}
      </p>
      <p className="blog-meta">
        <strong>Author:</strong> {blog.author_name}
      </p>
      <p className="blog-meta">
        <strong>Views:</strong> {blog.views}
      </p>
      <p className="blog-meta">
        <strong>Created At:</strong> {new Date(blog.createdAt).toLocaleString()}
      </p>
      <p className="blog-summary">
        <strong>Summary:</strong> {blog.summary}
      </p>

      <div className="blog-content">
        {blog.content.map((item, index) => (
          <div key={index} className="content-item">
            {/* Kiểm tra và hiển thị các trường trong content */}
            {item.image && (
              <>
                <img className="content-image" src={item.image} alt={`Content Image ${index}`} />
                <span className="image-description">{item.image_description}</span>
              </>
            )}
            {item.text && <p className="content-text">{item.text}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogDetails;

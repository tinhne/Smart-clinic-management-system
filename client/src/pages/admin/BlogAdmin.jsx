import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import AddBlogModal from "../../components/admin/BlogAdmin/AddBlogModal";
import EditBlogModal from "../../components/admin/BlogAdmin/EditBlogModal";
import DeleteBlogModal from "../../components/admin/BlogAdmin/DeleteBlogModal";
import { getBlog, deleteBlog } from "../../utils/BlogManagement/BlogManagement";
import { toast } from "react-toastify";

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const fetchBlogs = async () => {
    try {
      const data = await getBlog();
      setBlogs(data.blogs);
    } catch (error) {
      setError("Error fetching blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowEditModal = (blog) => {
    setSelectedBlog(blog);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleShowDeleteModal = (blog) => {
    setSelectedBlog(blog);
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleSave = (newBlog) => {
    setBlogs((prevBlogs) => [newBlog, ...prevBlogs]); // Add new blog at the start of the array
    handleCloseModal();
  };

  const handleSaveEdit = (updatedBlog) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog._id === updatedBlog._id ? updatedBlog : blog
      )
    );
    setShowEditModal(false);
  };

  const handleDelete = async () => {
    try {
      await deleteBlog(selectedBlog._id); // Call API to delete blog
      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== selectedBlog._id)
      );
      setShowDeleteModal(false);
      toast.success(`Bài viết "${selectedBlog.title}" đã được xóa thành công!`);
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Xóa bài viết thất bại.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Quản lý Tin tức Y tế</h1>
      <Button className="mb-3" variant="primary" onClick={handleShowModal}>
        Thêm Bài viết
      </Button>
      <Table striped bordered hover responsive>
        <thead className="thead-light">
          <tr>
            <th>Tiêu đề</th>
            <th>Danh mục</th>
            <th>Nội dung</th>
            <th>Tác giả</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <tr key={blog._id}>
                <td>{blog.title || "N/A"}</td>
                <td>
                  {Array.isArray(blog.category)
                    ? blog.category.join(", ")
                    : "N/A"}
                </td>
                <td
                  style={{
                    maxWidth: "300px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {blog.content || "No content available"}
                </td>
                <td>{blog.author_name || "Unknown"}</td>
                <td>
                  {blog.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="mr-2"
                    onClick={() => handleShowEditModal(blog)}
                  >
                    Chỉnh sửa
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleShowDeleteModal(blog)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                Không có bài viết nào
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={5}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={() => {}}
        forcePage={1}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />

      <AddBlogModal
        show={showModal}
        onClose={handleCloseModal}
        onSave={handleSave}
      />

      {selectedBlog && (
        <EditBlogModal
          show={showEditModal}
          onClose={handleCloseEditModal}
          onSave={handleSaveEdit}
          blog={selectedBlog}
        />
      )}

      {selectedBlog && (
        <DeleteBlogModal
          show={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onDelete={handleDelete}
          blogTitle={selectedBlog.title}
        />
      )}
    </div>
  );
};

export default BlogAdmin;

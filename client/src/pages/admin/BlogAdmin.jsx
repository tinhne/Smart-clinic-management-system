import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import AddBlogModal from "../../components/admin/BlogAdmin/AddBlogModal";
import EditBlogModal from "../../components/admin/BlogAdmin/EditBlogModal";
import DeleteBlogModal from "../../components/admin/BlogAdmin/DeleteBlogModal";
import { getBlog, deleteBlog } from "../../utils/BlogManagement/BlogManagement";
import { toast, ToastContainer  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Fetch blog data from API
  const fetchBlogs = async () => {
    try {
      const data = await getBlog();
      if (data?.blogs) {
        setBlogs(data.blogs);
      } else {
        throw new Error("Dữ liệu blogs không hợp lệ");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error.message);
      setError("Không thể lấy dữ liệu bài viết.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle Modal Add
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Handle Modal Edit
  const handleShowEditModal = (blog) => {
    setSelectedBlog(blog);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);

  // Handle Modal Delete
  const handleShowDeleteModal = (blog) => {
    setSelectedBlog(blog);
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  // Add a new blog
  const handleSave = async (newBlog) => {
    setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);
    await fetchBlogs();
    handleCloseModal();
  };

  // Save edited blog
  const handleSaveEdit = (updatedBlog) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog._id === updatedBlog._id ? updatedBlog : blog
      )
    );
    handleCloseEditModal();
  };

  // Delete blog
  const handleDelete = async () => {
    const toastId = toast.loading("Đang xóa bài viết...");
    try {
      console.log("Đang xóa bài viết với ID:", selectedBlog._id); // Kiểm tra ID
      await deleteBlog(selectedBlog._id); // Xóa bài viết

      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== selectedBlog._id)
      );

      toast.update(toastId, {
        render: `Bài viết "${selectedBlog.title}" đã được xóa thành công!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error during delete:", error); // Kiểm tra lỗi
      toast.update(toastId, {
        render: "Không thể xóa bài viết.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container mt-4">
        <ToastContainer />
      <Button className="mb-3" variant="primary" onClick={handleShowModal}>
        Thêm Bài viết
      </Button>
      {error && <p className="text-danger">{error}</p>}
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
            blogs
              .filter((blog) => blog?._id) // Ensure valid blogs
              .map((blog) => (
                <tr key={blog._id}>
                  <td>{blog?.title || "Không xác định"}</td>
                  <td>
                    {Array.isArray(blog?.category)
                      ? blog.category.join(", ")
                      : "Không xác định"}
                  </td>
                  <td
                    style={{
                      maxWidth: "300px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {blog?.content[0]?.text || "Không có nội dung"}
                  </td>
                  <td>{blog?.author_name || "Không rõ"}</td>
                  <td>
                    {blog?.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString("vi-VN")
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
              <td colSpan="6" style={{ textAlign: "center" }}>
                Không có bài viết nào
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {/* Pagination */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={5}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={() => {}}
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

      {/* Modals */}
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
          blogTitle={selectedBlog.title || "Không xác định"}
        />
      )}

    </div>
  );
};

export default BlogAdmin;

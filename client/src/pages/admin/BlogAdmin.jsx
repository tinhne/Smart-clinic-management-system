import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import AddBlogModal from "../../components/admin/BlogAdmin/AddBlogModal";
import EditBlogModal from "../../components/admin/BlogAdmin/EditBlogModal";
import DeleteBlogModal from "../../components/admin/BlogAdmin/DeleteBlogModal";

const BlogAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

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
    console.log("New blog saved:", newBlog);
    // Logic để lưu bài viết mới (API call) sẽ được thêm tại đây
  };

  const handleSaveEdit = (updatedBlog) => {
    console.log("Updated blog saved:", updatedBlog);
    // Logic để cập nhật bài viết (API call) sẽ được thêm tại đây
    setShowEditModal(false);
  };

  const handleDelete = () => {
    console.log("Blog deleted:", selectedBlog);
    // Logic để xóa bài viết (API call) sẽ được thêm tại đây
    setShowDeleteModal(false);
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
          {/* Dòng ví dụ */}
          <tr>
            <td>Bài viết ví dụ</td>
            <td>Sức khỏe, Khoa học</td>
            <td
              style={{
                maxWidth: "300px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Đây là nội dung bài viết ví dụ. Nội dung sẽ được rút ngắn nếu quá
              dài.
            </td>
            <td>Nguyễn Văn A</td>
            <td>01/01/2024</td>
            <td>
              <Button
                variant="warning"
                size="sm"
                className="mr-2"
                onClick={() =>
                  handleShowEditModal({
                    title: "Bài viết ví dụ",
                    category: "Sức khỏe",
                    content: "Đây là nội dung bài viết ví dụ.",
                    author: "Nguyễn Văn A",
                    date: "2024-01-01",
                    images: [],
                  })
                }
              >
                Chỉnh sửa
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() =>
                  handleShowDeleteModal({
                    title: "Bài viết ví dụ",
                  })
                }
              >
                {" "}
                Xóa
              </Button>
            </td>
          </tr>
          {/* Các dòng dữ liệu khác sẽ được chèn tại đây */}
        </tbody>
      </Table>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={5} // Dynamic page count
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={() => {}}
        forcePage={1} // Sync ReactPaginate with currentPage
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

      {/* Modal thêm bài viết */}
      <AddBlogModal
        show={showModal}
        onClose={handleCloseModal}
        onSave={handleSave}
      />

      {/* Modal chỉnh sửa bài viết */}
      {selectedBlog && (
        <EditBlogModal
          show={showEditModal}
          onClose={handleCloseEditModal}
          onSave={handleSaveEdit}
          blog={selectedBlog}
        />
      )}

      {/* Modal xóa bài viết */}
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

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateBlog } from "../../../utils/BlogManagement/BlogManagement";

// Helper function to convert a file to Base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const EditBlogModal = ({ show, onClose, onSave, blog }) => {
  const [editedBlog, setEditedBlog] = useState({
    title: "",
    category: "",
    content: "",
    author: "",
    date: "",
    image: [],
  });

  useEffect(() => {
    if (blog) {
      // Convert `createdAt` date to `YYYY-MM-DD` format for `type="date"` input compatibility
      const formattedDate = blog.createdAt
        ? new Date(blog.createdAt).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];

      setEditedBlog({ ...blog, date: formattedDate });
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const base64Images = await Promise.all(
      files.map((file) => convertToBase64(file))
    );
    setEditedBlog((prev) => ({ ...prev, image: base64Images }));
  };

  const handleSave = async () => {
    const updatedBlogData = {
      ...editedBlog,
      image: editedBlog.image,
    };

    try {
      await updateBlog(editedBlog._id, updatedBlogData);
      toast.success("Blog updated successfully!");
      onSave(updatedBlogData); // Notify parent to update UI
      onClose();
    } catch (error) {
      console.error("Error updating blog:", error);
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Failed to update blog. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa Bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tiêu đề"
                name="title"
                value={editedBlog.title || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Danh mục</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={editedBlog.category || ""}
                onChange={handleChange}
              >
                <option value="">Chọn danh mục</option>
                <option value="Sức khỏe">Sức khỏe</option>
                <option value="Dinh dưỡng">Dinh dưỡng</option>
                <option value="Tập luyện">Tập luyện</option>
                <option value="Tin tức">Tin tức</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Nhập nội dung"
                name="content"
                value={editedBlog.content || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formAuthor">
              <Form.Label>Tác giả</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên tác giả"
                name="author"
                value={editedBlog.author_name || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Ngày tạo</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={editedBlog.date || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formImages">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control type="file" multiple onChange={handleImageChange} />
              <div className="mt-2">
                {editedBlog.image && editedBlog.image.length > 0 ? (
                  editedBlog.image.map((imgSrc, index) => (
                    <img
                      key={index}
                      src={imgSrc}
                      alt={`Hình ${index + 1}`}
                      className="img-thumbnail m-1"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  ))
                ) : (
                  <p>No image available</p>
                )}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

EditBlogModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  blog: PropTypes.object,
};

export default EditBlogModal;

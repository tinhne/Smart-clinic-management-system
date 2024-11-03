import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Button } from "react-bootstrap";

const AddBlogModal = ({ show, onClose, onSave }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    category: "",
    content: "",
    author: "",
    date: new Date().toISOString().split("T")[0],
    images: [],
  });

  const categories = [
    "Sức khỏe",
    "Khoa học",
    "Công nghệ",
    "Giáo dục",
    "Đời sống",
  ];
  const authors = ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C", "Phạm Thị D"]; // Mẫu dữ liệu tác giả

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setNewBlog((prev) => ({ ...prev, images: fileURLs }));
  };

  const handleSave = () => {
    onSave(newBlog);
    onClose();
    setNewBlog({
      title: "",
      category: "",
      content: "",
      author: "",
      date: new Date().toISOString().split("T")[0],
      images: [],
    });
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm Bài viết Mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Tiêu đề</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tiêu đề"
              name="title"
              value={newBlog.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Label>Danh mục</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={newBlog.category}
              onChange={handleChange}
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formContent">
            <Form.Label>Nội dung</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Nhập nội dung"
              name="content"
              value={newBlog.content}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formAuthor">
            <Form.Label>Tác giả</Form.Label>
            <Form.Control
              as="select"
              name="author"
              value={newBlog.author}
              onChange={handleChange}
            >
              <option value="">Chọn tác giả</option>
              {authors.map((author, index) => (
                <option key={index} value={author}>
                  {author}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formDate">
            <Form.Label>Ngày tạo</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={newBlog.date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formImages">
            <Form.Label>Hình ảnh</Form.Label>
            <Form.Control type="file" multiple onChange={handleImageChange} />
            <div className="mt-2">
              {newBlog.images.map((imgSrc, index) => (
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
              ))}
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
  );
};

AddBlogModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AddBlogModal;

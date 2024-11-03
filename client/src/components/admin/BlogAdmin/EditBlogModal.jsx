import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Button } from "react-bootstrap";

const EditBlogModal = ({ show, onClose, onSave, blog }) => {
  const [editedBlog, setEditedBlog] = useState(blog || {});

  useEffect(() => {
    if (blog) {
      setEditedBlog(blog);
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setEditedBlog((prev) => ({ ...prev, images: fileURLs }));
  };

  const handleSave = () => {
    onSave(editedBlog);
    onClose();
  };

  return (
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
              type="text"
              placeholder="Nhập danh mục"
              name="category"
              value={editedBlog.category || ""}
              onChange={handleChange}
            />
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
              value={editedBlog.author || ""}
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
              {(editedBlog.images || []).map((imgSrc, index) => (
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

EditBlogModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  blog: PropTypes.object,
};

export default EditBlogModal;

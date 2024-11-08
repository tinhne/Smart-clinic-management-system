import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Button } from "react-bootstrap";
import { createBlog } from "../../../utils/BlogManagement/BlogManagement";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Helper function to convert a file to Base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

const AddBlogModal = ({ show, onClose, onSave }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    category: "",
    content: "",
    author: "",
    date: new Date().toISOString().split("T")[0],
    image: [], // Changed from 'images' to 'image'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    // Convert each file to Base64 format
    const base64Images = await Promise.all(
      files.map((file) => convertToBase64(file))
    );

    console.log("Converted Base64 Images:", base64Images); // Log to confirm conversion

    setNewBlog((prev) => ({ ...prev, image: base64Images })); // Set to 'image'
  };

  const handleSave = async () => {
    try {
      console.log("Saving blog with data:", newBlog);

      const createdBlog = await createBlog(newBlog); // Send to backend
      console.log("API response:", createdBlog);

      if (createdBlog && createdBlog.blog) {
        onSave(createdBlog.blog);
        toast.success("Blog created successfully!");
        onClose();
        setNewBlog({
          title: "",
          category: "",
          content: "",
          author: "",
          date: new Date().toISOString().split("T")[0],
          image: [], // Reset to 'image'
        });
      } else {
        throw new Error("Invalid blog data received");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog.");
    }
  };

  return (
    <>
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
                value={newBlog.content}
                onChange={handleChange}
              />
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
                {newBlog.image.map((imgSrc, index) => (
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
      <ToastContainer />
    </>
  );
};

AddBlogModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AddBlogModal;

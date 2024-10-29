import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { editUser } from "../../../utils/AuthAPI/AdminService";
import "./ModalUpdateDoctor.scss";
const ModalEditDoctor = (props) => {
  const { showEditModal, setShowEditModal, selectedUser, fetchDoctors } = props;
  const [formData, setFormData] = useState({
    first_name: selectedUser?.first_name || "",
    last_name: selectedUser?.last_name || "",
    email: selectedUser?.email || "",
    phone: selectedUser?.phone || "",
    address: selectedUser?.address || "",
    birthdate: selectedUser?.birthdate || "",
    gender: selectedUser?.gender || "",
    role: selectedUser?.role || "doctor",
    specialties: selectedUser?.specialties?.join(", ") || "",
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        first_name: selectedUser.first_name || "",
        last_name: selectedUser.last_name || "",
        email: selectedUser.email || "",
        phone: selectedUser.phone || "",
        address: selectedUser.address || "",
        birthdate: selectedUser.birthdate || "",
        gender: selectedUser.gender || "",
        role: selectedUser.role || "patient",
        specialties: selectedUser?.specialties?.join(", ") || "",
      });
    }
  }, [selectedUser]);

  const handleClose = () => setShowEditModal(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSave = async () => {
    try {
      const response = await editUser(selectedUser._id, formData);
      if (response.success) {
        alert("Cập nhật thành công");
        fetchDoctors(1); // Refresh lại danh sách bác sĩ
        handleClose(); // Đóng modal
      } else {
        alert(response.data.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Lỗi khi cập nhật thông tin");
    }
  };

  return (
    <>
      <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh Sửa Người Dùng</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col md={8}>
              <Form noValidate>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="first_name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="First Name"
                      value={formData.first_name}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="last_name">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Last Name"
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="birthdate">
                    <Form.Label>Birthdate</Form.Label>
                    <Form.Control
                      required
                      type="date"
                      value={formData.birthdate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      as="select"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="Male">Nam</option>
                      <option value="Female">Nữ</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      as="select"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                      <option value="admin">Admin</option>
                    </Form.Control>
                  </Form.Group>
                </Row>

                {formData.role === "doctor" && (
                  <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="specialties">
                      <Form.Label>Specialties</Form.Label>
                      <Form.Select
                        value={formData.specialties}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Chọn chuyên khoa</option>
                        <option value="Da Liễu">Da Liễu</option>
                        <option value="Tiêu Hóa">Tiêu Hóa</option>
                        <option value="Chỉnh hình">Chỉnh hình</option>
                        <option value="Tim Mạch">Tim Mạch</option>
                        <option value="Nhi Khoa">Nhi Khoa</option>
                      </Form.Select>
                    </Form.Group>
                  </Row>
                )}
              </Form>
            </Col>

            <Col md={4} className="d-flex flex-column align-items-center">
              {/* Hiển thị ảnh */}
              <div className="image-preview mb-3">
                {selectedUser?.imageUrl ? (
                  <img
                    src={`data:image/jpeg;base64,${selectedUser.imageUrl}`}
                    alt="Doctor preview"
                    style={{
                      width: "250px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <img
                    src="placeholder-image-url" // Thay thế bằng đường dẫn đến ảnh mặc định
                    alt="Doctor preview"
                    style={{
                      width: "150px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
              <Button variant="primary" onClick={handleSave}>
                Lưu
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

ModalEditDoctor.propTypes = {
  showEditModal: PropTypes.bool.isRequired,
  setShowEditModal: PropTypes.func.isRequired,
  selectedUser: PropTypes.object,
  fetchDoctors: PropTypes.func.isRequired,
};

export default ModalEditDoctor;

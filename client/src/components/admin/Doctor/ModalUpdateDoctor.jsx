import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { editUser } from "../../../utils/AuthAPI/AdminService";
import { toast } from "react-toastify";
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
    title: selectedUser?.title || "",
    description: selectedUser?.description || "",
    experience: selectedUser?.experience || "",
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
        role: selectedUser.role || "doctor",
        specialties: selectedUser.specialties?.join(", ") || "",
        title: selectedUser.title || "",
        description: selectedUser.description || "",
        experience: selectedUser.experience || "",
      });
    }
  }, [selectedUser]);

  const handleClose = () => setShowEditModal(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleSave = async () => {
    const { first_name, last_name, birthdate } = formData;
    const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/; // Regex cho tên hợp lệ
    const today = new Date();
  
    // Kiểm tra họ tên
    if (!first_name || !nameRegex.test(first_name.trim())) {
      toast.error("First name không hợp lệ. Vui lòng không sử dụng số hoặc ký tự đặc biệt.");
      return;
    }
  
    if (!last_name || !nameRegex.test(last_name.trim())) {
      toast.error("Last name không hợp lệ. Vui lòng không sử dụng số hoặc ký tự đặc biệt.");
      return;
    }
  
    // Kiểm tra ngày sinh
    const birthdateObj = new Date(birthdate);
    if (!birthdate || birthdateObj > today) {
      toast.error("Ngày sinh không hợp lệ. Vui lòng chọn ngày không lớn hơn ngày hiện tại.");
      return;
    }
  
    // Gửi yêu cầu cập nhật nếu dữ liệu hợp lệ
    try {
      console.log("Form data:", formData); // Debug dữ liệu
      const response = await editUser(selectedUser._id, formData);
      if (response.success) {
        toast.success("Cập nhật thành công");
        fetchDoctors(1); // Cập nhật danh sách
        handleClose(); // Đóng modal
      } else {
        toast.error(response.data.message || "Có lỗi xảy ra khi cập nhật.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật.");
    }
  };
  

  // Function to check for missing fields
  const getMissingFields = () => {
    const requiredFields = [
      "first_name",
      "last_name",
      "email",
      "phone",
      "address",
      "birthdate",
      "gender",
      "specialties",
      "title",
      "description",
      "experience",
    ];
    return requiredFields.filter((field) => !formData[field]);
  };

  // Missing fields for rendering
  const missingFields = getMissingFields();

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
                {missingFields.length > 0 && (
                  <p style={{ color: "red" }}>
                    Missing fields: {missingFields.join(", ")}
                  </p>
                )}
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="first_name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="First Name"
                      value={formData.first_name}
                      onChange={handleChange}
                      isInvalid={!formData.first_name}
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
                      isInvalid={!formData.last_name}
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
                      isInvalid={!formData.email}
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
                      isInvalid={!formData.phone}
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
                      isInvalid={!formData.address}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="birthdate">
                    <Form.Label>Birthdate</Form.Label>
                    <Form.Control
                      required
                      type="date"
                      value={formData.birthdate}
                      onChange={handleChange}
                      isInvalid={!formData.birthdate}
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
                      isInvalid={!formData.gender}
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
                      disabled
                    >
                      <option value="doctor">Doctor</option>
                    </Form.Control>
                  </Form.Group>
                </Row>

                {formData.role === "doctor" && (
                  <>
                    <Row className="mb-3">
                      <Form.Group as={Col} md="12" controlId="specialties">
                        <Form.Label>Specialties</Form.Label>
                        <Form.Control
                          value={formData.specialties}
                          onChange={handleChange}
                          placeholder="Enter specialties separated by commas"
                          required
                          isInvalid={!formData.specialties}
                        />
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Doctor Title"
                          value={formData.title}
                          onChange={handleChange}
                          isInvalid={!formData.title}
                        />
                      </Form.Group>

                      <Form.Group as={Col} md="6" controlId="experience">
                        <Form.Label>Experience</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Years of Experience"
                          value={formData.experience}
                          onChange={handleChange}
                          isInvalid={!formData.experience}
                        />
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} md="12" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Description"
                          value={formData.description}
                          onChange={handleChange}
                          isInvalid={!formData.description}
                        />
                      </Form.Group>
                    </Row>
                  </>
                )}
              </Form>
            </Col>

            <Col md={4} className="d-flex flex-column align-items-center">
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
                    src="placeholder-image-url"
                    alt="Doctor preview"
                    style={{
                      width: "150px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>

              <div className="certifications">
                <h5>Certifications</h5>
                <div className="certification-images">
                  {selectedUser?.certifications?.map((cert, index) => (
                    <img
                      key={index}
                      src={`data:image/jpeg;base64,${cert}`}
                      alt={`Certification ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        margin: "5px",
                        objectFit: "cover",
                      }}
                    />
                  ))}
                </div>
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

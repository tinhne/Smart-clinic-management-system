import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../admin/Doctor/ModalCreateDoctor.scss";

const ModalCreateDoctor = ({
  show,
  handleClose,
  fetchDoctors,
  createDoctor,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "Male",
    dob: "",
    phone: "",
    specialization: "",
    address: "",
    description: "",
    doctorImage: null,
    certificates: [],
    password: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [certificatePreview, setCertificatePreview] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          doctorImage: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCertificateChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
      });
    });

    Promise.all(previews).then((images) => {
      setCertificatePreview(images);
      setFormData((prev) => ({
        ...prev,
        certificates: files,
      }));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      title,
      firstName,
      lastName,
      email,
      gender,
      dob,
      phone,
      specialization,
      address,
      description,
      doctorImage,
      certificates,
      password,
    } = formData;

    if (
      !title ||
      !firstName ||
      !lastName ||
      !email ||
      !gender ||
      !dob ||
      !phone ||
      !specialization ||
      !address ||
      !description ||
      !doctorImage ||
      !password
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      const response = await createDoctor({
        title,
        first_name: firstName,
        last_name: lastName,
        email,
        gender,
        birthdate: dob,
        phone,
        specialties: specialization.split(",").map((spec) => spec.trim()),
        address,
        description,
        doctorImage,
        certificates,
        password,
      });

      if (response.EC === 1) {
        toast.success(response.EM);
        fetchDoctors(1);
        handleClose();
        setFormData({
          title: "",
          firstName: "",
          lastName: "",
          email: "",
          gender: "Male",
          dob: "",
          phone: "",
          specialization: "",
          address: "",
          description: "",
          doctorImage: null,
          certificates: [],
          password: "",
        });
        setImagePreview(null);
        setCertificatePreview([]);
      } else {
        toast.error(response.EM || "Lỗi khi tạo bác sĩ");
      }
    } catch (error) {
      toast.error("Lỗi khi kết nối tới server.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Tạo Bác Sĩ Mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formTitle">
                <Form.Label>Tiêu đề</Form.Label>
                <Form.Control
                  as="select"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Chọn tiêu đề</option>
                  <option value="Bác sĩ">Bác sĩ</option>
                  <option value="Giáo sư">Giáo sư</option>
                  <option value="Tiến sĩ">Tiến sĩ</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formFirstName">
                <Form.Label>Họ</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDob">
                <Form.Label>Ngày sinh</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formSpecialization">
                <Form.Label>Chuyên khoa</Form.Label>
                <Form.Control
                  as="select"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Chọn chuyên khoa</option>
                  <option value="Da Liễu">Da Liễu</option>
                  <option value="Tiêu Hóa">Tiêu Hóa</option>
                  <option value="Chỉnh hình">Chỉnh hình</option>
                  <option value="Tim Mạch">Tim Mạch</option>
                  <option value="Nhi Khoa">Nhi Khoa</option>
                </Form.Control>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formDescription">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formLastName">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formGender">
                <Form.Label>Giới tính</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formAddress">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Ảnh bác sĩ */}
          <Form.Group controlId="formDoctorImage" className="mt-3">
            <Form.Label>Ảnh bác sĩ</Form.Label>
            <Form.Control
              type="file"
              name="doctorImage"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {imagePreview && (
              <div className="image-preview mt-2">
                <img
                  src={imagePreview}
                  alt="Doctor preview"
                  style={{
                    width: "150px",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
            )}
          </Form.Group>

          {/* Ảnh chứng nhận */}
          <Form.Group controlId="formCertificates" className="mt-3">
            <Form.Label>Ảnh chứng nhận</Form.Label>
            <Form.Control
              type="file"
              name="certificates"
              accept="image/*"
              multiple
              onChange={handleCertificateChange}
            />
            {certificatePreview.length > 0 && (
              <div className="certificate-preview mt-2">
                {certificatePreview.map((src, index) => (
                  <div key={index} className="certificate-item">
                    <img
                      src={src}
                      alt={`Certificate ${index}`}
                      style={{
                        width: "100px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "5px",
                        border: "1px solid #ddd",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Tạo Bác Sĩ
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

ModalCreateDoctor.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchDoctors: PropTypes.func.isRequired,
  createDoctor: PropTypes.func.isRequired,
};

export default ModalCreateDoctor;

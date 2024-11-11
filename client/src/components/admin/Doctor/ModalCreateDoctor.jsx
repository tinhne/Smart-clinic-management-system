import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
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
    experience: "",
    doctorImage: null,
    certifications: [],
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
        const base64Image = reader.result; // This will be in base64 format
        setImagePreview(base64Image);
        setFormData((prev) => ({
          ...prev,
          doctorImage: base64Image, // Store as base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCertificateChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Chuyển đổi tệp thành base64
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result); // Lưu giá trị base64
      });
    });

    // Sau khi tất cả các tệp chứng chỉ được chuyển đổi thành base64
    Promise.all(previews).then((images) => {
      console.log("File previews:", images); // Kiểm tra hình ảnh xem trước
      setCertificatePreview(images); // Lưu hình ảnh xem trước
      setFormData((prev) => ({
        ...prev,
        certifications: images, // Lưu chứng chỉ dưới dạng base64
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
      experience, // <-- Include experience here
      doctorImage,
      certifications,
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
      !experience || // <-- Add validation for experience here
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
        experience, // <-- Send experience to backend
        doctorImage,
        certifications,
        password,
      });

      if (response.EC === 1) {
        fetchDoctors(1);
        toast.success(response.EM);
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
          experience: "", // Reset experience as well
          doctorImage: null,
          certifications: [],
          password: "",
        });
        setImagePreview(null);
        setCertificatePreview([]);
      } else {
        toast.error(response.EM || "Lỗi khi tạo bác sĩ");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error.response.data.EM);
    }
  };

  return (
    <>
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
                    <option value="Bác sĩ">GS</option>
                    <option value="Giáo sư">PGS</option>
                    <option value="Tiến sĩ">TS</option>
                    <option value="Tiến sĩ">ThS</option>
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
                    <option value="Chấn Thương Chỉnh Hình">
                      Chấn Thương Chỉnh hình
                    </option>
                    <option value="Tim Mạch">Tim Mạch</option>
                    <option value="Nhi Khoa">Nhi Khoa</option>
                    <option value="Hồi Sức - Cấp Cứu">Hồi Sức - Cấp Cứu</option>
                    <option value="Gây Mê Hồi Sức">Gây Mê Hồi Sức</option>
                    <option value="Nội Thận">Nội Thận</option>
                    <option value="Tai - Mũi - Họng">Tai - Mũi - Họng</option>
                    <option value="Nội Tiết">Nội Tiết</option>
                    <option value="Phẫu Thuật Tạo Hình">
                      Phẫu Thuật Tạo Hình
                    </option>
                    <option value="Tâm Lý">Tâm Lý</option>
                    <option value="Xét Nghiệm">Xét Nghiệm</option>
                    <option value="Hô Hấp">Hô Hấp</option>
                    <option value="Tâm Thần">Tâm Thần</option>
                    <option value="Đa Khoa">Đa Khoa</option>
                    <option value="Sản Phụ Khoa">Sản Phụ Khoa</option>
                    <option value="Cơ Xương Khớp">Cơ Xương Khớp</option>
                    <option value="Răng - Hàm - Mặt">Răng - Hàm - Mặt</option>
                  </Form.Control>
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
                <Form.Group controlId="formExperience">
                  <Form.Label>Kinh nghiệm</Form.Label>
                  <Form.Control
                    type="text"
                    name="experience"
                    value={formData.experience}
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
                      width: "200px",
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
            <Form.Group controlId="formcertifications" className="mt-3">
              <Form.Label>Ảnh chứng nhận</Form.Label>
              <Form.Control
                type="file"
                name="certifications"
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
                          width: "200px",
                          height: "200px",
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
      <ToastContainer />
    </>
  );
};

ModalCreateDoctor.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchDoctors: PropTypes.func.isRequired,
  createDoctor: PropTypes.func.isRequired,
};

export default ModalCreateDoctor;

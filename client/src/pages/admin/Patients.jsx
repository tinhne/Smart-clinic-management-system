import React, { useState, useEffect } from "react";
import {
  getAllUserByRole,
  createPatient,
} from "../../utils/AuthAPI/AdminService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style/adminStyle/patient.scss";
import ModalDeletePatient from "../../components/admin/patient/ModalDeletePaitent";
import ModalEditPatient from "../../components/admin/patient/ModalUpdatePaitent";
function Patients() {
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [newPatient, setNewPatient] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "Male",
    dob: "",
    phone: "",
    address: "",
    password: "",
    patientImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null); // Để hiển thị ảnh trước khi upload

  const fetchPatients = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUserByRole("patient", page, 5);
      if (data) {
        setPatients(data.users);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      } else {
        setError("Không thể tải danh sách bệnh nhân.");
      }
    } catch (error) {
      setError("Lỗi khi kết nối tới server.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPatients(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({
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
        setNewPatient((prev) => ({
          ...prev,
          patientImage: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePatient = async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      gender,
      dob,
      phone,
      address,
      password,
      patientImage,
    } = newPatient;

    // Kiểm tra thông tin đầu vào
    if (
      !firstName ||
      !lastName ||
      !email ||
      !gender ||
      !dob ||
      !phone ||
      !address ||
      !password
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (!patientImage) {
      toast.error("Vui lòng chọn ảnh bệnh nhân.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        const createdPatient = await createPatient({
          first_name: firstName,
          last_name: lastName,
          email,
          gender,
          birthdate: dob,
          phone,
          address,
          password,
          patientImage: base64Image,
        });

        if (createdPatient.success) {
          // setPatients((prevPatients) => [createdPatient.data, ...prevPatients]);
          await fetchPatients(currentPage); // Gọi fetch với trang hiện tại
          toast.success("Bệnh nhân được tạo thành công!");
        }
        setNewPatient({
          firstName: "",
          lastName: "",
          email: "",
          gender: "Male",
          dob: "",
          phone: "",
          address: "",
          password: "",
          patientImage: null,
        });
        setImagePreview(null);
      } catch (error) {
        toast.error("Lỗi khi tạo bệnh nhân.");
        console.error("Error creating patient:", error.response.data);
      }
    };

    reader.readAsDataURL(patientImage);
};


  return (
    <div className="patient-page">
      <ToastContainer position="top-right" autoClose={5000} />

      <div className="add-patient-form">
        <h3>Thêm bệnh nhân</h3>
        <form onSubmit={handleCreatePatient}>
          <div className="form-left">
            <div>
              <label>Họ:</label>
              <input
                type="text"
                name="firstName"
                value={newPatient.firstName}
                onChange={handleInputChange}
                required
              />
              <label>Tên:</label>
              <input
                type="text"
                name="lastName"
                value={newPatient.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={newPatient.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Giới tính:</label>
              <select
                name="gender"
                value={newPatient.gender}
                onChange={handleInputChange}
              >
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
              </select>
              <label>Ngày sinh:</label>
              <input
                type="date"
                name="dob"
                value={newPatient.dob}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Số điện thoại:</label>
              <input
                type="text"
                name="phone"
                value={newPatient.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Địa chỉ:</label>
              <input
                type="text"
                name="address"
                value={newPatient.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={newPatient.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn">
              Tạo bệnh nhân
            </button>
          </div>

          <div className="form-right">
            <div className="image-preview">
              {imagePreview ? (
                <img src={imagePreview} alt="Patient preview" />
              ) : (
                <img
                  src="https://via.placeholder.com/150x200"
                  alt="Patient placeholder"
                />
              )}
            </div>
            <label>Ảnh bệnh nhân:</label>
            <input
              type="file"
              name="patientImage"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
        </form>
      </div>

      <div className="table-container">
        {loading ? (
          <p>Đang tải...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table className="patient-table">
            <thead>
              <tr>
                <th>Tên bệnh nhân</th>
                <th>Email</th>
                <th>Giới tính</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.length > 0 ? (
                patients.map((patient, index) => (
                  <tr key={index}>
                    <td>{`${patient.first_name} ${patient.last_name}`}</td>
                    <td>{patient.email}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.phone}</td>
                    <td>{patient.address}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => {
                          setSelectedUser(patient);
                          setShowEditModal(true); // Hiển thị modal
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => {
                          setSelectedUser(patient); // Đặt người dùng cần xóa
                          setShowDeleteModal(true); // Hiển thị modal
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Không có bệnh nhân nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination">
        <button
          className="btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <ModalDeletePatient
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        selectedUser={selectedUser}
        fetchPatients={fetchPatients}
      />
      <ModalEditPatient
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        selectedUser={selectedUser}
        fetchPatients={fetchPatients}/>
    </div>
  );
}

export default Patients;

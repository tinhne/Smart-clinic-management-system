import React, { useState, useEffect } from "react";
import { getAllUserByRole } from "../../utils/AuthAPI/AdminService";
import "../../style/adminStyle/patient.scss";

function Patients() {
  const [patients, setPatients] = useState([]); // Danh sách bệnh nhân
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState(null); // Lưu lỗi nếu có

  // Hàm lấy danh sách bệnh nhân theo trang
  const fetchPatients = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUserByRole("patient", page, 5);
      console.log("API Response:", data); // Log data to see its structure
      if (data) {
        setPatients(data.users);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      } else {
        setError("Không thể tải danh sách bệnh nhân.");
      }
    } catch (error) {
      console.error("Error fetching users by role:", error); // Log error
      setError("Lỗi khi kết nối tới server.");
    }
    setLoading(false);
  };

  // Gọi hàm fetchPatients khi component mount hoặc khi currentPage thay đổi
  useEffect(() => {
    fetchPatients(currentPage);
  }, [currentPage]);

  // Hàm xử lý khi bấm vào nút phân trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Hàm xử lý xóa bệnh nhân
  const handleDeletePatient = (patientId) => {
    // TODO: Thêm logic xóa bệnh nhân tại đây
    console.log("Delete patient with ID:", patientId);
  };

  // Hàm xử lý chỉnh sửa bệnh nhân
  const handleEditPatient = (patientId) => {
    // TODO: Thêm logic chỉnh sửa bệnh nhân tại đây
    console.log("Edit patient with ID:", patientId);
  };

  return (
    <div className="patient-page">
      <div className="add-patient-form">
        <h3>Thêm bệnh nhân</h3>
        <form>
          <div className="form-left">
            <div>
              <label>Họ:</label>
              <input type="text" name="firstName" />
              <label>Tên:</label>
              <input type="text" name="lastName" />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" />
            </div>
            <div>
              <label>Giới tính:</label>
              <select name="gender">
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
              </select>
              <label>Ngày sinh:</label>
              <input type="date" name="dob" />
            </div>
            <div>
              <label>Số điện thoại:</label>
              <input type="text" name="phone" />
            </div>
            <div>
              <label>Địa chỉ:</label>
              <input type="text" name="address" />
            </div>
            <button type="submit" className="btn">
              Tạo bệnh nhân
            </button>
          </div>

          {/* Trường ảnh */}
          <div className="form-right">
            <div className="image-preview">
              <img
                src="https://via.placeholder.com/150x200"
                alt="Patient preview"
              />
            </div>
            <label>Ảnh bệnh nhân:</label>
            <input type="file" name="patientImage" accept="image/*" />
          </div>
        </form>
      </div>

      {/* Hiển thị danh sách bệnh nhân */}
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
              {patients && Array.isArray(patients) && patients.length > 0 ? (
                patients.map((patient, index) => (
                  <tr key={index}>
                    <td>
                      {patient.first_name} {patient.last_name}
                    </td>
                    <td>{patient.email}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.phone}</td>
                    <td>{patient.address}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEditPatient(patient._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDeletePatient(patient._id)}
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
      {/* Nút phân trang */}
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
    </div>
  );
}

export default Patients;

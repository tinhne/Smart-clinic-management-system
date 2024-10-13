import React, { useState, useEffect } from "react";
import { getAllUserByRole } from "../../utils/AuthAPI/AdminService";
import "../../style/adminStyle/doctors.scss";

function Doctors() {
  const [doctors, setDoctors] = useState([]); // Danh sách bác sĩ
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState(null); // Lưu lỗi nếu có

  // Hàm lấy danh sách bác sĩ theo trang
  const fetchDoctors = async (page) => {
    setLoading(true);
    setError(null);
    try {
        const data = await getAllUserByRole("doctor", page, 10);
        console.log("API Response:", data); // Log data to see its structure
        if (data) {
            setDoctors(data.users);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
        } else {
            setError("Không thể tải danh sách bác sĩ.");
        }
    } catch (error) {
        console.error("Error fetching users by role:", error); // Log error
        setError("Lỗi khi kết nối tới server.");
    }
    setLoading(false);
};

  // Gọi hàm fetchDoctors khi component mount hoặc khi currentPage thay đổi
  useEffect(() => {
    fetchDoctors(currentPage);
  }, [currentPage]);

  // Hàm xử lý khi bấm vào nút phân trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Hàm xử lý xóa bác sĩ
  const handleDeleteDoctor = (doctorId) => {
    // TODO: Thêm logic xóa bác sĩ tại đây
    console.log("Delete doctor with ID:", doctorId);
  };

  // Hàm xử lý chỉnh sửa bác sĩ
  const handleEditDoctor = (doctorId) => {
    // TODO: Thêm logic chỉnh sửa bác sĩ tại đây
    console.log("Edit doctor with ID:", doctorId);
  };

  return (
    <div className="doctor-page">
      <div className="add-doctor-form">
        <h3>Thêm bác sĩ</h3>
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
              <label>Chuyên khoa:</label>
              <input type="text" name="specialization" />
            </div>
            <button type="submit" className="btn">
              Tạo bác sĩ
            </button>
          </div>

          {/* Trường ảnh */}
          <div className="form-right">
            <div className="image-preview">
              <img
                src="https://via.placeholder.com/150x200"
                alt="Doctor preview"
              />
            </div>
            <label>Ảnh bác sĩ:</label>
            <input type="file" name="doctorImage" accept="image/*" />
          </div>
        </form>
      </div>

      {/* Hiển thị danh sách bác sĩ */}
      <div className="table-container">
        {loading ? (
          <p>Đang tải...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table className="doctor-table">
            <thead>
              <tr>
                <th>Tên bác sĩ</th>
                <th>Email</th>
                <th>Giới tính</th>
                <th>Số điện thoại</th>
                <th>Chuyên khoa</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors && Array.isArray(doctors) && doctors.length > 0 ? (
                doctors.map((doctor, index) => (
                  <tr key={index}>
                    <td>
                      {doctor.first_name} {doctor.last_name}
                    </td>
                    <td>{doctor.email}</td>
                    <td>{doctor.gender}</td>
                    <td>{doctor.phone}</td>
                    <td>{doctor.specialties}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEditDoctor(doctor._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDeleteDoctor(doctor._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Không có bác sĩ nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

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
    </div>
  );
}

export default Doctors;

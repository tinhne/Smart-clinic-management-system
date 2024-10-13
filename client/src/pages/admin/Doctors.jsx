import React, { useState, useEffect } from "react";
import { getAllUserByRole, createDoctor } from "../../utils/AuthAPI/AdminService"; // Import createDoctor
import "../../style/adminStyle/doctors.scss";

function Doctors() {
  const [doctors, setDoctors] = useState([]); // Danh sách bác sĩ
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState(null); // Lưu lỗi nếu có

  // Trạng thái cho form bác sĩ

const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  gender: "Male",
  dob: "",
  phone: "",
  specialization: "",
  doctorImage: null,
  password: "", // Thêm trường mật khẩu
});

  const [imagePreview, setImagePreview] = useState(null); // Để hiển thị ảnh trước khi upload

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
    console.log("Delete doctor with ID:", doctorId);
  };

  // Hàm xử lý chỉnh sửa bác sĩ
  const handleEditDoctor = (doctorId) => {
    console.log("Edit doctor with ID:", doctorId);
  };

  // Hàm xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Hàm xử lý thay đổi file ảnh
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

  // Hàm xử lý tạo bác sĩ
  const handleCreateDoctor = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    const { firstName, lastName, email, gender, dob, phone, specialization, doctorImage, password } = formData;
    // Chuyển đổi ảnh thành base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      const response = await createDoctor({
        firstName,
        lastName,
        email,
        gender,
        dob,
        phone,
        specialization,
        doctorImage: base64Image,
        password, 
      });

      if (response.success) {
        setDoctors((prev) => [response.user, ...prev]); // Thêm bác sĩ mới vào đầu danh sách
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          gender: "Male",
          dob: "",
          phone: "",
          specialization: "",
          doctorImage: null,
        });
        setImagePreview(null); // Reset ảnh preview
      } else {
        setError(response.message);
      }
    };

    if (doctorImage) {
      reader.readAsDataURL(doctorImage);
    }
  };

  return (
    <div className="doctor-page">
      <div className="add-doctor-form">
        <h3>Thêm bác sĩ</h3>
        <form onSubmit={handleCreateDoctor}>
          <div className="form-left">
            <div>
              <label>Họ:</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
              <label>Tên:</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Giới tính:</label>
              <select name="gender" value={formData.gender} onChange={handleInputChange}>
                <option value="Male">Male</option>
                <option value="Female">FeMale</option>
              </select>
              <label>Ngày sinh:</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
            </div>

            <div>
              <label>Số điện thoại:</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Chuyên khoa:</label>
              <input type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} required />
            </div>
            <div>
              <label htmlFor="">Password</label>
              <input type="text" name="password" value={formData.password} onChange={handleInputChange}  required  />
            </div>
            <button type="submit" className="btn">
              Tạo bác sĩ
            </button>
          </div>

          {/* Trường ảnh */}
          <div className="form-right">
            <div className="image-preview">
              {imagePreview ? (
                <img src={imagePreview} alt="Doctor preview" />
              ) : (
                <img src="https://via.placeholder.com/150x200" alt="Doctor placeholder" />
              )}
            </div>
            <label>Ảnh bác sĩ:</label>
            <input type="file" name="doctorImage" accept="image/*" onChange={handleImageChange} />
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
                    <td>{doctor.specialization}</td>
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

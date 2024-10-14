import React, { useState, useEffect } from "react";
import {
  getAllUserByRole,
  createDoctor,
} from "../../utils/AuthAPI/AdminService"; // Import createDoctor
import "../../style/adminStyle/doctors.scss";
import { toast } from "react-toastify";

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
    gender: "",
    dob: "",
    phone: "",
    specialization: "",
    doctorImage: null,
    password: "", // Thêm trường mật khẩu
  });

  const [imagePreview, setImagePreview] = useState(null); // Để hiển thị ảnh trước khi upload

  // Hàm lấy danh sách bác sĩ theo trang
  useEffect(() => {
    fetchDoctors(currentPage);
  }, [currentPage]);

  const fetchDoctors = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUserByRole("doctor", page, 5);
      if (data) {
        setDoctors(data.users);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      } else {
        setError("Không thể tải danh sách bác sĩ.");
      }
    } catch (error) {
      setError("Lỗi khi kết nối tới server.");
    }
    setLoading(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

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

  // Hàm xử lý tạo bác sĩ và hiển thị thông báo toast
  const handleCreateDoctor = async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      gender,
      dob,
      phone,
      specialization,
      doctorImage,
      password,
    } = formData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !gender ||
      !dob ||
      !phone ||
      !specialization ||
      !password
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (!doctorImage) {
      toast.error("Vui lòng chọn ảnh bác sĩ.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        const response = await createDoctor({
          first_name: firstName,
          last_name: lastName,
          email,
          gender,
          birthdate: dob,
          phone,
          specialties: specialization.split(",").map((spec) => spec.trim()),
          doctorImage: base64Image,
          password,
        });
        console.log("resss>>>>>>>>>>", response);

        if (response.success) {
          toast.success("Tạo bác sĩ thành công.");

          // Tạo một đối tượng bác sĩ mới từ dữ liệu đã nhập
          const newDoctor = {
            first_name: firstName,
            last_name: lastName,
            email,
            gender,
            phone,
            specialties: specialization.split(",").map((spec) => spec.trim()),
          };

          // Cập nhật danh sách bác sĩ với bác sĩ mới
          setDoctors((prevDoctors) => [newDoctor, ...prevDoctors]); // Thêm vào đầu danh sách

          // Reset form
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            dob: "",
            phone: "",
            specialization: "",
            doctorImage: null,
            password: "",
          });
          setImagePreview(null);
        } else {
          toast.error(response.message || "Lỗi khi tạo bác sĩ");
        }
      } catch (error) {
        // Kiểm tra lỗi từ server
        if (error.response && error.response.data) {
          toast.error(
            error.response.data.message || "Lỗi khi kết nối tới server."
          );
        } else {
          toast.error("Lỗi khi kết nối tới server.");
        }
      }
    };

    reader.readAsDataURL(doctorImage);
  };

  return (
    <div className="doctor-page">
      <div className="add-doctor-form">
        <h3>Thêm bác sĩ</h3>
        <form onSubmit={handleCreateDoctor}>
          <div className="form-left">
            <div>
              <label>Họ:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <label>Tên:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Giới tính:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <label>Ngày sinh:</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Số điện thoại:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Chuyên khoa:</label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="">Mật khẩu:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                autoComplete="current-password" // Thêm thuộc tính này
              />
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
                <img
                  src="https://via.placeholder.com/150x200"
                  alt="Doctor placeholder"
                />
              )}
            </div>
            <label>Ảnh bác sĩ:</label>
            <input
              type="file"
              name="doctorImage"
              accept="image/*"
              onChange={handleImageChange}
            />
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
              {doctors && doctors.length > 0 ? (
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
                      <button className="btn btn-edit">Edit</button>
                      <button className="btn btn-delete">Delete</button>
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

export default Doctors;

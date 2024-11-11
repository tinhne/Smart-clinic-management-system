import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../../style/DoctorList/DoctorList.scss";
import ReactPaginate from "react-paginate";
import {
  getAllUserByRole,
  getAllDoctorsBySpecialty,
} from "../../utils/AuthAPI/AdminService";
import Cookies from "js-cookie";

const categories = [
  { name: "Tất cả" },
  { name: "Tuyền Nhiễm" },
  { name: "Tim Mạch" },
  { name: "Chấn Thương Chỉnh Hình" },
  { name: "Hồi Sức - Cấp Cứu" },
  { name: "Gây Mê Hồi Sức" },
  { name: "Nội Thận" },
  { name: "Nội Tiết" },
  { name: "Tai - mũi - họng" },
  { name: "Tâm Thần" },
  { name: "Hô Hấp" },
  { name: "Xét Nghiệm" },
  { name: "Tâm Lý" },
  { name: "Phẫu Thuật Tạo Hình" },
  { name: "Đa Khoa" },
  { name: "Sản Phụ Khoa" },
  { name: "Cơ Xương Khớp" },
  { name: "Răng - Hàm Mặt" },
  { name: "Nhi Khoa" },
  { name: "Da Liễu" },
];

function DoctorList() {
  const location = useLocation();

  const { specialties } = location.state || {};
  const [doctorList, setDoctorList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("Tất cả");
  const navigate = useNavigate(); // Khai báo useNavigate

  const fetchDoctors = async (specialty = null) => {
    let data;

    if (specialty === "Tất cả") {
      data = await getAllUserByRole("doctor", 1, 1000); // Lấy tất cả bác sĩ
    } else {
      data = await getAllDoctorsBySpecialty({ specialty });
    }

    if (data) {
      setDoctorList(data.doctors || data.users);
    } else {
      setDoctorList([]);
    }
  };

  useEffect(() => {
    if (specialties) {
      fetchDoctors(specialties);
    } else {
      fetchDoctors(currentCategory); // Gọi hàm lấy bác sĩ khi component mount hoặc khi currentCategory thay đổi
    }
  }, [currentCategory]); // Chỉ gọi lại khi currentCategory thay đổi

  const handleChange = (categoryName) => {
    setCurrentCategory(categoryName);
    fetchDoctors(categoryName);
  };

  // Hàm xử lý khi nhấn nút "Đặt khám"
  const handleAppointmentClick = (doctorId) => {
    const isLoggedIn = Cookies.get("access_token"); // Kiểm tra trạng thái đăng nhập (thay đổi theo cách của bạn)
    if (!isLoggedIn) {
      navigate("/login-register"); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
    } else {
      navigate(`/dat-kham/bac-si/${doctorId}`); // Nếu đã đăng nhập, chuyển đến trang đặt khám
    }
  };

  return (
    <div className="page-container">
      <aside className="sidebar-list">
        <nav>
          <ul>
            {categories.map((category, index) => (
              <li key={index} onClick={() => handleChange(category.name)}>
                <NavLink
                  to=""
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {category.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="doctor-list">
        {doctorList.length > 0 ? (
          doctorList.map((doctor) => (
            <div key={doctor._id} className="doctor-item">
              <img
                src={`data:image/jpeg;base64,${doctor.imageUrl}`}
                className="doctor-img"
              />

              <div className="doctor-info">
                <h3>
                  {doctor.first_name} {doctor.last_name}
                </h3>
                <p>
                  {doctor.specialties.map((spec, index) => (
                    <span key={index} className="specialty">
                      {spec}
                    </span>
                  ))}
                </p>
                <p>{doctor.address}</p>
              </div>
              <button
                className="appointment-btn"
                onClick={() => handleAppointmentClick(doctor._id)} // Gọi hàm khi nhấn nút
              >
                Đặt khám
              </button>
            </div>
          ))
        ) : (
          <p>Không tìm thấy bác sĩ nào.</p>
        )}

        <ReactPaginate
          nextLabel="next >"
          onPageChange={() => console.log(123)} // Hàm xử lý khi thay đổi trang
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={5} // Bạn có thể tính toán số trang dựa trên số lượng bác sĩ
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </main>
    </div>
  );
}

export default DoctorList;

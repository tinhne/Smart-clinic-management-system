import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../style/DoctorList/DoctorList.scss";
import ReactPaginate from "react-paginate";
import {
  getAllUserByRole,
  getAllDoctorsBySpecialty,
} from "../../utils/AuthAPI/AdminService";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const categories = [
  { name: "Tất cả" },
  { name: "Chuẩn Đoán Hình Ảnh" },
  { name: "Cơ Xương Khớp" },
  { name: "Y Học Cổ Truyền" },
  { name: "Da Liễu" },
  { name: "Dị Ứng Miễn Dịch" },
  { name: "Lao Phổi" },
  { name: "Gây Mê Hồi Sức" },
  { name: "Lão Khoa" },
  { name: "Nhi Khoa" },
  { name: "Truyền Nhiễm" },
  { name: "Xét Nghiệm" },
  { name: "Hô Hấp" },
  { name: "Tâm Thần" },
  { name: "Sản Phụ Khoa" },
  { name: "Tai - Mũi - Họng" },
  { name: "Nội Thần Kinh" },
];

function DoctorList() {
  const location = useLocation();
  const { specialties } = location.state || {};
  const [doctorList, setDoctorList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("Tất cả");
  const [errorShown, setErrorShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const fetchDoctors = async (specialty = null, page = 1) => {
    setLoading(true);
    try {
      let data;
      if (specialty === "Tất cả") {
        data = await getAllUserByRole("doctor", page, 10);
      } else {
        data = await getAllDoctorsBySpecialty({ specialty, page, limit: 10 });
      }

      if (data && (data.doctors?.length > 0 || data.users?.length > 0)) {
        setDoctorList(data.doctors || data.users);
        setPageCount(data.totalPages || 1);
        setErrorShown(false);
      } else {
        setDoctorList([]);
        if (!errorShown) {
          toast.error("Không tìm thấy bác sĩ nào.");
          setErrorShown(true);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setDoctorList([]);
      } else {
        console.error("Error fetching doctors:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (specialties) {
      fetchDoctors(specialties);
    } else {
      setDoctorList([]);
      fetchDoctors(currentCategory);
    }
  }, []);

  const handleChange = async (categoryName) => {
    setCurrentCategory(categoryName);
    setCurrentPage(0);
    await fetchDoctors(categoryName, 1);
  };

  const handlePageClick = async (data) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
    await fetchDoctors(currentCategory, selectedPage);
  };

  const handleAppointmentClick = (doctorId) => {
    const isLoggedIn = Cookies.get("access_token");
    if (!isLoggedIn) {
      navigate("/login-register");
    } else {
      navigate(`/dat-kham/bac-si/${doctorId}`);
    }
  };

  return (
    <div className="page-container">
      <aside className="sidebar-list">
        <nav>
          <ul>
            {categories.map((category, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={currentCategory === category.name ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    handleChange(category.name);
                  }}
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="doctor-list">
        {loading ? (
          <p>Đang tải...</p>
        ) : doctorList.length > 0 ? (
          doctorList.map((doctor) => (
            <div key={doctor._id} className="doctor-item">
              <img
                src={`data:image/jpeg;base64,${doctor.imageUrl}`}
                className="doctor-img"
                alt={`${doctor.first_name} ${doctor.last_name}`}
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
                onClick={() => handleAppointmentClick(doctor._id)}
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
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
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

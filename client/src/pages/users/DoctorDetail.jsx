import { FaSearch } from "react-icons/fa";
import "../../style/DoctorDetail/DoctorDetail.scss";
import { getAllUserByRole, getUserById } from "../../utils/AuthAPI/AdminService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewDoctorDetail from "../../components/Doctor/ViewDoctorDetails";

const DoctorDetail = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false); // Quản lý trạng thái hiển thị modal
  const navigate = useNavigate();

  const fetchDoctor = async (page) => {
    setIsLoading(true); // Bắt đầu loading
    try {
      const response = await getAllUserByRole("doctor", page, 15); // Gọi API lấy dữ liệu
      if (response?.success) {
        setDoctors(response.users); // Gắn danh sách bác sĩ vào state
        setTotalPages(response.totalPages || 1); // Lấy tổng số trang từ API
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setIsLoading(false); // Kết thúc loading
    }
  };

  useEffect(() => {
    fetchDoctor(currentPage); // Gọi API khi component được load
  }, [currentPage]);

  const handleAppointment = (doctorID) => {
    navigate(`/dat-kham/bac-si/${doctorID}`);
  };

  const handleViewInfo = async (doctorID) => {
    try {
      setShowModal(true); // Hiển thị modal
      const response = await getUserById(doctorID, "doctor");
      setSelectedDoctor(response.user); // Cập nhật thông tin bác sĩ được chọn
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDoctor(null); // Đặt lại selectedDoctor là null
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="doctorlist-container">
      {/* Ô tìm kiếm */}
      <div className="search-box-container">
        <input
          type="text"
          placeholder="Tìm kiếm bác sĩ theo tên hoặc chuyên khoa..."
          className="search-input"
        />
        <FaSearch className="search-icon" />
      </div>

      {/* Danh sách bác sĩ hoặc spinner */}
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {doctors.map((doctor) => (
            <div className="doctor-detail" key={doctor._id}>
              <img
                src={
                  doctor.imageUrl
                    ? `data:image/jpeg;base64,${doctor.imageUrl}`
                    : "https://via.placeholder.com/150"
                }
                alt={`${doctor.title ? `${doctor.title}.` : ""} ${
                  doctor.first_name
                } ${doctor.last_name}`}
                className="doctor-image"
              />
              <h2>
                {doctor.title ? `${doctor.title}.` : ""} {doctor.first_name}{" "}
                {doctor.last_name}
              </h2>
              <p>Chuyên ngành: {doctor.specialties.join(", ")}</p>
              <div className="doctor-buttons">
                <button
                  className="appointment-button"
                  onClick={() => handleAppointment(doctor._id)}
                >
                  Đặt Khám
                </button>
                <button
                  className="info-button"
                  onClick={() => handleViewInfo(doctor._id)}
                >
                  Xem Thông Tin
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Paginate */}
      {!isLoading && (
        <div className="paginate">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Trước
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Tiếp
          </button>
        </div>
      )}

      {/* Hiển thị Modal Thông tin Bác sĩ */}
      {showModal && (
        <ViewDoctorDetail
          doctor={selectedDoctor}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};



export default DoctorDetail;
  
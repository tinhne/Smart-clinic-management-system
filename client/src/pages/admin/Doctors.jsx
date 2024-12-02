import React, { useState, useEffect } from "react";
import {
  getAllUserByRole,
  createDoctor,
  countUserByRole
} from "../../utils/AuthAPI/AdminService"; // Import createDoctor
import "../../style/adminStyle/doctors.scss";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "react-bootstrap"; // Import Spinner
import "react-toastify/dist/ReactToastify.css";
import ModalDeleteDoctor from "../../components/admin/Doctor/ModalDeleteDoctor";
import ModalEditDoctor from "../../components/admin/Doctor/ModalUpdateDoctor";
import ModalCreateDoctor from "../../components/admin/Doctor/ModalCreateDoctor"; // Import modal tạo bác sĩ

const Doctors = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false); // Thêm trạng thái modal tạo bác sĩ
  const [selectedUser, setSelectedUser] = useState(null);
  const [totalUser, setTotalUser] = useState(0);

  const fetchDoctors = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUserByRole("doctor", page, 10);
      const totalUser = await countUserByRole("doctor");

      if (data) {
        setTotalUser(totalUser.userCount);

        setDoctors(data.users);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      } else {
        setError("Không thể tải danh sách bác sĩ.");
      }
    } catch (error) {
      console.error("Error fetching users by role:", error);
      setError("Lỗi khi kết nối tới server.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDoctors(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Hàm để mở/đóng modal tạo bác sĩ
  const handleCreateModalShow = () => setShowCreateModal(true);
  const handleCreateModalClose = () => setShowCreateModal(false);

  const handleEditDoctor = (doctor) => {
    setSelectedUser(doctor);
    setShowEditModal(true);
  };

  const handleDeleteDoctor = (doctor) => {
    setSelectedUser(doctor);
    setShowDeleteModal(true);
  };

  return (
    <>
      <div className="doctor-page">
        <div className="add-doctor-button">
          {/* Nút mở modal tạo bác sĩ */}
          <button className="btn btn-primary" onClick={handleCreateModalShow}>
            Thêm Bác Sĩ Mới
          </button>
          <div className="total-doctor">  
            <span>Tổng số bác sĩ : {totalUser}</span>
          </div>
        </div>

        {/* Hiển thị danh sách bác sĩ */}
        <div className="table-container">
          {loading ? (
            // Hiển thị spinner trong khi dữ liệu đang tải
            <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
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
                          onClick={() => handleEditDoctor(doctor)}
                        >
                          Sửa
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDeleteDoctor(doctor)}
                        >
                          Xóa
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
          <ToastContainer></ToastContainer>
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

        {/* Modal tạo bác sĩ */}
        <ModalCreateDoctor
          show={showCreateModal}
          handleClose={handleCreateModalClose}
          fetchDoctors={fetchDoctors}
          createDoctor={createDoctor}
        />

        <ModalDeleteDoctor
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          selectedUser={selectedUser}
          doctors={doctors}
          fetchDoctors={fetchDoctors}
        />
        <ModalEditDoctor
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          selectedUser={selectedUser}
          doctors={doctors}
          fetchDoctors={fetchDoctors}
        />
      </div>
    </>
  );
};

export default Doctors;

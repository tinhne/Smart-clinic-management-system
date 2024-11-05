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
import ModalCreatePatient from "../../components/admin/patient/ModalCreatePatient"; // Import modal tạo bệnh nhân

function Patients() {
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false); // Thêm trạng thái modal tạo bệnh nhân
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchPatients(currentPage);
  }, [currentPage]);

  const fetchPatients = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUserByRole("patient", page, 10);
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

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="patient-page">
      <ToastContainer position="top-right" autoClose={5000} />

      {/* Nút mở modal tạo bệnh nhân */}
      <div className="add-patient-button">
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          Thêm Bệnh Nhân Mới
        </button>
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
                          setShowEditModal(true); // Hiển thị modal chỉnh sửa
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => {
                          setSelectedUser(patient); // Đặt người dùng cần xóa
                          setShowDeleteModal(true); // Hiển thị modal xóa
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

      {/* Modal tạo bệnh nhân */}
      <ModalCreatePatient
        show={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
        fetchPatients={fetchPatients}
        createPatient={createPatient}
      />

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
        fetchPatients={fetchPatients}
      />
    </div>
  );
}

export default Patients;

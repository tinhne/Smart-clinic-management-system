import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap"; // Import Spinner từ React-Bootstrap
import {
  getAllUserByRole,
  createPatient,
  countUserByRole,
} from "../../utils/AuthAPI/AdminService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Đảm bảo bootstrap được import
import "../../style/adminStyle/patient.scss";
import ModalDeletePatient from "../../components/admin/patient/ModalDeletePaitent";
import ModalEditPatient from "../../components/admin/patient/ModalUpdatePaitent";
import ModalCreatePatient from "../../components/admin/patient/ModalCreatePatient"; // Import modal tạo bệnh nhân

function Patients() {
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // Hiển thị Spinner khi loading
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false); // Trạng thái modal tạo bệnh nhân
  const [selectedUser, setSelectedUser] = useState(null);
  const [totalUser, setTotalUser] = useState(0);

  useEffect(() => {
    fetchPatients(currentPage);
  }, [currentPage]);

  const fetchPatients = async (page) => {
    setLoading(true); // Bắt đầu loading
    setError(null);
    try {
      const data = await getAllUserByRole("patient", page, 10);
      const totalUser = await countUserByRole("patient");
      if (data) {
        setTotalUser(totalUser.userCount);
        setPatients(data.users);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      } else {
        setError("Không thể tải danh sách bệnh nhân.");
      }
    } catch (error) {
      setError("Lỗi khi kết nối tới server.");
    }
    setLoading(false); // Kết thúc loading
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="patient-page">
      {/* Nút mở modal tạo bệnh nhân */}
      <div className="add-patient-button">
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          Thêm Bệnh Nhân Mới
        </button>
        <div className="total-patient">
          <span>Tổng số bệnh nhân: {totalUser}</span>
        </div>
      </div>

      <div className="table-container">
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "200px" }}
          >
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
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
                        Sửa
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => {
                          setSelectedUser(patient); // Đặt người dùng cần xóa
                          setShowDeleteModal(true); // Hiển thị modal xóa
                        }}
                      >
                        Xóa
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

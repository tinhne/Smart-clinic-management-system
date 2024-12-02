import React, { useEffect, useState } from "react";
import "../../style/adminStyle/medicine.scss";
import {
  getMedicines,
  addNewMedicine,
  deleteMedicine,
  updateMedicine,
} from "../../services/medicineAPI";
import ModalCreateMedicine from "../../components/admin/Medication/ModalCreateMedicine";
import ModalEditMedicine from "../../components/admin/Medication/ModalEditMedicine";
import ModalDeleteMedicine from "../../components/admin/Medication/ModalDeleteMedicine";
import { Spinner } from "react-bootstrap"; // Import Spinner từ React-Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"; // Import CSS Bootstrap

function Medication() {
  const [medicines, setMedicines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [deletingMedicine, setDeletingMedicine] = useState(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchMedicines = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMedicines(page, 10);
      if (data) {
        setMedicines(data.medicines);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      } else {
        setError("Không thể tải danh sách thuốc.");
      }
    } catch (error) {
      console.error("Error fetching medicines:", error);
      setError("Lỗi khi kết nối tới server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleCreateModalShow = () => setShowCreateModal(true);
  const handleCreateModalClose = () => setShowCreateModal(false);

  const handleEditModalShow = (medicine) => {
    setEditingMedicine(medicine);
    setShowEditModal(true);
  };
  const handleEditModalClose = () => setShowEditModal(false);

  const handleDeleteModalShow = (medicine) => {
    setDeletingMedicine(medicine);
    setShowDeleteModal(true);
  };
  const handleDeleteModalClose = () => setShowDeleteModal(false);

  return (
    <div className="medicine-page">
      <div className="add-medicine-button">
        <button className="btn btn-primary" onClick={handleCreateModalShow}>
          Thêm thuốc mới
        </button>
      </div>

      <div className="table-container">
        {loading ? (
           <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table className="medicine-table">
            <thead>
              <tr>
                <th>Tên thuốc</th>
                <th>Mô tả</th>
                <th>Đơn vị tính</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {medicines.length > 0 ? (
                medicines.map((medicine) => (
                  <tr key={medicine._id}>
                    <td>{medicine.name || "Không xác định"}</td>
                    <td>{medicine.description || "Không xác định"}</td>
                    <td>{medicine.unit_of_caculation || "Không rõ"}</td>
                    <td>
                      {medicine.price !== null && medicine.price !== undefined
                        ? medicine.price.toLocaleString() + " VND"
                        : "N/A"}
                    </td>
                    <td>{medicine.quantity_available || 0}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEditModalShow(medicine)}
                      >
                        Sửa 
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDeleteModalShow(medicine)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Không có thuốc nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal thêm thuốc */}
      <ModalCreateMedicine
        show={showCreateModal}
        handleClose={handleCreateModalClose}
        fetchMedicines={fetchMedicines}
        addNewMedicine={addNewMedicine}
      />

      {/* Modal chỉnh sửa thuốc */}
      {editingMedicine && (
        <ModalEditMedicine
          show={showEditModal}
          handleClose={handleEditModalClose}
          fetchMedicines={fetchMedicines}
          editingMedicine={editingMedicine}
          updateMedicine={updateMedicine}
        />
      )}

      {/* Modal xóa thuốc */}
      {deletingMedicine && (
        <ModalDeleteMedicine
          show={showDeleteModal}
          handleClose={handleDeleteModalClose}
          fetchMedicines={fetchMedicines}
          deletingMedicine={deletingMedicine}
          deleteMedicine={deleteMedicine}
        />
      )}
    </div>
  );
}

export default Medication;

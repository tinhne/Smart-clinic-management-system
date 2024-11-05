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
          <p>Đang tải...</p>
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
                    <td>{medicine.name}</td>
                    <td>{medicine.description}</td>
                    <td>{medicine.unit_of_caculation}</td>
                    <td>{medicine.price.toLocaleString()} VND</td>
                    <td>{medicine.quantity_available}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEditModalShow(medicine)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDeleteModalShow(medicine)}
                      >
                        Delete
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

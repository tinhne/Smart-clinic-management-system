import React, { useEffect, useState } from "react";
import "../../style/adminStyle/service.scss";
import {
  getAllServices,
  addNewService,
  deleteService,
  updateService,
} from "../../services/serviceAPI";
import ModalCreateService from "../../components/admin/ServiceManage/ModalCreateService";
import ModalEditService from "../../components/admin/ServiceManage/ModalEditService";
import ModalDeleteService from "../../components/admin/ServiceManage/ModalDeleteService";
import { Spinner } from "react-bootstrap";

function Services() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]); // Danh sách dịch vụ sau khi lọc
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemsPerPage = 5; // Số mục hiển thị trên mỗi trang

  // Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deletingService, setDeletingService] = useState(null);

  // Fetch services từ server
  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllServices();
      if (data) {
        setServices(data.services);
        setFilteredServices(data.services); // Gán danh sách ban đầu cho danh sách đã lọc
        setTotalPages(Math.ceil(data.services.length / itemsPerPage));
      } else {
        setError("Không thể tải danh sách dịch vụ.");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("Lỗi khi kết nối tới server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Xử lý tìm kiếm
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = services.filter((service) =>
      service.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredServices(filtered);
    setCurrentPage(1); // Reset về trang đầu tiên
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  };

  // Pagination handler
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Modal handlers
  const handleCreateModalShow = () => setShowCreateModal(true);
  const handleCreateModalClose = () => setShowCreateModal(false);

  const handleEditModalShow = (service) => {
    setEditingService(service);
    setShowEditModal(true);
  };
  const handleEditModalClose = () => setShowEditModal(false);

  const handleDeleteModalShow = (service) => {
    setDeletingService(service);
    setShowDeleteModal(true);
  };
  const handleDeleteModalClose = () => setShowDeleteModal(false);

  return (
    <div className="service-page">
      <div className="top-bar">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Tìm kiếm dịch vụ..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleCreateModalShow}>
          Thêm dịch vụ mới
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
          <table className="service-table">
            <thead>
              <tr>
                <th>Tên dịch vụ</th>
                <th>Giá</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedServices.length > 0 ? (
                paginatedServices.map((service) => (
                  <tr key={service._id}>
                    <td>{service.name}</td>
                    <td>{service.price.toLocaleString()} VND</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEditModalShow(service)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDeleteModalShow(service)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">Không có dịch vụ nào phù hợp.</td>
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

      {/* Modal thêm dịch vụ */}
      <ModalCreateService
        show={showCreateModal}
        handleClose={handleCreateModalClose}
        fetchServices={fetchServices}
        addNewService={addNewService}
      />

      {/* Modal chỉnh sửa dịch vụ */}
      {editingService && (
        <ModalEditService
          show={showEditModal}
          handleClose={handleEditModalClose}
          fetchServices={fetchServices}
          editingService={editingService}
          updateService={updateService}
        />
      )}

      {/* Modal xóa dịch vụ */}
      {deletingService && (
        <ModalDeleteService
          show={showDeleteModal}
          handleClose={handleDeleteModalClose}
          fetchServices={fetchServices}
          deletingService={deletingService}
          deleteService={deleteService}
        />
      )}
    </div>
  );
}

export default Services;

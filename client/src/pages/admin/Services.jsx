import React, { useEffect, useState } from "react";
import "../../style/adminStyle/service.scss";
import {
  getAllServices,
  addNewService,
  deleteService,
  updateService,
} from "../../services/serviceAPI";

function Services() {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingServiceId, setEditingServiceId] = useState(null);

  const [addService, setAddService] = useState({
    serviceName: "",
    servicePrice: "",
  });

  // Hàm lấy danh sách dịch vụ
  const fetchServices = async (page) => {
    try {
      setLoading(true);
      const data = await getAllServices(page, 5);
      if (data) {
        setServices(data.services);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
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
    fetchServices(currentPage);
  }, [currentPage]);

  // Xử lý input thay đổi
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddService((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm thêm dịch vụ
  const handleAddService = async () => {
    const newService = {
      name: addService.serviceName,
      price: parseFloat(addService.servicePrice),
    };

    try {
      const res = await addNewService(newService);
      if (res) {
        alert("Thêm dịch vụ thành công.");
        fetchServices(currentPage);
        resetForm();
      } else {
        setError("Không thể thêm dịch vụ.");
      }
    } catch (error) {
      console.error("Error adding service:", error);
      setError("Lỗi khi thêm dịch vụ.");
    }
  };

  // Hàm cập nhật dịch vụ
  const handleUpdateService = async () => {
    const updatedService = {
      name: addService.serviceName,
      price: parseFloat(addService.servicePrice),
    };

    try {
      const res = await updateService(editingServiceId, updatedService);
      if (res) {
        alert("Cập nhật dịch vụ thành công.");
        fetchServices(currentPage);
        setEditingServiceId(null);
        resetForm();
      } else {
        setError("Không thể cập nhật dịch vụ.");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      setError("Lỗi khi cập nhật dịch vụ.");
    }
  };

  // Hàm submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingServiceId) {
      handleUpdateService();
    } else {
      handleAddService();
    }
  };

  // Hàm chỉnh sửa dịch vụ
  const handleEditService = (service) => {
    setEditingServiceId(service._id);
    setAddService({
      serviceName: service.name,
      servicePrice: service.price.toString(),
    });
  };

  // Hàm xóa dịch vụ
  const handleDeleteService = async (serviceId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa dịch vụ?");
    if (confirmDelete) {
      try {
        const res = await deleteService(serviceId);
        if (res) {
          alert("Xóa dịch vụ thành công.");
          fetchServices(currentPage);
        } else {
          setError("Không thể xóa dịch vụ.");
        }
      } catch (error) {
        console.error("Error deleting service:", error);
        setError("Lỗi khi xóa dịch vụ.");
      }
    }
  };

  // Hàm reset form
  const resetForm = () => {
    setAddService({
      serviceName: "",
      servicePrice: "",
    });
  };

  // Hàm chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="service-page">
      <div className="add-service-form">
        <h3>{editingServiceId ? "Cập nhật dịch vụ" : "Thêm dịch vụ"}</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Tên dịch vụ:</label>
            <input
              type="text"
              name="serviceName"
              value={addService.serviceName}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Đơn Giá:</label>
            <input
              type="text"
              name="servicePrice"
              value={addService.servicePrice}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="btn">
            {editingServiceId ? "Cập nhật" : "Thêm"}
          </button>
        </form>
      </div>

      <div className="table-container">
        {loading ? (
          <p>Đang tải...</p>
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
              {services.map((service) => (
                <tr key={service._id}>
                  <td>{service.name}</td>
                  <td>{service.price.toLocaleString()} VND</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEditService(service)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDeleteService(service._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
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
          Page {currentPage} to {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Services;

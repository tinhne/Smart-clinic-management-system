import React, { useEffect, useState } from "react";
import "../../style/adminStyle/medicine.scss";
import {
  getMedicines,
  addNewMedicine,
  deleteMedicine,
  updateMedicine,
} from "../../services/medicineAPI";

function Medication() {
  const [medicines, setMedicines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingMedicineId, setEditingMedicineId] = useState(null); // ID thuốc đang chỉnh sửa

  const [addMedicine, setAddMedicine] = useState({
    medicineName: "",
    medicineDes: "",
    unit: "vien",
    medicinePrice: "",
    medicineQuantity: "",
  });

  // Hàm lấy danh sách thuốc
  const fetchMedicines = async (page) => {
    try {
      setLoading(true);
      const data = await getMedicines(page, 5);
      console.log(data);
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

  // Xử lý input thay đổi
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddMedicine((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý cập nhật thuốc
  const handleUpdateMedicine = async () => {
    const updatedMedicine = {
      name: addMedicine.medicineName,
      description: addMedicine.medicineDes,
      unit_of_caculation: addMedicine.unit,
      price: parseFloat(addMedicine.medicinePrice),
      quantity_available: parseInt(addMedicine.medicineQuantity, 10),
    };

    try {
      const res = await updateMedicine(editingMedicineId, updatedMedicine);
      if (res.success) {
        alert("Cập nhật thuốc thành công.");
        fetchMedicines(currentPage);
        setEditingMedicineId(null);
        resetForm();
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error("Error updating medicine:", error);
      alert("Lỗi khi cập nhật thuốc. Vui lòng thử lại.");
    }
  };

  // Xử lý thêm mới thuốc
  const handleAddMedicine = async () => {
    const newMedicine = {
      name: addMedicine.medicineName,
      description: addMedicine.medicineDes,
      unit_of_caculation: addMedicine.unit,
      price: parseFloat(addMedicine.medicinePrice),
      quantity_available: parseInt(addMedicine.medicineQuantity, 10),
    };

    try {
      const res = await addNewMedicine(newMedicine);
      if (res.success) {
        alert("Thêm thuốc thành công.");
        fetchMedicines(1);
        resetForm();
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error("Error adding medicine:", error);
      alert("Lỗi khi thêm thuốc. Vui lòng thử lại.");
    }
  };

  // Hàm submit form (thêm hoặc cập nhật)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingMedicineId) {
      handleUpdateMedicine();
    } else {
      handleAddMedicine();
    }
  };

  // Hàm xử lý chỉnh sửa
  const handleEdit = (medicine) => {
    setEditingMedicineId(medicine._id);
    setAddMedicine({
      medicineName: medicine.name,
      medicineDes: medicine.description,
      unit: medicine.unit_of_caculation,
      medicinePrice: medicine.price.toString(),
      medicineQuantity: medicine.quantity_available.toString(),
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa thuốc này?"
    );
    if (confirmDelete) {
      try {
        const res = await deleteMedicine(id);
        if (res.success) {
          alert("Xóa thuốc thành công.");
          fetchMedicines(currentPage);
        } else {
          alert(res.message);
        }
        console.log(res);
      } catch (error) {
        console.error("Error deleting medicine:", error);
        alert("Lỗi khi xóa thuốc. Vui lòng thử lại.");
      }
    }
  };

  const resetForm = () => {
    setAddMedicine({
      medicineName: "",
      medicineDes: "",
      unit: "vien",
      medicinePrice: "",
      medicineQuantity: "",
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="medicine-page">
      <div className="add-medicine-form">
        <h3>{editingMedicineId ? "Cập nhật thuốc" : "Thêm thuốc"}</h3>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Tên thuốc:</label>
            <input
              type="text"
              name="medicineName"
              value={addMedicine.medicineName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Mô tả: </label>
            <input
              type="text"
              name="medicineDes"
              value={addMedicine.medicineDes}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Đơn vị tính:</label>
            <select
              name="unit"
              value={addMedicine.unit}
              onChange={handleInputChange}
            >
              <option value="vien">Viên</option>
              <option value="hop">Hộp</option>
              <option value="chai">Chai</option>
              <option value="ong">Ống</option>
              <option value="goi">Gói</option>
            </select>
          </div>
          <div>
            <label>Đơn Giá:</label>
            <input
              type="text"
              name="medicinePrice"
              value={addMedicine.medicinePrice}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Số lượng:</label>
            <input
              type="text"
              name="medicineQuantity"
              value={addMedicine.medicineQuantity}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn">
            {editingMedicineId ? "Cập nhật" : "Thêm"}
          </button>
        </form>
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
              {medicines.map((medicine) => (
                <tr key={medicine._id}>
                  <td>{medicine.name}</td>
                  <td>{medicine.description}</td>
                  <td>{medicine.unit_of_caculation}</td>
                  <td>{medicine.price.toLocaleString()} VND</td>
                  <td>{medicine.quantity_available}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEdit(medicine)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(medicine._id)}
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
          Page {currentPage} of {totalPages}
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

export default Medication;

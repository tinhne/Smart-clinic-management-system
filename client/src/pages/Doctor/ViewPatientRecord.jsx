import React, { useState, useEffect } from "react";
import "../../style/DoctorFunction/ViewPatientRecord.scss";
import ReactPaginate from "react-paginate";
import {
  getAllMedicalRecords,
  getMedicalRecordByPatientId,
  addVisitHistory,
} from "../../utils/MedicalRecord/MedicalRecordService";

function ViewPatientRecord() {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [newVisit, setNewVisit] = useState({
    symptoms: "",
    diagnosis: "",
    treatment_plan: "",
    notes: "",
  });

  // Fetch medical records
  useEffect(() => {
    const fetchMedicalRecords = async (page = 1) => {
      try {
        const response = await getAllMedicalRecords(page, 5);
        setMedicalRecords(response.medicalRecords || []);
      } catch (error) {
        console.error("Lỗi khi lấy hồ sơ y tế:", error.response ? error.response.data : error.message);
      }
    };

    fetchMedicalRecords();
  }, []);

  // Handle viewing details
// Function to handle viewing details with added console.log for debugging
const handleViewDetails = async (patient_id) => {
  console.log("View details clicked for patient_id:", patient_id); // kiểm tra xem hàm có chạy khi nhấn nút không
  if (!patient_id) {
    console.error("No patient_id provided");
    return; // Thoát nếu không có patient_id
  }
  try {
    const response = await getMedicalRecordByPatientId(patient_id);
    console.log("Fetched medical record details:", response); // kiểm tra dữ liệu trả về
    setSelectedRecord(response.data); // Đặt chi tiết hồ sơ vào selectedRecord
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết hồ sơ y tế:", error);
  }
};


  // Mở giao diện tạo bệnh án mới
  const handleAddVisit = (patient_id) => {
    setSelectedRecord({ patient_id }); // Thiết lập bệnh nhân hiện tại để thêm lần khám
  };

  // Đóng giao diện chi tiết
  const handleCloseDetails = () => {
    setSelectedRecord(null);
    setNewVisit({
      symptoms: "",
      diagnosis: "",
      treatment_plan: "",
      notes: "",
    });
  };

  // Lưu lần khám mới vào API
  const handleSaveVisit = async () => {
    try {
      const response = await addVisitHistory(selectedRecord.patient_id, newVisit);
      if (response.status === 200) {
        // Thêm lần khám mới vào record
        setMedicalRecords((prevRecords) =>
          prevRecords.map((record) =>
            record.patient_id === selectedRecord.patient_id
              ? { ...record, medical_history: [...record.medical_history, response.data] }
              : record
          )
        );
        handleCloseDetails();
      } else {
        console.error("Lỗi khi lưu lần khám:", response.statusText);
      }
    } catch (error) {
      console.error("Lỗi khi lưu lần khám:", error);
    }
  };

  return (
    <div className="patient-record">
      <h1>Danh sách hồ sơ bệnh nhân</h1>
      <table className="record-table">
        <thead>
          <tr>
            <th>ID Bệnh nhân</th>
            <th>Tên</th>
            <th>Số điện thoại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {medicalRecords && Array.isArray(medicalRecords) && medicalRecords.length > 0 ? (
            medicalRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.patient_id}</td>
                <td>{record.patient_info?.name || "N/A"}</td>
                <td>{record.patient_info?.phone || "N/A"}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleViewDetails(record.patient_id)}
                  >
                    Xem chi tiết
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddVisit(record.patient_id)}
                  >
                    Tạo bệnh án
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Không có hồ sơ bệnh nhân nào.</td>
            </tr>
          )}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={10}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={() => {}}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />

      {selectedRecord && (
        <div className="modal-overlay">
          <div className="modal-content">
            {selectedRecord.patient_id && !selectedRecord.medical_history ? (
              <>
                <h2>Thêm Lần Khám Mới</h2>
                <div className="visit-form">
                  <label>Triệu chứng:</label>
                  <input
                    type="text"
                    value={newVisit.symptoms}
                    onChange={(e) => setNewVisit({ ...newVisit, symptoms: e.target.value })}
                  />
                  <label>Chuẩn đoán:</label>
                  <input
                    type="text"
                    value={newVisit.diagnosis}
                    onChange={(e) => setNewVisit({ ...newVisit, diagnosis: e.target.value })}
                  />
                  <label>Kế hoạch điều trị:</label>
                  <input
                    type="text"
                    value={newVisit.treatment_plan}
                    onChange={(e) => setNewVisit({ ...newVisit, treatment_plan: e.target.value })}
                  />
                  <label>Ghi chú:</label>
                  <input
                    type="text"
                    value={newVisit.notes}
                    onChange={(e) => setNewVisit({ ...newVisit, notes: e.target.value })}
                  />
                </div>
                <button className="btn btn-primary" onClick={handleSaveVisit}>
                  Lưu
                </button>
                <button className="btn-close" onClick={handleCloseDetails}>
                  Đóng
                </button>
              </>
            ) : (
              <>
                <h2>Chi tiết hồ sơ bệnh án</h2>
                <p><strong>Họ và tên:</strong> {selectedRecord.patient_info?.name || "N/A"}</p>
                <p><strong>Liên hệ:</strong> {selectedRecord.patient_info?.phone || "N/A"}</p>
                {/* Chi tiết lịch sử khám */}
                <button className="btn-close" onClick={handleCloseDetails}>Đóng</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewPatientRecord;

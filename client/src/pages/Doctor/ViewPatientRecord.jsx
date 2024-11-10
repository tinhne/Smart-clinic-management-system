import React, { useEffect, useState } from "react";
import "../../style/DoctorFunction/ViewPatientRecord.scss";
import ReactPaginate from "react-paginate";
import {
  getAllMedicalRecords,
  getMedicalRecordByPatientId,
  addVisitHistory,
} from "../../utils/MedicalRecord/MedicalRecordService";
import { getUserById } from "../../utils/AuthAPI/AdminService";
import DetailMedicalRecord from "../../components/Doctor/DetailMedicalRecord";
import AddVisitModal from "../../components/Doctor/AddVisitModel";

function ViewPatientRecord() {
  const [medicalRecord, setMedicalRecord] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctorInfo, setDoctorsInfo] = useState(null);
  const [patientInfo, setPatientInfo] = useState(null);
  const [showAddVisitModal, setShowAddVisitModal] = useState(false);
  const [showDetailRecord, setShowDetailRecord] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    fetchMedicalRecord(currentPage);
  }, [currentPage]);

  const fetchMedicalRecord = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllMedicalRecords(page, 10);
      if (data) {
        const records = data.medicalRecords;
        const patientPromises = records.map(async (record) => {
          const patientResponse = await getUserById(record.patient_id, "patient");
          return {
            ...record,
            patient_info: {
              name: `${patientResponse.user.first_name} ${patientResponse.user.last_name}`,
              phone: patientResponse.user.phone,
            },
          };
        });

        const recordsWithPatientInfo = await Promise.all(patientPromises);
        setMedicalRecord(recordsWithPatientInfo);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      } else {
        setError("Không thể tải danh sách hồ sơ bệnh án");
      }
    } catch (error) {
      console.error("Error fetching medical records:", error);
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleShowDetailRecordModal = (record) => {
    setSelectedRecord(record);
    setShowDetailRecord(true);
  };

  const handleShowAddVisitModal = (record) => {
    setSelectedRecord(record);
    setShowAddVisitModal(true);
  };

  const handleCloseDetailRecordModal = () => {
    setShowDetailRecord(false);
    setSelectedRecord(null); // Clear selected record when closing the modal
  };

  const handleCloseAddVisitModal = () => {
    setShowAddVisitModal(false);
    setSelectedRecord(null); // Clear selected record when closing the modal
  };

  return (
    <div className="patient-record">
      <h1>Danh sách bệnh án</h1>
      <table className="record-table">
        <thead>
          <tr>
            <th>ID Bệnh án</th>
            <th>Tên Bệnh nhân</th>
            <th>Số điện thoại</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {medicalRecord.length > 0 ? (
            medicalRecord.map((record) => (
              <tr key={record._id}>
                <td>{record._id}</td>
                <td>{record.patient_info?.name || "Chưa có thông tin"}</td>
                <td>{record.patient_info?.phone || "Chưa có thông tin"}</td>
                <td>{new Date(record.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleShowDetailRecordModal(record)}
                  >
                    Xem chi tiết
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleShowAddVisitModal(record)}
                  >
                    Tạo bệnh án mới
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Không có bệnh án nào</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={(event) => handlePageChange(event.selected + 1)}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />

      {showDetailRecord && selectedRecord && (
        <DetailMedicalRecord
          show={showDetailRecord}
          onClose={handleCloseDetailRecordModal}
          selectedRecord={selectedRecord}
        />
      )}

      {showAddVisitModal && selectedRecord && (
        <AddVisitModal
          show={showAddVisitModal}
          onClose={handleCloseAddVisitModal}
          selectedRecord={selectedRecord}
        />
      )}
    </div>
  );
}

export default ViewPatientRecord;

import React, { useState } from "react";
import "../../style/DoctorFunction/ViewPatientRecord.scss";
import ReactPaginate from "react-paginate";

function ViewPatientRecord() {
  const [selectedRecord, setSelectedRecord] = useState(null);

  const medicalRecords = [
    {
      patient_id: "123456",
      doctor_id: "654321",
      medicalrecord_date: "2024-10-26",
      symptoms: ["Headache", "Fever", "Cough"],
      diagnosis: "Flu",
      treatment_plan: "Rest, Hydration, and Medication",
      notes: ["Follow up in 2 weeks", "Avoid strenuous activity"],
      patient_info: {
        name: "John Doe",
        dob: "1993-05-21",
        gender: "Male",
        contact: "123-456-789",
        address: "123 Patient St, City",
      },
      doctor_info: {
        name: "Dr. Jane Smith",
        specialization: "Cardiology",
        experience: "15 years",
        contact: "987-654-321",
        clinic: "Central Health Clinic",
      },
      prescriptions: [
        {
          medication: "Paracetamol",
          dosage: "500mg",
          frequency: "3 times a day",
          instructions: "Take after meals, do not exceed recommended dose.",
        },
        {
          medication: "Ibuprofen",
          dosage: "200mg",
          frequency: "2 times a day",
          instructions: "Take with water, avoid if experiencing stomach upset.",
        },
      ],
    },
  ];

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
  };

  const handleCloseDetails = () => {
    setSelectedRecord(null);
  };

  return (
    <div className="patient-record">
      <h1>Danh sách hồ sơ bệnh nhân</h1>
      <input
          type="text"
          placeholder="Mã giao dịch, tên dịch vụ, tên bệnh nhân..."
          className="search-bar"
          value="" // Cập nhật giá trị tìm kiếm
        />
      <table className="record-table">
        <thead>
          <tr>
            <th>ID Bệnh nhân</th>
            <th>ID Bác sĩ</th>
            <th>Ngày khám</th>
            <th>Triệu chứng</th>
            <th>Chuẩn đoán</th>
            <th>Kế hoạch điều trị</th>
            <th>Ghi chú</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {medicalRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.patient_id}</td>
              <td>{record.doctor_id}</td>
              <td>{record.medicalrecord_date}</td>
              <td>
                <ul>
                  {record.symptoms.map((symptom, i) => (
                    <li key={i}>{symptom}</li>
                  ))}
                </ul>
              </td>
              <td>{record.diagnosis}</td>
              <td>{record.treatment_plan}</td>
              <td>
                <ul>
                  {record.notes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleViewDetails(record)}
                >
                  Xem chi tiết
                </button>
              </td>
            </tr>
          ))}
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

      {selectedRecord && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Chi tiết hồ sơ bệnh án</h2>
            <div className="modal-scrollable">
              <h3>Thông tin Bệnh nhân</h3>
              <p>
                <strong>Họ và tên:</strong> {selectedRecord.patient_info.name}
              </p>
              <p>
                <strong>Ngày sinh:</strong> {selectedRecord.patient_info.dob}
              </p>
              <p>
                <strong>Giới tính:</strong> {selectedRecord.patient_info.gender}
              </p>
              <p>
                <strong>Liên hệ:</strong> {selectedRecord.patient_info.contact}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {selectedRecord.patient_info.address}
              </p>

              <h3>Thông tin Bác sĩ</h3>
              <p>
                <strong>Họ và tên:</strong> {selectedRecord.doctor_info.name}
              </p>
              <p>
                <strong>Chuyên khoa:</strong>{" "}
                {selectedRecord.doctor_info.specialization}
              </p>
              <p>
                <strong>Kinh nghiệm:</strong>{" "}
                {selectedRecord.doctor_info.experience}
              </p>
              <p>
                <strong>Liên hệ:</strong> {selectedRecord.doctor_info.contact}
              </p>
              <p>
                <strong>Phòng khám:</strong> {selectedRecord.doctor_info.clinic}
              </p>

              <h3>Thông tin Khám</h3>
              <p>
                <strong>Triệu chứng:</strong>{" "}
                {selectedRecord.symptoms.join(", ")}
              </p>
              <p>
                <strong>Chuẩn đoán:</strong> {selectedRecord.diagnosis}
              </p>
              <p>
                <strong>Kế hoạch điều trị:</strong>{" "}
                {selectedRecord.treatment_plan}
              </p>
              <p>
                <strong>Ghi chú:</strong> {selectedRecord.notes.join(", ")}
              </p>

              <h3>Thông tin Thuốc</h3>
              <div>
                {selectedRecord.prescriptions.map((prescription, index) => (
                  <div key={index} className="prescription-item">
                    <p>
                      <strong>Thuốc:</strong> {prescription.medication}
                    </p>
                    <p>
                      <strong>Liều lượng:</strong> {prescription.dosage}
                    </p>
                    <p>
                      <strong>Tần suất:</strong> {prescription.frequency}
                    </p>
                    <p>
                      <strong>Hướng dẫn:</strong> {prescription.instructions}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <button className="btn-close" onClick={handleCloseDetails}></button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewPatientRecord;

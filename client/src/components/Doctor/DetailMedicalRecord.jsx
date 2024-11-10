import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

const DetailMedicalRecord = ({ show, onClose, selectedRecord }) => {
  if (!selectedRecord) return null; // Trả về null nếu không có selectedRecord

  // Kiểm tra xem tất cả các thuộc tính cần thiết có tồn tại không
  const { patient_info = {}, medical_history = [] } = selectedRecord;
  const { first_name, last_name, dob, gender, contact, address } = patient_info;

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết hồ sơ bệnh án</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="patient-info">
          <h3>Thông tin Bệnh nhân</h3>
          <p><strong>Họ và tên:</strong> {first_name} {last_name}</p>
          <p><strong>Ngày sinh:</strong> {dob || "Chưa có thông tin"}</p>
          <p><strong>Giới tính:</strong> {gender || "Chưa có thông tin"}</p>
          <p><strong>Liên hệ:</strong> {contact || "Chưa có thông tin"}</p>
          <p><strong>Địa chỉ:</strong> {address || "Chưa có thông tin"}</p>
        </div>

        <h3>Lịch sử khám</h3>
        <div className="time-line">
          {medical_history.length > 0 ? (
            medical_history.map((visit, index) => {
              const { visit_date, doctor_info = {}, symptoms = [], diagnosis, treatment_plan, notes = [], prescriptions = [] } = visit;
              const { name, specialization, experience, contact, clinic } = doctor_info;

              return (
                <div key={index}>
                  <h4>Ngày: {new Date(visit_date).toLocaleDateString()}</h4>
                  <h5>Thông tin Bác sĩ</h5>
                  <p><strong>Họ và tên:</strong> {name}</p>
                  <p><strong>Chuyên khoa:</strong> {specialization}</p>
                  <p><strong>Kinh nghiệm:</strong> {experience}</p>
                  <p><strong>Liên hệ:</strong> {contact}</p>
                  <p><strong>Phòng khám:</strong> {clinic}</p>

                  <h5>Thông tin Khám</h5>
                  <p><strong>Triệu chứng:</strong> {symptoms.length ? symptoms.join(", ") : "Chưa có thông tin"}</p>
                  <p><strong>Chuẩn đoán:</strong> {diagnosis || "Chưa có thông tin"}</p>
                  <p><strong>Kế hoạch điều trị:</strong> {treatment_plan || "Chưa có thông tin"}</p>
                  <p><strong>Ghi chú:</strong> {notes.length ? notes.join(", ") : "Chưa có thông tin"}</p>

                  <h5>Thông tin Thuốc</h5>
                  {prescriptions.length > 0 ? (
                    prescriptions.map((prescription, index) => (
                      <div key={index} className="prescription-item">
                        <p><strong>Thuốc:</strong> {prescription.medication}</p>
                        <p><strong>Liều lượng:</strong> {prescription.dosage}</p>
                        <p><strong>Tần suất:</strong> {prescription.frequency}</p>
                        <p><strong>Hướng dẫn:</strong> {prescription.instructions}</p>
                      </div>
                    ))
                  ) : (
                    <p>Không có thông tin thuốc.</p>
                  )}
                </div>
              );
            })
          ) : (
            <p>Không có lịch sử khám nào.</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  );
};

DetailMedicalRecord.propTypes = {
  show: PropTypes.bool.isRequired, // Modal có hiển thị không
  onClose: PropTypes.func.isRequired, // Hàm đóng modal
  selectedRecord: PropTypes.object, // Hồ sơ bệnh án được chọn
};

export default DetailMedicalRecord;

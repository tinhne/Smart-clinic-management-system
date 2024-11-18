import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { getUserById } from "../../utils/AuthAPI/AdminService";

const DetailMedicalRecord = ({ show, onClose, selectedRecord }) => {
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorInfo = async (doctorId) => {
      try {
        const response = await getUserById(doctorId, "doctor");
        setDoctorInfo(response.user);
      } catch (error) {
        console.error("Error fetching doctor info:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedRecord && selectedRecord.medical_history.length > 0) {
      const doctorId = selectedRecord.medical_history[0].doctor_id;
      fetchDoctorInfo(doctorId);
    } else {
      setLoading(false);
    }
  }, [selectedRecord]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedRecord) return null;

  const { patient_info = {}, medical_history = [] } = selectedRecord;
  const { name, dob, gender, address } = patient_info;

  console.log("Selected Record:", selectedRecord);

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết hồ sơ bệnh án</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="patient-info">
          <h3>Thông tin Bệnh nhân</h3>
          <p>
            <strong>Họ và tên:</strong> {name}
          </p>
          <p>
            <strong>Ngày sinh:</strong> {dob || "Chưa có thông tin"}
          </p>
          <p>
            <strong>Giới tính:</strong> {gender || "Chưa có thông tin"}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {address || "Chưa có thông tin"}
          </p>
        </div>

        <h3>Lịch sử khám</h3>
        <div className="time-line">
          {medical_history.length > 0 ? (
            medical_history.map((visit, index) => {
              const {
                visit_date,
                symptoms = [],
                diagnosis,
                treatment_plan,
                notes = [],
                prescriptions = [],
              } = visit;

              return (
                <div key={index}>
                  <h4>Ngày: {new Date(visit_date).toLocaleDateString()}</h4>
                  <h5>Thông tin Bác sĩ</h5>
                  {doctorInfo ? (
                    <>
                      <p>
                        <strong>Họ và tên:</strong> {doctorInfo.first_name} {doctorInfo.last_name}
                      </p>
                      <p>
                        <strong>Email:</strong> {doctorInfo.email}
                      </p>
                      <p>
                        <strong>Điện thoại:</strong> {doctorInfo.phone}
                      </p>
                      <p>
                        <strong>Địa chỉ:</strong> {doctorInfo.address}
                      </p>
                      <p>
                        <strong>Chuyên khoa:</strong> {doctorInfo.specialties.join(", ")}
                      </p>
                    </>
                  ) : (
                    <p>Không có thông tin bác sĩ.</p>
                  )}
                  <h5>Thông tin Khám</h5>
                  <p>
                    <strong>Triệu chứng:</strong>{" "}
                    {symptoms.length ? symptoms.join(", ") : "Chưa có thông tin"}
                  </p>
                  <p>
                    <strong>Chuẩn đoán:</strong>{" "}
                    {diagnosis || "Chưa có thông tin"}
                  </p>
                  <p>
                    <strong>Kế hoạch điều trị:</strong>{" "}
                    {treatment_plan || "Chưa có thông tin"}
                  </p>
                  <p>
                    <strong>Ghi chú:</strong>{" "}
                    {notes.length ? notes.join(", ") : "Chưa có thông tin"}
                  </p>

                  <h5>Thông tin Thuốc</h5>
                  {Array.isArray(prescriptions) && prescriptions.length > 0 ? (
                    prescriptions.map((prescription, index) => (
                      <div key={index} className="prescription-item">
                        <p>
                          <strong>Thuốc:</strong> {prescription.medication_name || "Chưa có thông tin"}
                        </p>
                        <p>
                          <strong>Liều lượng:</strong> {prescription.dosage || "Chưa có thông tin"}
                        </p>
                        <p>
                          <strong>Tần suất:</strong> {prescription.frequency || "Chưa có thông tin"}
                        </p>
                        <p>
                          <strong>Hướng dẫn:</strong> {prescription.instructions || "Chưa có thông tin"}
                        </p>
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
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DetailMedicalRecord.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedRecord: PropTypes.object,
};

export default DetailMedicalRecord;

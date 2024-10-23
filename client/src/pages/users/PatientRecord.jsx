import React, { useEffect, useState } from "react";
import "../../style/PatientRecord/PatientRecord.scss";
import { useLocation, useParams } from "react-router-dom";
import { getUserById } from "../../utils/AuthAPI/AdminService"; // Import API service

const PatientRecord = () => {
  const { idDoctor, idPatient } = useParams(); // Lấy doctorId và patientId từ URL
  const [doctor, setDoctor] = useState(null);
  const [patient, setPatient] = useState(null);
  const location = useLocation(); 
  const { selectedDate, selectedSlot } = location.state || {}; // Nhận dữ liệu được truyền
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("vi-VN"); // "vi-VN" để định dạng theo kiểu Việt Nam: dd/mm/yyyy
  };
  const dateFormat= formatDate(selectedDate);
  useEffect(() => {
    // Gọi API để lấy thông tin bác sĩ
    const fetchDoctor = async () => {
      try {
        const doctorData = await getUserById(idDoctor, "doctor");
        setDoctor(doctorData);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin bác sĩ:", error);
      }
    };

    // Gọi API để lấy thông tin bệnh nhân
    const fetchPatient = async () => {
      try {
        const patientData = await getUserById(idPatient, "patient");
        setPatient(patientData);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin bệnh nhân:", error);
      }
    };

    if (idDoctor) fetchDoctor();
    if (idPatient) fetchPatient();
  }, [idDoctor, idPatient]);
  console.log("selectedDate, selectedSlot ",selectedDate, selectedSlot);

  if (!doctor || !patient) {
    return <p>Loading...</p>; // Hiển thị khi dữ liệu đang tải
  }

  return (
    <div className="medical-record">
      <div className="patient-record">
        {/* Patient Header Section */}
        <div className="patient-header">
          <div className="avatar">
            <div className="avatar-text">{`${patient.user.first_name[0]}${patient.user.last_name[0]}`}</div>
          </div>
          <div className="header-info">
            <h3>
              {patient.user.first_name} {patient.user.last_name}
            </h3>
            <p>{patient.user.birthdate}</p>
          </div>
        </div>

        {/* Patient Info Section */}
        <div className="patient-info">
          <div className="info-item">
            <span className="label">Mã bệnh nhân:</span>
            <span>{patient.user._id}</span>
          </div>
          <div className="info-item">
            <span className="label">Họ và tên:</span>
            <span>
              {patient.user.first_name} {patient.user.last_name}
            </span>
          </div>
          <div className="info-item">
            <span className="label">Giới tính:</span>
            <span>{patient.user.gender}</span>
          </div>
          <div className="info-item">
            <span className="label">Ngày sinh:</span>
            <span>{patient.user.birthdate}</span>
          </div>
          <div className="info-item">
            <span className="label">Số điện thoại:</span>
            <span>{patient.user.phone || "Chưa có số điện thoại"}</span>
          </div>
        </div>

        <div className="infor">
          <p>Thông tin bổ sung (không bắt buộc)</p>
        </div>

        {/* Patient Note Section */}
        <div className="patient-note">
          <h4>Ghi chú </h4>
          <textarea name="" id="" placeholder="Triệu chứng..."></textarea>
        </div>
      </div>

      {/* Booking Information Section */}
      <div className="info-booking">
        <h4>Thông tin đặt khám</h4>

        {/* Doctor Information */}
        <div className="booking-doctor">
          <div className="doctor-img">
            <img
              src={`data:image/jpeg;base64,${doctor.user.imageUrl}`}
              alt="Doctor"
            />
          </div>
          <div className="infor-doctor">
            <div className="name-doctor">
              {doctor.user.first_name} {doctor.user.last_name}
            </div>
            <div className="address-doctor">
              {doctor.user.address || "Địa chỉ không có sẵn"}
            </div>
          </div>
        </div>

        {/* Booking Time Information */}
        <div className="booking-time">
          <div className="time-item">
            <span className="label">Ngày khám</span>
            <span>{dateFormat }</span> {/* Hiển thị ngày được chọn */}
          </div>
          <div className="time-item">
            <span className="label">Khung giờ</span>
            <span>{selectedSlot}</span> {/* Hiển thị khung giờ được chọn */}
          </div>
          <div className="time-item">
            <span className="label">Bệnh nhân</span>
            <span>
              {patient.user.first_name} {patient.user.last_name}
            </span>
          </div>
        </div>

        {/* Booking Button */}
        <button className="booking-button">Đặt lịch</button>
      </div>
    </div>
  );
};

export default PatientRecord;

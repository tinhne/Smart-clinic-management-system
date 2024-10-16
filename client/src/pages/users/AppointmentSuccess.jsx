import React from "react";
import "../../style/AppointmentSuccess/AppointmentSuccess.scss";

const AppointmentSuccess = () => {
  return (
    <div className="appointment-success">
      {/* Success Message */}
      <div className="success-header">
        <div className="success-icon">
          <span>✔</span>
        </div>
        <h2>Đặt lịch thành công</h2>
      </div>

      {/* Row 1: Doctor Info and QR Code */}
      <div className="row">
        <div className="doctor-info">
          <div className="doctor-img">
            <img src="https://via.placeholder.com/70" alt="Doctor" />
          </div>
          <div className="doctor-details">
            <div className="doctor-name">Lâm Việt Trung</div>
            <div className="doctor-address">
              53 Phạm Hữu Chí, P.12, Q.5, TP.HCM
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Appointment and Patient Information */}
      <div className="row info-section">
        {/* Left Column: Appointment Info */}
        <div className="info-column">
          <h4>Thông tin đặt khám</h4>
          <div className="info-item">
            <span className="label">Mã phiếu khám</span>
            <span>YMA2410160853</span>
          </div>
          <div className="info-item">
            <span className="label">STT</span>
            <span>29</span>
          </div>
          <div className="info-item">
            <span className="label">Ngày khám</span>
            <span>16/10/2024</span>
          </div>
          <div className="info-item">
            <span className="label">Chuyên khoa</span>
            <span>Tiêu hóa</span>
          </div>
        </div>

        {/* Right Column: Patient Info */}
        <div className="info-column">
          <h4>Thông tin bệnh nhân</h4>
          <div className="info-item">
            <span className="label">Bệnh nhân</span>
            <span>Dũng</span>
          </div>
          <div className="info-item">
            <span className="label">Điện thoại</span>
            <span>0935038810</span>
          </div>
          <div className="info-item">
            <span className="label">Ngày sinh</span>
            <span>02/09/2020</span>
          </div>
          <div className="info-item">
            <span className="label">Giới tính</span>
            <span>Nam</span>
          </div>

          <div className="info-item">
            <span className="label">Địa chỉ</span>
            <span>---</span>
          </div>
          <div className="info-item">
            <span className="label">Ghi chú</span>
            <span>---</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSuccess;

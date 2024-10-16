import React from "react";
import "../../style/PatientRecord/PatientRecord.scss";

const PatientRecord = () => {
  return (
    <div className="medical-record">
      <div className="patient-record">
        {/* Patient Header Section */}
        <div className="patient-header">
          <div className="avatar">
            <div className="avatar-text">DU</div>
          </div>
          <div className="header-info">
            <h3>Dũng</h3>
            <p>02/09/2020</p>
          </div>
        </div>

        {/* Patient Info Section */}
        <div className="patient-info">
          <div className="info-item">
            <span className="label">Mã bệnh nhân:</span>
            <span>YMP241951749</span>
          </div>
          <div className="info-item">
            <span className="label">Họ và tên:</span>
            <span>Dũng</span>
          </div>
          <div className="info-item">
            <span className="label">Giới tính:</span>
            <span>Nam</span>
          </div>
          <div className="info-item">
            <span className="label">Ngày sinh:</span>
            <span>02/09/2020</span>
          </div>
          <div className="info-item">
            <span className="label">Số điện thoại:</span>
            <span>0935038810</span>
          </div>
        </div>

        <div className="edit-info">
          <button>Điều Chỉnh</button>
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
            <img src="https://via.placeholder.com/50" alt="Doctor" />
          </div>
          <div className="infor-doctor">
            <div className="name-doctor">Lâm Việt Trung</div>
            <div className="address-doctor">
              53 Phạm Hữu Chí, P.12, Q.5, TP.HCM
            </div>
          </div>
        </div>

        {/* Booking Time Information */}
        <div className="booking-time">
          <div className="time-item">
            <span className="label">Ngày khám</span>
            <span>16/10/2024</span>
          </div>
          <div className="time-item">
            <span className="label">Khung giờ</span>
            <span>18:30-18:45</span>
          </div>
          <div className="time-item">
            <span className="label">Bệnh nhân</span>
            <span>Dũng</span>
          </div>
        </div>

        {/* Booking Button */}
        <button className="booking-button">Đặt lịch</button>
      </div>
    </div>
  );
};

export default PatientRecord;

import React from "react";
import { FaCalendarAlt, FaTimesCircle } from "react-icons/fa";
import "../../style/Appointment/Appointment.scss";
import doctor from "../../assets/img/customer01.png";
const Appointment = () => {
  return (
    <div className="appointment-container">
      <div className="appointment-list">
        <h2>Lịch khám</h2>
        <input
          type="text"
          placeholder="Mã giao dịch, tên dịch vụ, tên bệnh nhân..."
          className="search-bar"
        />
        <ul>
          <li className="appointment-item">
            <div>
              <h3>Lâm Viêt Trung</h3>
              <p>18:45 - 16/10/2024</p>
              <h4>Dung</h4>
              <span className="status">
                <FaCalendarAlt /> Đã đặt lịch
              </span>
            </div>
            <span className="stt">STT: 29</span>
          </li>
          <li className="appointment-item">
            <div>
              <h3>Lâm Viêt Trung</h3>
              <p>18:15 - 16/10/2024</p>
              <h4>Dung</h4>
              <span className="status cancelled">
                <FaTimesCircle />
                Đã hủy
              </span>
            </div>
            <span className="stt">STT: 23</span>
          </li>
          <li className="appointment-item">
            <div>
              <h3>Lâm Viêt Trung</h3>
              <p>17:15 - 07/10/2024</p>
              <h4>Dung</h4>
              <span className="status">
                <FaCalendarAlt /> Đã đặt lịch
              </span>
            </div>
            <span className="stt">STT: 12</span>
          </li>
          <li className="appointment-item">
            <div>
              <h3>Lê Thị Minh Hồng</h3>
              <p>18:15 - 23/09/2024</p>
              <h4>Dung</h4>
              <span className="status">
                <FaCalendarAlt /> Đã đặt lịch
              </span>
            </div>
            <span className="stt">STT: 16</span>
          </li>
        </ul>
      </div>

      {/* Right Section - Details of the selected appointment */}
      <div className="appointment-details">
        <div className="appointment-info">
          <span className="stt">STT: 29</span>
          <span className="time">
            <FaCalendarAlt /> Đã đặt lịch
          </span>
        </div>
        <div className="details-header">
          <img src={doctor} alt="Doctor" className="doctor-img" />
          <div className="doctor-info-app">
            <h3>Lâm Viêt Trung</h3>
            <p>53 Phạm Hữu Chí, P.12, Q.5, TP.HCM</p>
          </div>
        </div>

        <div className="info-section">
          <h3>Thông tin đặt khám</h3>
          <div className="info-row">
            <p className="label">Mã phiếu khám:</p>
            <p className="value">YMA2410160853</p>
          </div>
          <div className="info-row">
            <p className="label">Ngày khám:</p>
            <p className="value">16/10/2024</p>
          </div>
          <div className="info-row">
            <p className="label">Chuyên khoa:</p>
            <p className="value">Tiêu hóa</p>
          </div>
        </div>

        <div className="info-section">
          <h3>Thông tin bệnh nhân</h3>
          <div className="info-row">
            <p className="label">Mã bệnh nhân:</p>
            <p className="value">YMP241951749</p>
          </div>
          <div className="info-row">
            <p className="label">Họ và tên:</p>
            <p className="value">Dũng</p>
          </div>
          <div className="info-row">
            <p className="label">Giới tính:</p>
            <p className="value">Nữ</p>
          </div>
          <div className="info-row">
            <p className="label">Năm sinh:</p>
            <p className="value">02/09/2020</p>
          </div>
          <div className="info-row">
            <p className="label">Số điện thoại:</p>
            <p className="value">0935038810</p>
          </div>
        </div>
        <div className="appointment-result">
          <h3>Kết quả</h3>
          <div className="result-container">
            <img
              src="https://via.placeholder.com/150" // You can replace this with the actual image path
              alt="Result Placeholder"
              className="result-image"
            />
            <p>Đang chờ kết quả cập nhật</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;

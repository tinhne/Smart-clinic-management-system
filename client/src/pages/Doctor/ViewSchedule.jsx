import React from "react";
import { FaCalendarAlt, FaTimesCircle } from "react-icons/fa";
import doctorPlaceholder from "../../assets/img/customer01.png"; // Hình ảnh mặc định
import "../../style/DoctorFunction/ViewSchedule.scss";

const ViewSchedule = () => {
  return (
    <div className="view-schedule-container">
      <div className="view-schedule-list">
        <h2>Lịch khám</h2>
        <input
          type="text"
          placeholder="Mã giao dịch, tên dịch vụ, tên bệnh nhân..."
          className="view-schedule-search-bar"
        />
        <div className="view-schedule-content">
          <ul>
            {/* Danh sách lịch hẹn (tĩnh) */}
            <li className="view-schedule-item">
              <div>
                <h3>Bệnh nhân: Nguyễn Tấn Dũng</h3>
                <p>Thời gian - Ngày khám</p>
                <h4 className="view-schedule-type">Loại khám</h4>
                <span className="view-schedule-status">
                  <FaCalendarAlt />
                  Đã đặt lịch
                </span>
                <button className="view-schedule-cancel">
                  <FaTimesCircle /> Hủy lịch
                </button>
              </div>
              <span className="view-schedule-stt">STT: 01</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="view-schedule-details">
        <div className="view-schedule-info">
          <span className="view-schedule-stt">STT: 01</span>
          <span className="view-schedule-time">
            <FaCalendarAlt /> Đã xác nhận
          </span>
        </div>
        <div className="view-schedule-header">
          <img
            src={doctorPlaceholder}
            alt="Doctor"
            className="view-schedule-doctor-img"
          />
          <div className="view-schedule-doctor-info">
            <h3>Bác sĩ không xác định</h3>
            <p>Địa chỉ không xác định</p>
          </div>
        </div>

        <div className="view-schedule-info-section">
          <h3>Thông tin đặt khám</h3>
          <div className="view-schedule-info-row">
            <p className="view-schedule-label">Mã phiếu khám:</p>
            <p className="view-schedule-value">Không xác định</p>
          </div>
          <div className="view-schedule-info-row">
            <p className="view-schedule-label">Ngày khám:</p>
            <p className="view-schedule-value">Không xác định</p>
          </div>
          <div className="view-schedule-info-row">
            <p className="view-schedule-label">Loại khám:</p>
            <p className="view-schedule-value">Không xác định</p>
          </div>
          <div className="view-schedule-info-row">
            <p className="view-schedule-label">Ghi chú:</p>
            <p className="view-schedule-value">Không có ghi chú</p>
          </div>
        </div>

        <div className="view-schedule-info-section">
          <h3>Thông tin bệnh nhân</h3>
          <div className="view-schedule-info-row">
            <p className="view-schedule-label">Mã bệnh nhân:</p>
            <p className="view-schedule-value">Không xác định</p>
          </div>
          <div className="view-schedule-info-row">
            <p className="view-schedule-label">Họ và tên:</p>
            <p className="view-schedule-value">Không xác định</p>
          </div>
          <div className="view-schedule-info-row">
            <p className="view-schedule-label">Giới tính:</p>
            <p className="view-schedule-value">Không xác định</p>
          </div>
          <div className="view-schedule-info-row">
            <p className="view-schedule-label">Năm sinh:</p>
            <p className="view-schedule-value">Không xác định</p>
          </div>
          <div className="view-schedule-info-row">
            <p className="view-schedule-label">Điện thoại:</p>
            <p className="view-schedule-value">Không xác định</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSchedule;

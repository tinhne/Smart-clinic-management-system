import React from "react";
import "../../style/DoctorProfile/DoctorProfile.scss";
import doctor from "../../assets/img/customer01.png";

const DoctorProfile = () => {
  return (
    <div className="doctor-profile">
      <div className="doctor-header">
        <div className="doctor-img">
          <img src={doctor} alt="Doctor" />
        </div>
        <div className="doctor-info">
          <h2 className="doctor-name">Bác sĩ chuyên khoa 2 Lê Thị Minh Hồng</h2>
          <div className="doctor-details">
            <span className="doctor-title">Bác sĩ</span>
            <span className="doctor-experience">24 năm kinh nghiệm</span>
          </div>
          <div className="doctor-specialty">
            <span>Chuyên khoa: </span>
            <a href="#">Nhi khoa</a>
          </div>
        </div>
      </div>

      <div className="note-container">
        <div className="note-header">
          <span className="note-icon">⚠️</span>
          <h3 className="note-title">Lưu ý</h3>
        </div>
        <p className="note-content">
          * Nếu bệnh nhân bận việc không đến khám được vui lòng hủy lịch khám đã
          đặt và đặt lại ngày khác. Xin cảm ơn!
        </p>
      </div>

      <div className="quick-booking">
        <h3 className="section-title">Đặt khám nhanh</h3>
        <div className="date-list">
          <div className="date-item active">
            <span>Th 4, 16-10</span>
            <span className="time-frame">3 khung giờ</span>
          </div>
          <div className="date-item ">
            <span>Th 4, 16-10</span>
            <span className="time-frame">3 khung giờ</span>
          </div>
          <div className="date-item ">
            <span>Th 4, 16-10</span>
            <span className="time-frame">3 khung giờ</span>
          </div>
          <div className="date-item ">
            <span>Th 4, 16-10</span>
            <span className="time-frame">3 khung giờ</span>
          </div>
          <div className="date-item ">
            <span>Th 4, 16-10</span>
            <span className="time-frame">3 khung giờ</span>
          </div>
          <div className="date-item ">
            <span>Th 4, 16-10</span>
            <span className="time-frame">3 khung giờ</span>
          </div>
          <div className="date-item ">
            <span>Th 4, 16-10</span>
            <span className="time-frame">3 khung giờ</span>
          </div>
          <div className="date-item">
            <span>Th 6, 18-10</span>
            <span className="time-frame">6 khung giờ</span>
          </div>
          <div className="date-item">
            <span>Th 2, 21-10</span>
            <span className="time-frame">6 khung giờ</span>
          </div>
          <div className="date-item">
            <span>Th 4, 23-10</span>
            <span className="time-frame">9 khung giờ</span>
          </div>
          <div className="date-item">
            <span>Th 6, 25-10</span>
            <span className="time-frame">9 khung giờ</span>
          </div>
          <div className="date-item">
            <span>Th 2, 28-10</span>
            <span className="time-frame">9 khung giờ</span>
          </div>
        </div>

        <div className="time-slot-section">
          <div className="time-slot-title">
            <span role="img" aria-label="sun">
              🌅
            </span>{" "}
            Buổi chiều
          </div>
          <div className="time-slot-list">
            <button className="time-slot">18:15 - 18:30</button>
            <button className="time-slot">18:30 - 18:45</button>
            <button className="time-slot">18:45 - 19:00</button>
            <button className="time-slot">18:15 - 18:30</button>
            <button className="time-slot">18:30 - 18:45</button>
            <button className="time-slot">18:45 - 19:00</button>
            <button className="time-slot">18:15 - 18:30</button>
            <button className="time-slot">18:30 - 18:45</button>
            <button className="time-slot">18:45 - 19:00</button>
            <button className="time-slot">18:15 - 18:30</button>
            <button className="time-slot">18:30 - 18:45</button>
            <button className="time-slot">18:45 - 19:00</button>
            <button className="time-slot">18:15 - 18:30</button>
            <button className="time-slot">18:30 - 18:45</button>
            <button className="time-slot">18:45 - 19:00</button>
            <button className="time-slot">18:15 - 18:30</button>
            <button className="time-slot">18:30 - 18:45</button>
            <button className="time-slot">18:45 - 19:00</button>
            <button className="time-slot">18:15 - 18:30</button>
            <button className="time-slot">18:30 - 18:45</button>
            <button className="time-slot">18:45 - 19:00</button>
            <button className="time-slot">18:15 - 18:30</button>
            <button className="time-slot">18:30 - 18:45</button>
            <button className="time-slot">18:45 - 19:00</button>
            <button className="time-slot">18:15 - 18:30</button>
            <button className="time-slot">18:30 - 18:45</button>
            <button className="time-slot">18:45 - 19:00</button>
            <button className="time-slot">18:15 - 18:30</button>
            <button className="time-slot">18:30 - 18:45</button>
            <button className="time-slot">18:45 - 19:00</button>
            <button className="time-slot">18:15 - 18:30</button>
            <button className="time-slot">18:30 - 18:45</button>
            <button className="time-slot">18:45 - 19:00</button>
            <button className="time-slot">18:15 - 18:30</button>
            <button className="time-slot">18:30 - 18:45</button>
            <button className="time-slot">18:45 - 19:00</button>
            <button className="time-slot">18:15 - 18:30</button>
            <button className="time-slot">18:30 - 18:45</button>
            <button className="time-slot">18:45 - 19:00</button>
            <button className="time-slot">18:15 - 18:30</button>
            <button className="time-slot">18:30 - 18:45</button>
            <button className="time-slot">18:45 - 19:00</button>
            <button className="time-slot">18:15 - 18:30</button>
            <button className="time-slot">18:30 - 18:45</button>
            <button className="time-slot">18:45 - 19:00</button>
            <button className="time-slot">18:15 - 18:30</button>
            <button className="time-slot">18:30 - 18:45</button>
            <button className="time-slot">18:45 - 19:00</button>
            <button className="time-slot">18:15 - 18:30</button>
            <button className="time-slot">18:30 - 18:45</button>
            <button className="time-slot">18:45 - 19:00</button>
            <button className="time-slot">18:15 - 18:30</button>
            <button className="time-slot">18:30 - 18:45</button>
            <button className="time-slot">18:45 - 19:00</button>
            <button className="time-slot">18:15 - 18:30</button>
            <button className="time-slot">18:30 - 18:45</button>
            <button className="time-slot">18:45 - 19:00</button>
            <button className="time-slot">18:15 - 18:30</button>
            <button className="time-slot">18:30 - 18:45</button>
            <button className="time-slot">18:45 - 19:00</button>
            <button className="time-slot">18:15 - 18:30</button>
            <button className="time-slot">18:30 - 18:45</button>
            <button className="time-slot">18:45 - 19:00</button>
          </div>
        </div>
      </div>

      <div className="description">
        <h3>Giới thiệu</h3>
        <p>
          Bác sĩ Chuyên khoa II Lê Thị Minh Hồng hiện đang là Phó Giám đốc Bệnh
          viện Nhi Đồng 2. Bác sĩ trực tiếp khám bệnh theo yêu cầu chất lượng
          cao tại Bệnh Viện Nhi Đồng 2 và phòng khám Nhi khoa (250 Nguyễn Xí,
          Phường 13, Bình Thạnh, TP.HCM).
        </p>
        <ul>
          <li>
            Khám và điều trị các bệnh lý Nhi khoa: tiêu hóa, hô hấp, thận,
            nhiễm, dị ứng, tai mũi họng,...
          </li>
          <li>Khám tư vấn dinh dưỡng và phát triển thể chất cho trẻ em.</li>
          <li>
            Khám và tư vấn về sức khỏe, phòng ngừa bệnh cho trẻ em và phụ nữ
            mang thai.
          </li>
          <li>
            Tham gia các chương trình tình nguyện, hướng dẫn cách chăm sóc trẻ
            sơ sinh, trẻ nhỏ.
          </li>
        </ul>
      </div>

      <div className="booking-footer">
        <span className="support-text">
          Hỗ trợ đặt khám <strong>0935038810</strong>
        </span>
        <button className="book-now-button">Đặt khám ngay</button>
      </div>
    </div>
  );
};

export default DoctorProfile;

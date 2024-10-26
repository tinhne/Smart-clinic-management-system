import React from "react";
import "../../style/DoctorFunction/DoctorInfor.scss";

function DoctorInfor() {
  return (
    <div className="doctor-infor">
      <div className="profile-header">
        <div className="doctor-left">
          <img
            src="https://via.placeholder.com/150" // Thay thế bằng ảnh thực tế của bác sĩ
            alt="Doctor"
            className="doctor-photo"
          />
          <h2 className="doctor-name">
            <strong>Bác sĩ: </strong> Trần Văn Linh
          </h2>
        </div>
        <div className="doctor-right">
          <h1 className="page-title">Thông tin bác sĩ</h1>

          <p className="doctor-experience">
            <strong>Kinh Nghiệm:</strong> 19 Years
          </p>
          <p className="doctor-birthday">
            <strong>Ngày sinh:</strong> 10/11/2003
          </p>
          <p className="doctor-gender">
            <strong>Giới tính:</strong> Nam
          </p>
          <p className="doctor-address">
            <strong>Địa chỉ:</strong> Quảng Nam, Việt Nam
          </p>
        </div>
      </div>

      <div className="specialty-section">
        <h3>Chuyên khoa: </h3>
        <div className="specialties">
          <span className="specialty-tag">Dentistry</span>
          <span className="specialty-tag">Surgery</span>
          <span className="specialty-tag">Implantology</span>
          <span className="specialty-tag">Paediatrics</span>
        </div>
      </div>

      <div className="contact-section">
        <h3>Thông tin liên hệ</h3>
        <p className="clinic-name">Công tác tại Capstone 1 Clinic</p>
        <p className="contact-phone">
          <span className="icon">📞</span> 0123 456 789
        </p>
        <p className="contact-email">
          <span className="icon">📧</span> macy@mail.com | www.macyweb.com
        </p>
      </div>
    </div>
  );
}

export default DoctorInfor;

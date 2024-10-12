import React from "react";
import "../../style/footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__section">
          <h4>CAPTONE 1 PROJECT</h4>
          <p>120 Hoàng Minh Thảo, Đà Nẵng</p>
          <p>
            Hotline: <a href="tel:0935038810">0935038810</a>
          </p>
          <p>Cline Management System</p>
          <p>Dũng - Nhân - Tính - Hiếu</p>
        </div>
        <div className="footer__section">
          <h4>Về CAPSTONE</h4>
          <ul>
            <li>
              <a href="#">Giới thiệu về CAPSTONE 1</a>
            </li>
            <li>
              <a href="#">Thành viên nhóm</a>
            </li>
            <li>
              <a href="#">Thông tin dự án</a>
            </li>
            <li>
              <a href="#">Liên hệ</a>
            </li>
          </ul>
        </div>
        <div className="footer__section">
          <h4>Dịch vụ</h4>
          <ul>
            <li>
              <a href="#">Đặt khám Phòng Khám</a>
            </li>
            <li>
              <a href="#">Tư Vấn Trực Tuyến</a>
            </li>
            <li>
              <a href="#">Đặt khám Chuyên Khoa</a>
            </li>
            <li>
              <a href="#">Hồ Sơ Bệnh Án</a>
            </li>
            <li>
              <a href="#">Dịch vụ Phòng Khám</a>
            </li>
          </ul>
        </div>
        <div className="footer__section">
          <h4>Hỗ trợ</h4>
          <ul>
            <li>
              <a href="#">Điều Khoản Sử Dụng</a>
            </li>
            <li>
              <a href="#">Chính Sách Bảo Mật</a>
            </li>
            <li>
              <a href="#">Chính sách giải quyết khiếu nại</a>
            </li>
            <li>
              <a href="mailto:cskh@youmed.vn">Hỗ trợ khách hàng</a>
            </li>
            <li>
              <a href="mailto:cskh@youmed.vn">Tư vấn khách hàng</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p>
          Các thông tin trên Capstone1 chỉ dành cho mục đích tham khảo, tra cứu
          và không thay thế cho việc chẩn đoán hoặc điều trị y khoa.
        </p>
        <p>Cần tuyệt đối tuân theo hướng dẫn của Bác sĩ và Nhân viên y tế.</p>
        <p>Copyright © 2018 - 2024 Công ty TNHH Capstone1 Việt Nam.</p>
      </div>
    </footer>
  );
};

export default Footer;

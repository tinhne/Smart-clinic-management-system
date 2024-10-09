import React from "react";
import "../../style/footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__section">
          <h4>CÔNG TY TNHH CAPTONE 1 VIỆT NAM</h4>
          <p>VPĐD: 120 Hoàng Minh Thảo, Đà Nẵng Việt Nam</p>
          <p>
            Hotline: <a href="tel:19002805">1900 2805</a> (6:30 - 20:30 từ T2
            đến T7)
          </p>
          <p>
            Số ĐKKD 0315268642 do Sở Kế hoạch và Đầu tư TP. Hồ Chí Minh cấp lần
            đầu ngày 14/09/2018.
          </p>
          <p>Chịu trách nhiệm nội dung: Dược sĩ Dương Anh Hoàng.</p>
        </div>
        <div className="footer__section">
          <h4>Về YouMed</h4>
          <ul>
            <li>
              <a href="#">Giới thiệu về CAPSTONE 1</a>
            </li>
            <li>
              <a href="#">Ban điều hành</a>
            </li>
            <li>
              <a href="#">Nhân sự & Tuyển dụng</a>
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
              <a href="#">Đặt khám Bác sĩ</a>
            </li>
            <li>
              <a href="#">Đặt khám Bệnh viện</a>
            </li>
            <li>
              <a href="#">Đặt khám Phòng Khám</a>
            </li>
            <li>
              <a href="#">YouMed Store</a>
            </li>
            <li>
              <a href="#">Y360</a>
            </li>
            <li>
              <a href="#">YouMed Clinic</a>
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
              <a href="mailto:cskh@youmed.vn">
                Hỗ trợ khách hàng: cskh@youmed.vn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p>
          Các thông tin trên YouMed chỉ dành cho mục đích tham khảo, tra cứu và
          không thay thế cho việc chẩn đoán hoặc điều trị y khoa.
        </p>
        <p>Cần tuyệt đối tuân theo hướng dẫn của Bác sĩ và Nhân viên y tế.</p>
        <p>Copyright © 2018 - 2024 Công ty TNHH YouMed Việt Nam.</p>
      </div>
    </footer>
  );
};

export default Footer;

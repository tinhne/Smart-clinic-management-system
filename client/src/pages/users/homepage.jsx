import image1 from "../../assets/img/image1.png";
import avatar from "../../assets/img/1237b30268db9ee0c9cbe3a79b1ff8fa.jpg";
import "../../style/homepage.scss";
import { CiSearch } from "react-icons/ci";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const HomePage = () => {
  return (
    <>
      <div className="body-homepage">
        <div className="description-search-container">
          <p className="description_1">Ứng dụng đặt khám </p>
          <p className="description_2">
            Đặt khám với hơn 600 bác sỹ, 160 bệnh nhân, 56 phòng khám trên
            Pandora để có số thứ tự và khung giờ khám trước.
          </p>

          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Triệu chứng, bác sĩ, phòng khám,..."
            />
            <CiSearch className="search-icon" />
          </div>
        </div>

        <img src={image1} className="img-home-page" />
      </div>
      <div className="booking_container">
        <div className="booking_header">
          <p className="title">Đặt lịch phòng khám trực tuyến</p>
          <p className="description">
            Tìm bác sĩ chính xác - Đặt lịch khám dễ dàng
          </p>
        </div>
        <div className="booking_doctor">
          <div className="action">
            <div>
              <p className="booking_title">Đặt khám bác sĩ</p>
              <p className="booking_content">
                Phiếu khám kèm số thứ tự và thời gian của bạn được xác nhận
              </p>
            </div>
            <div>
              <button className="view-more-button">Xem Thêm &gt;</button>
            </div>
          </div>
          <div className="doctor-cards">
            <div className="doctor-card">
              <div className="doctor-image">
                <img src={avatar} alt="Doctor Avatar" />
              </div>
              <div className="doctor-info">
                <h3>BS. CK1 Nguyễn Thành Nhân</h3>
                <p>Tai Mũi họng</p>
                <p>Bệnh viện Y Huế</p>
              </div>
              <div className="doctor-action">
                <button>Đặt lịch khám</button>
              </div>
            </div>
            <div className="doctor-card">
              <div className="doctor-image">
                <img src={avatar} alt="Doctor Avatar" />
              </div>
              <div className="doctor-info">
                <h3>BS. CK1 Nguyễn Thành Nhân</h3>
                <p>Tai Mũi họng</p>
                <p>Bệnh viện Y Huế</p>
              </div>
              <div className="doctor-action">
                <button>Đặt lịch khám</button>
              </div>
            </div>
            <div className="doctor-card">
              <div className="doctor-image">
                <img src={avatar} alt="Doctor Avatar" />
              </div>
              <div className="doctor-info">
                <h3>BS. CK1 Nguyễn Thành Nhân</h3>
                <p>Tai Mũi họng</p>
                <p>Bệnh viện Y Huế</p>
              </div>
              <div className="doctor-action">
                <button>Đặt lịch khám</button>
              </div>
            </div>
            <div className="doctor-card">
              <div className="doctor-image">
                <img src={avatar} alt="Doctor Avatar" />
              </div>
              <div className="doctor-info">
                <h3>BS. CK1 Nguyễn Thành Nhân</h3>
                <p>Tai Mũi họng</p>
                <p>Bệnh viện Y Huế</p>
              </div>
              <div className="doctor-action">
                <button>Đặt lịch khám</button>
              </div>
            </div>
            <div className="doctor-card">
              <div className="doctor-image">
                <img src={avatar} alt="Doctor Avatar" />
              </div>
              <div className="doctor-info">
                <h3>BS. CK1 Nguyễn Thành Nhân</h3>
                <p>Tai Mũi họng</p>
                <p>Bệnh viện Y Huế</p>
              </div>
              <div className="doctor-action">
                <button>Đặt lịch khám</button>
              </div>
            </div>

            <div className="doctor-card">
              <div className="doctor-image">
                <img src={avatar} alt="Doctor Avatar" />
              </div>
              <div className="doctor-info">
                <h3>BS. CK1 Nguyễn Thành Nhân</h3>
                <p>Tai Mũi họng</p>
                <p>Bệnh viện Y Huế</p>
              </div>
              <div className="doctor-action">
                <button>Đặt lịch khám</button>
              </div>
            </div>
            <div className="doctor-card">
              <div className="doctor-image">
                <img src={avatar} alt="Doctor Avatar" />
              </div>
              <div className="doctor-info">
                <h3>BS. CK1 Nguyễn Thành Nhân</h3>
                <p>Tai Mũi họng</p>
                <p>Bệnh viện Y Huế</p>
              </div>
              <div className="doctor-action">
                <button>Đặt lịch khám</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

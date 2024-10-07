import image1 from "../assets/img/image 1.png";
import avatar from "../assets/img/1237b30268db9ee0c9cbe3a79b1ff8fa.jpg";
import "../style/homepage.scss";
import { CiSearch } from "react-icons/ci";
import doctorImage from "../assets/img/customer01.png";
import image2 from "../assets/img/coth 1.png";
import image from "../assets/img/login.png";

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
              <p className="booking_info">
                Đa dạng phòng khám với nhiều chuyên khoa khác nhau như Sản -
                Nhi, Tai Mũi họng, Da Liễu, Tiêu Hoá...
              </p>
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
        <div className="booking_specialty">
          <div className="action">
            <p className="booking_title">Đặt Lịch theo Chuyên khoa</p>
            <p className="booking_content">
              Danh sách bác sĩ, bệnh viện, phòng khám, theo chuyên khoa{" "}
            </p>
          </div>
          <div className="specialty-cards">
            <div className="specialty-card">
              <div className="specialty-image">
                <img src={avatar} />
              </div>
              <div className="specialty-info"></div>
              <div className="specialty-action">
                <span>Y học cổ truyền</span>
              </div>
            </div>
            <div className="specialty-card">
              <div className="specialty-image">
                <img src={avatar} />
              </div>
              <div className="specialty-info"></div>
              <div className="specialty-action">
                <span>Y học cổ truyền</span>
              </div>
            </div>
            <div className="specialty-card">
              <div className="specialty-image">
                <img src={avatar} />
              </div>
              <div className="specialty-info"></div>
              <div className="specialty-action">
                <span>Y học cổ truyền</span>
              </div>
            </div>
            <div className="specialty-card">
              <div className="specialty-image">
                <img src={avatar} />
              </div>
              <div className="specialty-info"></div>
              <div className="specialty-action">
                <span>Y học cổ truyền</span>
              </div>
            </div>
            <div className="specialty-card">
              <div className="specialty-image">
                <img src={avatar} />
              </div>
              <div className="specialty-info"></div>
              <div className="specialty-action">
                <span>Y học cổ truyền</span>
              </div>
            </div>
          </div>
          <div>
            <button className="view-more-button">Xem Thêm &gt;</button>
          </div>
        </div>

        <div className="information_doctor">
          <div className="action">
            <p className="booking_title">Đội ngũ chuyên gia</p>
          </div>

          <div className="information_doctor_container">
            <div className="doctor_list">
              <div className="doctor_card">
                <img src={doctorImage} alt="Doctor" />
                <div className="doctor_info">
                  <p className="doctor_name">ThS.Bs Nguyễn Hồng Văn Khánh</p>
                  <p>Gan mật tụy - Ghép gan, Nhi</p>
                </div>
              </div>
              <div className="doctor_card">
                <img src={doctorImage} alt="Doctor" />
                <div className="doctor_info">
                  <p className="doctor_name">ThS.Bs Nguyễn Hồng Văn Khánh</p>
                  <p className="specialty">Gan mật tụy - Ghép gan, Nhi</p>
                </div>
              </div>
              <div className="doctor_card">
                <img src={doctorImage} alt="Doctor" />
                <div className="doctor_info">
                  <p className="doctor_name">ThS.Bs Nguyễn Hồng Văn Khánh</p>
                  <p>Gan mật tụy - Ghép gan, Nhi</p>
                </div>
              </div>
              <div className="doctor_card">
                <img src={doctorImage} alt="Doctor" />
                <div className="doctor_info">
                  <p className="doctor_name">ThS.Bs Nguyễn Hồng Văn Khánh</p>
                  <p>Gan mật tụy - Ghép gan, Nhi</p>
                </div>
              </div>
              <div className="doctor_card">
                <img src={doctorImage} alt="Doctor" />
                <div className="doctor_info">
                  <p className="doctor_name">ThS.Bs Nguyễn Hồng Văn Khánh</p>
                  <p>Gan mật tụy - Ghép gan, Nhi</p>
                </div>
              </div>
            </div>

            <div className="doctor_description">
              <p>
                Hội đồng tham vấn y khoa cùng đội ngũ biên tập viên và bác sĩ,
                dược sĩ đảm bảo nội dung chúng tôi cung cấp chính xác về mặt y
                khoa và cập nhập những thông tin chính xác nhất
              </p>
              <button className="expert_button">Đội ngũ chuyên gia &gt;</button>
            </div>
          </div>
        </div>

        <div className="news_section">
          <h1 className="title">Tin Y tế</h1>
          <p className="subtitle">Chính thống - Minh bạch - Trung lập</p>

          <div className="search_container">
            <div className="filter_buttons">
              <button>Thuốc</button>
              <button>Dược liệu</button>
              <button>Bệnh</button>
              <button>Cơ thể</button>
            </div>
            <div className="search_bar">
              <input type="text" placeholder="Nhập tên thuốc..." />
              <button className="search_icon">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>

          <div className="news_cards_container">
            <div className="news_card">
              <img src={image2} alt="News Image" />
              <div className="news_info">
                <h3>
                  Tìm hiểu về hệ nội tiết của cơ thể: Chức năng và các bệnh lý
                  liên quan
                </h3>
                <p>ThS.BS Hồ Phúc Hiếu - Cập nhật: 30/9/2024</p>
              </div>
            </div>
            <div className="news_card">
              <img src={image2} alt="News Image" />
              <div className="news_info">
                <h3>
                  Tìm hiểu về hệ nội tiết của cơ thể: Chức năng và các bệnh lý
                  liên quan
                </h3>
                <p>ThS.BS Hồ Phúc Hiếu - Cập nhật: 30/9/2024</p>
              </div>
            </div>
            <div className="news_card">
              <img src={image2} alt="News Image" />
              <div className="news_info">
                <h3>
                  Tìm hiểu về hệ nội tiết của cơ thể: Chức năng và các bệnh lý
                  liên quan
                </h3>
                <p>ThS.BS Hồ Phúc Hiếu - Cập nhật: 30/9/2024</p>
              </div>
            </div>
            <div className="news_card">
              <img src={image2} alt="News Image" />
              <div className="news_info">
                <h3>
                  Tìm hiểu về hệ nội tiết của cơ thể: Chức năng và các bệnh lý
                  liên quan
                </h3>
                <p>ThS.BS Hồ Phúc Hiếu - Cập nhật: 30/9/2024</p>
              </div>
            </div>
            <div className="news_card">
              <img src={image2} alt="News Image" />
              <div className="news_info">
                <h3>
                  Tìm hiểu về hệ nội tiết của cơ thể: Chức năng và các bệnh lý
                  liên quan
                </h3>
                <p>ThS.BS Hồ Phúc Hiếu - Cập nhật: 30/9/2024</p>
              </div>
            </div>
            <div className="news_card">
              <img src="path-to-image" alt="News Image" />
              <div className="news_info">
                <h3>
                  Klamentin là thuốc gì? Công dụng, cách dùng và lưu ý khi sử
                  dụng
                </h3>
                <p>Dược sĩ Lê Văn Trung Tính - Cập nhật: 24/05/2024</p>
              </div>
            </div>
          </div>
        </div>
        <div className="data-security-section">
          <h1 className="title">Bảo mật dữ liệu</h1>
          <p className="subtitle">
            An toàn dữ liệu của bạn là ưu tiên hàng đầu của chúng tôi
          </p>

          <div className="icons-container">
            <div className="icon-item">
              <img src={image} alt="icon" />
              <p>
                Hạ tầng đạt tiêu chuẩn
                <br />
                ISO 27001:2013
              </p>
            </div>
            <div className="icon-item">
              <img src={image} alt="icon" />
              <p>
                Thông tin sức khỏe được
                <br />
                bảo mật theo quy chuẩn
                <br />
                <a href="#">HIPAA</a>
              </p>
            </div>
            <div className="icon-item">
              <img src={image} alt="icon" />
              <p>
                Thành viên
                <br />
                VNISA
              </p>
            </div>
            <div className="icon-item">
              <img src={image} alt="icon" />
              <p>
                Pentest định kì
                <br />
                hằng năm
              </p>
            </div>
          </div>

          <p className="description">
            Với nhiều năm kinh nghiệm trong lĩnh vực Y tế, chúng tôi hiểu rằng,
            dữ liệu sức khỏe của bạn chỉ thuộc về bạn, YouMed tuân thủ các chính
            sách bảo mật dữ liệu cao nhất trên thế giới.
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;

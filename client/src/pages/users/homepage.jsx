import image1 from "../../assets/img/image1.png";
import avatar from "../../assets/img/1237b30268db9ee0c9cbe3a79b1ff8fa.jpg";
import "../../style/homepage.scss";
import { CiSearch } from "react-icons/ci";
import doctorImage from "../../assets/img/customer01.png";
import image2 from "../../assets/img/coth1.png";
import image from "../../assets/img/chuan1.png";
import { useNavigate } from "react-router-dom";
import { getAllUserByRole } from "../../utils/AuthAPI/AdminService";
import { useEffect, useState } from "react";
import ChandoanhinhanhIMG from "../../assets/img/Specialties/Chandoanhinhanh.jpg";
import Coxuongkhop from "../../assets/img/Specialties/Coxuongkhop.jpg";
import Dalieu from "../../assets/img/Specialties/Dalieu.jpg";
import Diungmiendich from "../../assets/img/Specialties/Diungmiendich.jpg";
import Gaymehoisuc from "../../assets/img/Specialties/Gaymehoisuc.jpg";
import Hohap from "../../assets/img/Specialties/Hohap.jpg";
import laobenhphoi from "../../assets/img/Specialties/laobenhphoi.jpg";
import laokhoa from "../../assets/img/Specialties/laokhoa.jpg";
import Nhikhoa from "../../assets/img/Specialties/Nhikhoa (1).jpg";
import sanphukhoa from "../../assets/img/Specialties/sanphukhoa.jpg";
import taimuihong from "../../assets/img/Specialties/taimuihong.jpg";
import tamthan from "../../assets/img/Specialties/tamthan.jpg";
import truyennhiem from "../../assets/img/Specialties/truyennhiem.jpg";
import xetnghiem from "../../assets/img/Specialties/xetnghiem.jpg";
// import Chatbot from "../../components/chatbot/Chatbot";
import noithankinh from "../../assets/img/Specialties/noithankinh.jpg";
// import ngoailongngucmanhmau from "../../assets/img/Specialties/ngoailongngucmanhmau.jpg";
const HomePage = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const handleBookingBySpecialties = (specialty) => {
    navigate(
      {
        pathname: "/dat-kham/bac-si/tim-kiem",
      },
      {
        state: {
          specialties: specialty,
        },
      }
    );
    console.log(specialty);
  };
  const handleBooking = (doctorID) => {
    navigate(`/dat-kham/bac-si/${doctorID}`);
  };
  const handleViewMoreClick = () => {
    setIsExpanded(!isExpanded);
  };
  const handleViewmore = () => {
    navigate("/dat-kham/bac-si/tim-kiem");
  };
  const [doctors, setDoctor] = useState([]);
  useEffect(() => {
    fetchDoctors(); // Gọi hàm fetchDoctors
  }, []); // Thêm dependency array để hàm chỉ chạy một lần khi component mount

  const fetchDoctors = async () => {
    try {
      const data = await getAllUserByRole("doctor", 1, 1000); // Gọi API
      setDoctor(data.users);
    } catch (error) {
      console.log(error); // Log lỗi nếu có
    }
  };
  return (
    <>
      {/* <div className="chatbot-container">
        <Chatbot />
      </div> */}

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
              <button className="view-more-button" onClick={handleViewmore}>
                Xem Thêm &gt;
              </button>
            </div>
          </div>
          <div className="doctor-cards">
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <div className="doctor-card" key={doctor._id}>
                  <div className="doctor-image">
                    <img
                      src={`data:image/jpeg;base64,${doctor.imageUrl}`}
                      alt="Doctor Avatar"
                    />
                  </div>
                  <div className="doctor-info">
                    <h3>
                      {doctor.first_name} {doctor.last_name}
                    </h3>
                    <p>{doctor.specialties.join(", ")}</p>
                    <p>{doctor.address}</p>
                  </div>
                  <div className="doctor-action">
                    <button onClick={() => handleBooking(doctor._id)}>
                      Đặt lịch khám
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Không tìm thấy bác sĩ nào</p>
            )}
          </div>
        </div>
        <div className="booking_specialty">
          <div className="action">
            <p className="booking_title">Đặt Lịch theo Chuyên khoa</p>
            <p className="booking_content">
              Danh sách bác sĩ, bệnh viện, phòng khám, theo chuyên khoa{" "}
            </p>
          </div>
          <div className={`specialty-cards ${isExpanded ? "expanded" : ""}`}>
            {" "}
            <div
              className="specialty-card"
              value="Chuẩn Đoán Hình Ảnh"
              onClick={(e) => {
                handleBookingBySpecialties("Chuẩn Đoán Hình Ảnh");
              }}
            >
              <div className="specialty-card">
                <div className="specialty-image">
                  <img src={ChandoanhinhanhIMG} />
                </div>
                <div className="specialty-info"></div>
                <div className="specialty-action">
                  <span>Chuẩn Đoán Hình Ảnh</span>
                </div>
              </div>
            </div>
            <div
              className="specialty-card"
              value="Xương Khớp"
              onClick={(e) => {
                handleBookingBySpecialties("Xương Khớp");
              }}
            >
              <div className="specialty-card">
                <div className="specialty-image">
                  <img src={Coxuongkhop} />
                </div>
                <div className="specialty-info"></div>
                <div className="specialty-action">
                  <span>Xương Khớp</span>
                </div>
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
                <img src={Dalieu} />
              </div>
              <div className="specialty-info"></div>
              <div className="specialty-action">
                <span>Da liễu</span>
              </div>
            </div>
            <div className="specialty-card">
              <div className="specialty-image">
                <img src={Diungmiendich} />
              </div>
              <div className="specialty-info"></div>
              <div className="specialty-action">
                <span>Dị ứng miễn dịch</span>
              </div>
            </div>
            <div className="specialty-card">
              <div className="specialty-image">
                <img src={laobenhphoi} />
              </div>
              <div className="specialty-info"></div>
              <div className="specialty-action">
                <span>Lao phổi</span>
              </div>
            </div>
            <div className="specialty-card">
              <div className="specialty-image">
                <img src={Gaymehoisuc} />
              </div>
              <div className="specialty-info"></div>
              <div className="specialty-action">
                <span>Gây mê hồi sức</span>
              </div>
            </div>
            <div className="specialty-card">
              <div className="specialty-image">
                <img src={laokhoa} />
              </div>
              <div className="specialty-info"></div>
              <div className="specialty-action">
                <span>Lão Khoa</span>
              </div>
            </div>
            <div
              className="specialty-card"
              value="Nhi khoa"
              onClick={(e) => {
                handleBookingBySpecialties("Nhi Khoa");
              }}
            >
              <div className="specialty-image">
                <img src={Nhikhoa} />
              </div>
              <div className="specialty-info"></div>
              <div className="specialty-action">
                <span>Nhi khoa</span>
              </div>
            </div>
            <div className="specialty-card">
              <div className="specialty-image">
                <img src={truyennhiem} />
              </div>
              <div className="specialty-info"></div>
              <div className="specialty-action">
                <span>Truyền nhiễm</span>
              </div>
            </div>
            <div className="specialty-card">
              <div className="specialty-image">
                <img src={xetnghiem} />
              </div>
              <div className="specialty-info"></div>
              <div className="specialty-action">
                <span>Xét nghiệm</span>
              </div>
            </div>
            <div className="specialty-card">
              <div className="specialty-image">
                <img src={Hohap} />
              </div>
              <div className="specialty-info"></div>
              <div className="specialty-action">
                <span>Hô hấp</span>
              </div>
            </div>
            <div className="specialty-card">
              <div className="specialty-image">
                <img src={tamthan} />
              </div>
              <div className="specialty-info"></div>
              <div className="specialty-action">
                <span>Tâm thần</span>
              </div>
            </div>
            <div className="specialty-card">
              <div className="specialty-image">
                <img src={Hohap} />
              </div>
              <div className="specialty-info"></div>
              <div className="specialty-action">
                <span>Hô hấp</span>
              </div>
            </div>
           <div className="specialty-card"
              value="Sản Phụ Khoa"
              onClick={(e) => {
                handleBookingBySpecialties("Sản Phụ Khoa");
              }}>

           <div className="specialty-card">
              <div className="specialty-image">
                <img src={sanphukhoa} />
              </div>
              <div className="specialty-info"></div>
              <div className="specialty-action">
                <span>Sản Phụ Khoa</span>
              </div>
            </div>
           </div>
            <div
              className="specialty-card"
              value="Tai - Mũi - Họng"
              onClick={(e) => {
                handleBookingBySpecialties("Tai - Mũi - Họng");
              }}
            >
              {" "}
              <div className="specialty-card">
                <div className="specialty-image">
                  <img src={taimuihong} />
                </div>
                <div className="specialty-info"></div>
                <div className="specialty-action">
                  <span>Tai - Mũi - Họng</span>
                </div>
              </div>
            </div>
            <div
              className="specialty-card"
              value="Nội Thần Kinh"
              onClick={(e) => {
                handleBookingBySpecialties("Nội Thần Kinh");
              }}
            >
              <div className="specialty-card">
                <div className="specialty-image">
                  <img src={noithankinh} />
                </div>
                <div className="specialty-info"></div>
                <div className="specialty-action">
                  <span>Nội Thần Kinh</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button className="view-more-button" onClick={handleViewMoreClick}>
              {" "}
              {isExpanded ? "Thu gọn" : "Xem thêm"}{" "}
            </button>
          </div>
        </div>

        <div className="information_doctor">
          <div className="action">
            <p className="booking_title">Đội ngũ chuyên gia</p>
          </div>

          <div className="information_doctor_container">
            <div className="doctor_list">
              {doctors.length > 0 ? (
                doctors.slice(0, 5).map((doctor, index) => (
                  <div key={index} className="doctor_card">
                    <img
                      src={`data:image/jpeg;base64,${doctor.imageUrl}`}
                      alt=""
                    />
                    <div className="doctor_info">
                      <p className="doctor_name">
                        Ths.Bs {doctor.first_name} {doctor.last_name}
                      </p>
                      <p className="specialty">{doctor.specialties}</p>
                    </div>
                  </div>
                ))
              ) : (
                <span>Không có đội ngũ chuyên gia</span>
              )}
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
              <img src={image2} alt="News Image" />
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
          <h1 className="title">GIẤY PHÉP CHỨNG NHẬN ĐẠT CHUẨN GPP</h1>
          <p className="subtitle">
            Đội ngũ chuyên gia chứng nhận phòng khám đạt chuẩn GPP
          </p>

          <div className="icons-container">
            <div className="icon-item">
              <img src={image} alt="icon" />
              <p>
                Hạ tầng đạt tiêu chuẩn
                <br />
                ISO 15189:2012
              </p>
            </div>
            <div className="icon-item">
              <img src={image} alt="icon" />
              <p>
                Thông tin sức khỏe được
                <br />
                đảm bảo tốt nhất
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
            dữ liệu sức khỏe của bạn chỉ thuộc về bạn, và tuân thủ các chính
            sách bảo mật dữ liệu cao nhất trên thế giới.
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;

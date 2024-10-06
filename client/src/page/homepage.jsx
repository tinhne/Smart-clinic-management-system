import image1 from "../assets/img/image 1.png";
import "../style/homepage.scss";
import { CiSearch } from "react-icons/ci";

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

          {/* Container for input and search icon */}
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Triệu chứng, bác sĩ, phòng khám,..."
            />
            <CiSearch className="search-icon" />
          </div>
        </div>
        <img src={image1} alt="Mô tả hình ảnh" className="img-home-page" />
      </div>
    </>
  );
};

export default HomePage;

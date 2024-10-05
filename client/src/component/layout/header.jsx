import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "../../style/homepage.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import image1 from '../../assets/img/image 1.png';

const Header = () => {
  return (
    <>
      <Navbar expand="lg" className="navbar-custom bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav-links">
              <Nav.Link href="#home">Đặt khám</Nav.Link>
              <Nav.Link href="#link">Tư vấn trực tuyến</Nav.Link>
              <Nav.Link href="#link">Tin y tế</Nav.Link>
            </Nav>
            <div className="navbar-buttons">
              <Button variant="primary">Primary</Button>{" "}
              <Button variant="primary">Primary</Button>{" "}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="body-homepage">
        <div className="description-search-container">
          <p className="description_1">Ứng dụng đặt khám </p>
          <p className="description_2">
            Đặt khám với hơn 600 bác sỹ, 160 bệnh nhân, 56 phòng khám trên
            Pandora để có số thứ tự và khung giờ khám trước.
          </p>
          <input
            type="text"
            className="search-input"
            placeholder="Triệu chứng, bác sĩ, phòng khám,..."
          />
        </div>
        <img src={image1} alt="Mô tả hình ảnh" className="img-home-page" />
        </div>
    </>
  );
};

export default Header;

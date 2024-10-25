import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "../../style/header.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import customer from "../../assets/img/customer01.png";

const Header = () => {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState(""); // Thêm useState cho username
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = Cookies.get("access_token");
    const storedUsername = Cookies.get("username");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUsername) {
      setUsername(storedUsername.replace(/_/g, " ")); // Chỉ xử lý khi storedUsername tồn tại
    } else {
      setUsername(""); // Nếu không có username trong cookie, đặt username thành chuỗi rỗng
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Giữ lại nếu cần thiết
    setToken("");
    setUsername("");
    Cookies.remove("access_token");
    Cookies.remove("role");
    Cookies.remove("username");
    navigate("/");
  };

  // Thêm hàm xử lý click cho từng lựa chọn đăng nhập
  const handleLogin = () => {
    navigate("/login-register");
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-custom bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <h1 className="logoMain">
              Caps<span>tone1</span>
            </h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav-links">
              <Nav.Link href="#home">Đặt khám</Nav.Link>
              <Nav.Link href="#">Tư vấn trực tuyến</Nav.Link>
              <Nav.Link href="/tin-tuc/">Tin y tế</Nav.Link>
              <Nav.Link href="/dich-vu-kham">Dịch vụ</Nav.Link>
            </Nav>
            <div className="navbar-buttons">
              {username ? (
                <div className="user_info">
                  <div className="user_img">
                    <img src={customer} alt="" />
                  </div>{" "}
                  <div>
                    <NavDropdown title={username} id="basic-nav-dropdown">
                      <NavDropdown.Item href="/thong-tin/ho-so">
                        Hồ sơ
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/thong-tin/lich-kham">
                        Lịch khám
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/thong-tin/thanh-toan">
                        Thanh toán
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/thong-tin/tai-khoan">
                        Tài Khoản
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={handleLogout}>
                        Đăng xuất
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                </div>
              ) : (
                <>
                  <div className="login-dropdown-container">
                    <Button className="btn_login" onClick={handleLogin}>
                      Đăng nhập
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

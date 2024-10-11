import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "../../style/header.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState(""); // Thêm useState cho username

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    const storedUsername = localStorage.getItem("username"); // Lấy giá trị username từ localStorage
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUsername) {
      setUsername(storedUsername); // Cập nhật state cho username
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setToken("");
    setUsername(""); // Xóa cả username khi logout
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-custom bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav-links">
              <Nav.Link href="#home">Đặt khám</Nav.Link>
              <Nav.Link href="#">Tư vấn trực tuyến</Nav.Link>
              <Nav.Link href="/tin-tuc/">Tin y tế</Nav.Link>
            </Nav>
            <div className="navbar-buttons">
              {token ? (
                <div className="user_info">
                  <div className="user_img">
                    <FaRegUserCircle size={30} />
                  </div>{" "}
                  <div>
                    <NavDropdown title={username} id="basic-nav-dropdown">
                      <NavDropdown.Item
                        href="#action/3.1"
                        onClick={handleLogout}
                      >
                        Đăng xuất
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Hành động khác
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        Một thứ gì đó
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">
                        Liên kết tách biệt
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                </div>
              ) : (
                <>
                  <Button className="btn_register">Đăng ký</Button>
                  <Button className="btn_login">Đăng nhập</Button>
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

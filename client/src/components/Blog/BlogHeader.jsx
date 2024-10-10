import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../../style/Blog/BlogHeader.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRegUserCircle } from "react-icons/fa";
import NavDropdown from 'react-bootstrap/NavDropdown';

const Blog_Header = () => {
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
            <div className="user_info">
            <FaRegUserCircle  />
            <NavDropdown title="Hồ Phúc Hiếu" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>

            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </>
  );
};

export default Blog_Header;

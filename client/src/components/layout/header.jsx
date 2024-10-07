import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "../../style/header.scss";
import "bootstrap/dist/css/bootstrap.min.css";

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
      
    </>
  );
};

export default Header;

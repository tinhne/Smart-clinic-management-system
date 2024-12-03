import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/ClinicInfor/ClinicInfor.scss";
const subject = encodeURIComponent("Chào mừng bạn đến với phòng khám");
const body = encodeURIComponent(
  "Nếu bạn cần hỗ trợ, vui lòng liên hệ với chúng tôi qua email này hoặc qua số điện thoại: +84 935038810"
);

const ClinicInfo = () => {
  return (
    <Container className="clinic-info-page">
      <h1 className="text-center my-4">Giới Thiệu Về Phòng Khám</h1>

      {/* Clinic Information Section */}
      <Row className="my-5">
        <Col md={6}>
          <Card className="info-card">
            <Card.Body>
              <Card.Title>Thông Tin Phòng Khám</Card.Title>
              <Card.Text>
                <strong>Địa chỉ:</strong> 123 Đường Y Tế, Quận 1, TP. HCM
              </Card.Text>
              <Card.Text>
                <strong>Số điện thoại:</strong> +84 123 456 789
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> lienhe@phongkham.com
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Opening Hours Section */}
        <Col md={6}>
          <Card className="info-card">
            <Card.Body>
              <Card.Title>Giờ Mở Cửa</Card.Title>
              <ul className="opening-hours">
                <li>Thứ 2 - Thứ 6: 08:00 - 18:00</li>
                <li>Thứ 7: 08:00 - 12:00</li>
                <li>Chủ nhật: Đóng cửa</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* About Section */}
      <Row className="my-5">
        <Col>
          <Card className="info-card">
            <Card.Body>
              <Card.Title>Về Phòng Khám Chúng Tôi</Card.Title>
              <Card.Text>
                Phòng khám của chúng tôi tự hào cung cấp các dịch vụ y tế chất
                lượng cao với đội ngũ bác sĩ và nhân viên tận tâm, chuyên
                nghiệp. Chúng tôi luôn cố gắng mang lại trải nghiệm tốt nhất cho
                bệnh nhân.
              </Card.Text>
              <Card.Text>
                <strong>Sứ mệnh:</strong> Cung cấp dịch vụ y tế đáng tin cậy,
                chất lượng và toàn diện để đảm bảo sức khỏe tốt nhất cho cộng
                đồng.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Services Section */}
      <Row className="my-5">
        <Col>
          <Card className="info-card">
            <Card.Body>
              <Card.Title>Các Dịch Vụ Tại Phòng Khám</Card.Title>
              <ul className="service-list">
                <li>Khám tổng quát</li>
                <li>
                  Khám chuyên khoa (Tim mạch, Nội tiết, Tai mũi họng, v.v.)
                </li>
                <li>Xét nghiệm máu, X-Quang, siêu âm</li>
                <li>Tư vấn sức khỏe</li>
                <li>Khám và điều trị ngoại trú</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Contact Section */}
      <Row className="my-5">
        <Col>
          <Card className="info-card">
            <Card.Body>
              <Card.Title>Liên Hệ Với Chúng Tôi</Card.Title>
              <Card.Text>
                Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, vui lòng liên hệ
                với chúng tôi qua thông tin bên dưới. Chúng tôi sẽ phản hồi
                nhanh chóng và hỗ trợ bạn tốt nhất.
              </Card.Text>
              <Button
                onClick={() => {
                  window.location.href = `mailto:tandung03.dev@gmail.com?subject=${subject}&body=${body}`;
                }}
                variant="primary"
              >
                Gửi Email
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ClinicInfo;

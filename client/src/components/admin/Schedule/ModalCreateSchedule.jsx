import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const ModalCreateSchedule = ({
  show,
  handleClose,
  handleSave,
  formData,
  handleChange,
  doctors, // Nhận danh sách bác sĩ từ props
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Tạo Lịch Làm Việc</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="doctor_id">
              <Form.Label>Chọn Bác Sĩ</Form.Label>
              <Form.Select
                required
                name="doctor_id" // Thêm thuộc tính name
                value={formData.doctor_id}
                onChange={handleChange}
              >
                <option value="">Chọn Bác Sĩ</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                required
                type="date"
                name="date" // Thêm thuộc tính name
                value={formData.date}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="slot_duration">
              <Form.Label>Slot Duration (minutes)</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Duration"
                name="slot_duration" // Thêm thuộc tính name
                value={formData.slot_duration}
                onChange={handleChange}
                min={5}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="start_time">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                required
                type="time"
                name="start_time" // Thêm thuộc tính name
                value={formData.start_time}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="end_time">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                required
                type="time"
                name="end_time" // Thêm thuộc tính name
                value={formData.end_time}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Button variant="primary" onClick={handleSave}>
            Lưu
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

ModalCreateSchedule.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  doctors: PropTypes.array.isRequired, // Thêm propTypes cho doctors
};

export default ModalCreateSchedule;

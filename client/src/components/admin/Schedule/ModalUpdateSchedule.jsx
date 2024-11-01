import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";

export const ModalUpdateSchedule = ({
  show,
  handleClose,
  handleUpdate,
  formData,
  handleChange,
  doctors,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cập Nhật Lịch</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="doctor_id">
            <Form.Label>Bác sĩ</Form.Label>
            <Form.Control
              as="select"
              name="doctor_id"
              value={formData.doctor_id}
              onChange={handleChange}
            >
              <option value="">Chọn bác sĩ</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.first_name} {doctor.last_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="date">
            <Form.Label>Ngày</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="start_time">
            <Form.Label>Giờ Bắt Đầu</Form.Label>
            <Form.Control
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="end_time">
            <Form.Label>Giờ Kết Thúc</Form.Label>
            <Form.Control
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="slot_duration">
            <Form.Label>Thời gian mỗi slot (phút)</Form.Label>
            <Form.Control
              type="number"
              name="slot_duration"
              value={formData.slot_duration}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Cập Nhật
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Thêm PropTypes để kiểm tra kiểu dữ liệu
ModalUpdateSchedule.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    doctor_id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    start_time: PropTypes.string.isRequired,
    end_time: PropTypes.string.isRequired,
    slot_duration: PropTypes.number.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  doctors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ModalUpdateSchedule;

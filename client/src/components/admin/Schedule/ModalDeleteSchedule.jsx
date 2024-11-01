// components/admin/Schedule/ModalDeleteSchedule.js
import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

const ModalDeleteSchedule = ({
  show,
  handleClose,
  handleDelete,
  selectedUser,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận xóa lịch khám</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Bạn có chắc chắn muốn xóa lịch khám của bác sĩ{" "}
          {selectedUser?.first_name} {selectedUser?.last_name} không?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
ModalDeleteSchedule.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  selectedUser: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
};

export default ModalDeleteSchedule;

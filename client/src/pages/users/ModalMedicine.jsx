import React from "react";
import PropTypes from "prop-types";
import "./Modal.scss";

const Modal = ({ isOpen, onClose, medicine }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content_medicine">
        <h2>{medicine.name}</h2>
        <img src={medicine.medicalImage} alt={medicine.name} />
        <p>
          <strong>Mô tả:</strong> {medicine.description}
        </p>
        <p>
          <strong>Giá:</strong> {medicine.price}đ
        </p>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  medicine: PropTypes.shape({
    name: PropTypes.string.isRequired,
    medicalImage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Modal;

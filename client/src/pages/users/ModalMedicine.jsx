// Modal.js
import React from 'react';
import './Modal.scss'; // Bạn có thể tạo file CSS riêng cho modal

const Modal = ({ isOpen, onClose, medicine }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{medicine.name}</h2>
        <img src={medicine.medicalImage} alt={medicine.name} />
        <p><strong>Mô tả:</strong> {medicine.description}</p>
        <p><strong>Giá:</strong> {medicine.price}đ</p>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default Modal;
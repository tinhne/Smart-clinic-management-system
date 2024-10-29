// ConfirmationDialog.jsx
import React from "react";
import "../../style/ConfirmationDialog.scss";

      // eslint-disable-next-line react/prop-types
const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-dialog-overlay">
      <div className="confirmation-dialog">
        <p>{message}</p>
        <div className="dialog-buttons">
          <button className="confirm-button" onClick={onConfirm}>
            Xác nhận
          </button>
          <button className="cancel-button" onClick={onCancel}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;

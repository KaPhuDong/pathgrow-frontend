import React from 'react';
import '../../styles/components/confirmDelete.css';

const ConfirmDelete = ({
  title = 'Are you sure?',
  message = 'Do you really want to delete this item?',
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="confirm-delete-overlay">
      <div className="confirm-delete-box">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="confirm-delete-buttons">
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-confirm" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;

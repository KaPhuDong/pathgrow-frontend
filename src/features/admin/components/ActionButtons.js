import React from 'react';
import { FaTrash, FaPen } from 'react-icons/fa';

const ActionButtons = ({ onEdit, onDelete }) => (
  <div className="d-flex justify-content-center gap-2">
    <FaPen
      style={{ color: 'var(--primary)', cursor: 'pointer' }}
      onClick={onEdit}
      title="Edit"
    />
    <FaTrash
      style={{ color: 'var(--secondary)', cursor: 'pointer' }}
      onClick={onDelete}
      title="Delete"
    />
  </div>
);

export default ActionButtons;

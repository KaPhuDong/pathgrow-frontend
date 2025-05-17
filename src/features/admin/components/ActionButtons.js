import React from 'react';
import { FaTrash, FaPen } from 'react-icons/fa';

const ActionButtons = ({ onEdit, onDelete }) => (
  <div className="d-flex justify-content-center gap-2">
    <FaPen
      style={{ color: '#00cece', cursor: 'pointer' }}
      onClick={onEdit}
      title="Edit"
    />
    <FaTrash
      style={{ color: '#fe5d26', cursor: 'pointer' }}
      onClick={onDelete}
      title="Delete"
    />
  </div>
);

export default ActionButtons;
